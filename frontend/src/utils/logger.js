import {ipcApiRoute} from '@/api/main'
import {invoke} from '@/utils/ipc'

class Logger {
  constructor() {

  }

  static info(content) {
    invoke(ipcApiRoute.logInfo, {content})
  }

  static error(content) {
    invoke(ipcApiRoute.logError, {content})
  }

  static debug(content) {
    invoke(ipcApiRoute.logDebug, {content})
  }

  static warn(content) {
    invoke(ipcApiRoute.logWarn, {content})
  }
}


export default Logger
