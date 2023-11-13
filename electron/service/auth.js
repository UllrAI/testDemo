const { Service } = require('ee-core')

class AuthService extends Service {

  constructor(ctx) {
    super(ctx)
    this.windowManager = this.app.addon.windowManager
  }

  login() {
    const win = this.windowManager.mainWindow
    win.hide()
    win.setTitle('首页')
    win.loadURL(`${this.windowManager.baseUrl}/home`)
    win.setMinimumSize(1366, 720)
    win.setMaximumSize(9999, 9999)
    win.setSize(1366, 720)
    win.setMaximizable(true)
    win.center()
    win.show()
  }

  logout() {
    const win = this.windowManager.mainWindow
    win.unmaximize()
    win.hide()
    win.loadURL(`${this.windowManager.baseUrl}/login`)
    win.setTitle('图像评测系统检测客户端 登录')
    win.setMinimumSize(660, 440)
    win.setMaximumSize(660, 440)
    win.setSize(660, 440)
    win.setMaximizable(false)
    win.center()
    win.show()
  }
}

AuthService.toString = () => '[class AuthService]'
module.exports = AuthService
