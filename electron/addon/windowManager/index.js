const { BrowserWindow } = require('electron')

/**
 * 窗口管理插件
 * @class
 */

class WindowManagerAddon {
  constructor(app) {
    this.app = app
    this.app.console.info('[addon:windowManager] load')

    this.cfg = app.config.windowsOption
    this._cache = {}

    this.baseUrl = null
    Object.defineProperty(this, 'baseUrl', {
      get() {
        if (this.app.config.env === 'prod') {
          const mainServer = this.app.config.mainServer
          return mainServer.protocol + mainServer.host + ':' + mainServer.port + '/#'
        } else {
          const port = this.app.config.developmentMode.mode.vue.port
          return `http://localhost:${port}/#`
        }
      }
    })

    Object.defineProperty(this, 'mainWindow', {
      get() {
        return this.getWindow('main') || undefined
      }
    })
  }

  /**
   *
   * @returns {BrowserWindow | Electron.CrossProcessExports.BrowserWindow}
   * @param params
   */
  createWindow(params) {
    const { name, options, path = '/' } = params

    if (Object.keys(this._cache).includes(name)) {
      const msg = `createWindow: 名称为'${name}'的窗体已存在`
      this.app.logger.error(msg)
      throw new Error(msg)
    }

    const win = new BrowserWindow({
      ...this.cfg,
      ...options
    })
    let url = ''
    let addr = this.baseUrl

    if (!app.isPackaged && this.app.config.openDevTools) {
      win.webContents.openDevTools()
    }

    url = addr + path
    win.loadURL(url)

    this.saveWindow(name, win)

    return win
  }

  baseUrl() {

  }


  // 为窗体附加一些与业务相关的功能
  windowExpand(win) {
    this.disableMouseRightClick(win)

    win.on('close', () => {
      this.remove(win)
    })
    win.on('ready-to-show', () => {
      win.webContents.send('window-ready', win.id)
    })

    win.on('maximize', () => {
      win.webContents.send('maximize')
    })
    win.on('unmaximize', () => {
      win.webContents.send('unmaximize')
    })

  }

  /**
   * 将创建的窗体实例进行缓存
   * @param name
   * @param win
   */
  saveWindow(name, win) {
    if (Object.keys(this._cache).includes(name)) {
      throw new Error(`名称为'${name}'的窗体已存在`)
    }
    this.windowExpand(win)
    this._cache[name] = win
  }

  /**
   * 根据窗体名称获取窗体对象
   * @param name {String}
   * @returns {null}
   */
  getWindow(name) {
    if (this._cache[name]) {
      return this._cache[name]
    } else {
      return null
    }
  }

  /**
   * 根据窗体id获取窗体对象
   * @param id {String|Number}
   * @returns {null}
   */
  getWindowById(id) {
    for (const name in this._cache) {
      if (this._cache[name].id === id) {
        return this._cache[name]
      }
    }
  }

  /**
   * 根据窗体名称移除窗体
   * @returns {boolean}
   * @param name
   */
  removeWindow(name) {
    if (this.getWindow(name)) {
      delete this._cache[name]
    }
    for (const name in this._cache) {
      if (this._cache[name].tag === tag) {
        return delete this._cache[name]
      }
    }
  }

  /**
   * 根据id移除窗体
   * @param id {String|Number}
   * @returns {boolean}
   */
  removeWindowById(id) {
    for (const name in this._cache) {
      if (this._cache[name].id === id) {
        return delete this._cache[name]
      }
    }
  }

  /**
   * 根据窗体对象移除窗体
   * @param win
   * @returns {boolean}
   */
  remove(win) {
    for (const name in this._cache) {
      const curr = this._cache[name]
      if (curr.id === win.id && curr.webContents.id === win.webContents.id) {
        return delete this._cache[name]
      }
    }
  }

  // 禁止窗体拖拽区的鼠标右键点击
  disableMouseRightClick(win) {
    const WM_INITMENU = 0x116
    try {
      win.hookWindowMessage(WM_INITMENU, (e) => {
        win.setEnabled(false)
        setTimeout(() => {
          win.setEnabled(true)
        }, 100)
      })
    } catch (error) {
    }
  }
}

WindowManagerAddon.toString = () => '[class WindowManagerAddon]'
module.exports = WindowManagerAddon
