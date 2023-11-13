/*
 * 在此处使用 contextBridge 将所有Electron API和共享数据统一暴露给渲染进程
 * 注意！此文件中的代码由浏览器直接运行
 * 由于文件打包时对文件进行加密，因此不能引入项目中的其他文件，只能引入node标准库和node_modules中的第三方库
 * 如果引入项目中其他js文件，会发生找不到模块的错误，导致渲染进程的界面无法正常显示
 */
const { contextBridge, ipcRenderer } = require('electron')
const Conf = require('ee-core/config')
const fsSync = require('fs')
const { constants } = require('fs')
const path = require('path')

// ipcRenderer中的on方法必须要这样才能暴露给渲染进程使用
const expandIpcRenderer = {
  ...ipcRenderer,
  on: (channel, func) => {
    ipcRenderer.on(channel, func)
  },
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  }
}

// 暴露ipcRenderer到渲染进程的window对象中
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: expandIpcRenderer,
})

// 暴露配置文件信息到渲染进程的window对象中
contextBridge.exposeInMainWorld('config', getAllConfig())


// 同步方式获取配置文件信息
function getAllConfig() {
  const configDir = Conf.all().addons.appConfigManager.configDir
  const result = {}

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
      result[name] = content
    })
  } catch (err) {
  }
  return result
}
