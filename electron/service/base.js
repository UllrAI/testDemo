const { Service } = require('ee-core')
const electronApp = require('electron').app
const process = require('process')
const Log = require('ee-core/log')

class BaseService extends Service {
  constructor(ctx) {
    super(ctx)
  }

  minimize(id) {
    const win = this.app.addon.windowManager.mainWindow
    win.minimize()
  }

  maximize(id) {
    const win = this.app.addon.windowManager.mainWindow
    win.webContents.send('maximize')
    win.maximize()
  }
 
  unmaximize(id) {
    const win = this.app.addon.windowManager.mainWindow
    win.unmaximize()
    win.webContents.send('unmaximize')
  }

  close(id) {
    const win = this.app.addon.windowManager.mainWindow
    if (process.platform !== 'darwin') {
      win.close()
    } else {
      win.hide()
    }
  }

  relaunch() {
    electronApp.relaunch()
    electronApp.exit(0)
  }

  getConfig() {
    return this.app.addon.appConfigManager.getAll()
  }

  logInfo(content) {
    Log.info(content)
  }

  logError(content) {
    Log.error(content)
  }

  logDebug(content) {
    Log.debug(content)
  }

  logWarn(content) {
    Log.warn(content)
  }
}

BaseService.toString = () => '[class BaseService]'
module.exports = BaseService
