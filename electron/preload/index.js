/*************************************************
 ** preload为预加载模块，该文件将会在程序启动时加载 **
 *************************************************/
/**
 * 预加载模块入口
 * @param {Object} app - 全局app对象
 */
module.exports = async (app) => {
  /**
   * 已实现的功能模块，可选择性使用和修改
   * 第一次获取插件对象时，ee框架会实例化插件类并缓存
   * 如果插件需要提前初始化，应在此处获取一下插件对象，保证再次获取插件对象时已经初始化完成
   */
  const windowManager = app.addon.windowManager
  const appConfigManager = app.addon.appConfigManager

  // 因为主窗体不是由windowManager插件创建的，需要调用插件内部的函数进行包装
  const mainWindow = app.electron.mainWindow
  windowManager.saveWindow('main', mainWindow)

  if(appConfigManager) await appConfigManager.initialize()
}
