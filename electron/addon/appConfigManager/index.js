const fs = require('fs').promises
const fsSync = require('fs')
const { constants } = require('fs')
const path = require('path')
const Conf = require('ee-core/config')

/**
 * 配置文件管理插件，实现配置文件列表读取和写入
 * @class
 */
class AppConfigManagerAddon {
  constructor(app) {
    this.app = app
    this.configDir = app.config.addons.appConfigManager.configDir
    this._files = []
  }

  get(name) {
    if (!name || typeof name !== 'string' || name === '') return undefined

    const file = this._files.find(file => file.name === name)
    if (file) {
      return file.content
    } else {
      return undefined
    }

  }

  /**
   * 注意，此处的 set 是异步方法，在进行 set 之后调用 get 或 getAll 会获取到旧的数据
   * 如果需要获取实时数据，请在 set 时使用 await set
   * @param name
   * @param content
   * @returns {Promise<boolean>}
   */
  async set(name, content) {
    if (!name || typeof name !== 'string') return undefined

    return await this.saveFile(name, content)
  }

  getAll() {
    return this._files
  }

  async initialize() {
    this.app.console.info('[addon:appConfigManager] load')

    await this.readFiles()
  }

  async readFiles() {
    try {
      await fs.access(this.configDir, constants.F_OK)
    } catch (err) {
      this.app.logger.error(err)
      if (err.code === 'ENOENT') {
        this.app.logger.info(`找不到目录：${this.configDir}，正在创建`)
        try {
          await fs.mkdir(this.configDir)
          this.app.logger.info(`目录 ${this.configDir} 创建完成`)
        } catch (mkdirErr) {
          this.app.logger.error(mkdirErr)
        }
        this.readFiles()
      } else {
        this._files = []
      }
    }

    try {
      const files = await fs.readdir(this.configDir)
      if (files.length !== 0) {
        files.map(filename => {
          const ext = path.extname(filename)
          const name = filename.split(ext)[0]
          const filepath = this.getFilepath(filename)
          if (ext !== '.json') return
          this._files.push({
            name,
            filename,
            ext,
            content: this.readContent(filepath),
            path: filepath
          })
        })
      } else {
        // 文件数量为0的处理
        this._files = []
      }
    } catch (err) {
      this.app.logger.error(err)
      this._files = []
    }

  }

  getFilepath(filename) {
    return path.join(this.configDir, filename)
  }


  updateCache(name, content) {
    const file = this.getFile(name)
    if (file) {
      file.content = content
      return true
    } else {
      return false
    }
  }

  /**
   * 保存配置文件到固定的目录下，如果文件不存在则创建，文件存在则覆盖
   * @param name
   * @param content
   * @returns {Promise<boolean>}
   */
  async saveFile(name, content) {
    const file = this.getFile(name)
    try {
      const json = JSON.stringify(content, null, 2)
      await fs.writeFile(file.path, json)
      this.updateCache(name, content)
      return true
    } catch (err) {
      this.app.logger.error(err)
      return false
    }
  }

  getFile(name) {
    return this._files.find(file => file.name === name)
  }


  readContent(filepath) {
    try {
      return require(filepath)
    } catch (err) {
      this.app.logger.error(err)
      return undefined
    }
  }

  /**
   * 同步方式获取配置文件信息
   * 为了在bridge直接将配置文件信息写入到window对象中，才另外实现了这个静态方法
   * @returns {*[]}
   */
  static getAllConfig() {
    const configDir = Conf.all().addons.appConfigManager.configDir
    const result = []

    try {
      fsSync.accessSync(configDir, constants.F_OK)
      const files = fsSync.readdirSync(configDir)

      files.forEach(filename => {
        const ext = path.extname(filename)
        if (ext !== '.json') return

        const filepath = path.join(configDir, filename)
        const name = filename.split(ext)[0]
        let content = undefined
        try {
          content = require(filepath)
        } catch (e) {
          content = undefined
        }

        result.push({
          name,
          filename,
          ext,
          content,
          path: path.join(configDir, filename)
        })
      })
    } catch (err) {
    }
    return result
  }
}

AppConfigManagerAddon.toString = () => '[class AppConfigManagerAddon]'
module.exports = AppConfigManagerAddon
