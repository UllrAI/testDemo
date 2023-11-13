'use strict'

const dayjs = require('dayjs')
const path = require('path')
const { app } = require('electron')
const UtilsPs = require('ee-core/ps')

/**
 * 默认配置
 */
module.exports = (appInfo) => {

  const config = {}

  let vueDevServerPort = null
  if (!app.isPackaged) {
    const packageJson = require('../../package.json')
    vueDevServerPort = packageJson.dev.VUE_DEV_SERVER_PORT
  }
  /**
   * 应用模式配置
   */
  config.developmentMode = {
    default: 'vue',
    mode: {
      vue: {
        hostname: 'localhost',
        port: vueDevServerPort
      },
      react: {
        hostname: 'localhost',
        port: 3000
      },
      html: {
        hostname: 'localhost',
        indexPage: 'index.html'
      },
    }
  }

  /**
   * 开发者工具
   */
  config.openDevTools = !appInfo.isPackage
  // config.openDevTools = true

  /**
   *  应用程序顶部菜单 true|false|dev-show
   *  true, false, 'dev-show'(dev环境显示，prod环境隐藏)
   */
  config.openAppMenu = 'dev-show'
  // config.openAppMenu = true

  /**
   * 主窗口
   */
  config.windowsOption = {
    title: 'EE框架',
    width: 660,
    height: 440,
    maximizable: false,
    minWidth: 660,
    maxWidth: 660,
    minHeight: 440,
    maxHeight: 440,
    webPreferences: {
      preload: path.join(appInfo.baseDir, 'preload', 'bridge.js'),
      webSecurity: false,
    },
    frame: false,
    // frame: true,
    show: true,
    // transparent: true,
    icon: path.join(appInfo.home, 'public', 'images', 'logo-32.png'),
  }

  /**
   * ee框架日志
   */
  config.logger = {
    dir: path.join(appInfo.execDir, 'logs'),
    errorLogName: `ee-error-${dayjs().format('YYYY-MM-DD')}.log`,
  }

  /**
   * 远程模式-web地址
   */
  config.remoteUrl = {
    enable: false,
    url: 'http://electron-egg.kaka996.com/'
  }

  /**
   * 内置socket服务
   */
  config.socketServer = {
    enable: false,
    port: 7070,
    path: '/socket.io/',
    connectTimeout: 45000,
    pingTimeout: 30000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8,
    transports: ['polling', 'websocket'],
    cors: {
      origin: true,
    }
  }

  /**
   * 内置http服务
   */
  config.httpServer = {
    enable: false,
    https: {
      enable: false,
      key: '/public/ssl/localhost+1.key',
      cert: '/public/ssl/localhost+1.pem'
    },
    port: 7071,
    cors: {
      origin: '*'
    },
    body: {
      multipart: true,
      formidable: {
        keepExtensions: true
      }
    },
    filterRequest: {
      uris: [
        'favicon.ico'
      ],
      returnData: ''
    }
  }

  /**
   * 主进程
   */
  config.mainServer = {
    host: 'localhost',
    port: 7072,
  }

  /**
   * 硬件加速
   */
  config.hardGpu = {
    enable: false
  }

  /**
   * 插件功能
   */
  config.addons = {
    example: {
      enable: false,
    },
    // 窗体管理插件
    windowManager: {
      enable: true,
    },
    // 配置文件管理插件
    appConfigManager: {
      enable: true,
      configDir: path.join(UtilsPs.getExtraResourcesDir(), 'config')
    },
  }

  return {
    ...config
  }
}
