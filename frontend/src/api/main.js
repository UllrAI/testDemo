/**
 * 路由定义（主进程与渲染进程通信频道定义）
 */
const ipcApiRoute = {
  // -------- Base -----------------------------
  minimize: 'controller.base.minimize',
  maximize: 'controller.base.maximize',
  unmaximize: 'controller.base.unmaximize',
  close: 'controller.base.close',
  relaunch: 'controller.base.relaunch',

  logInfo: 'controller.base.logInfo',
  logError: 'controller.base.logError',
  logDebug: 'controller.base.logDebug',
  logWarn: 'controller.base.logWarn',

  getConfig: 'controller.base.getConfig',


  // -------- Auth ----------------------------
  login: 'controller.auth.login',
  logout: 'controller.auth.logout',

  // -------- Home ---------------------------
  test: 'controller.home.test'
}

/**
 * 特殊的路由（频道）定义
 */
const specialIpcRoute = {
  appUpdater: 'app.updater', // 此频道在后端也有相同定义
  window1ToWindow2: 'window1-to-window2', // 窗口之间通信
  window2ToWindow1: 'window2-to-window1', // 窗口之间通信
}

export {
  ipcApiRoute,
  specialIpcRoute,
}
