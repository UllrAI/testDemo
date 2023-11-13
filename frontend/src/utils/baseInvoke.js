import { ipcApiRoute } from '@/api/main'
import { invoke } from '@/utils/ipc'
import LocalStore from '@/utils/LocalStore'

const global = new LocalStore('global', true)
const windowId = () => {
  return global.get('WINDOW_ID')
}

function minimize() {
  invoke(ipcApiRoute.minimize, { id: windowId() })
}

function maximize() {
  invoke(ipcApiRoute.maximize, { id: windowId() })
}

function unmaximize() {
  invoke(ipcApiRoute.unmaximize, { id: windowId() })
}

function close() {
  invoke(ipcApiRoute.close, { id: windowId() })
}

function getConfig() {
  invoke(ipcApiRoute.getConfig, {})
}

export default {
  minimize,
  maximize,
  unmaximize,
  close,
  getConfig,
}
