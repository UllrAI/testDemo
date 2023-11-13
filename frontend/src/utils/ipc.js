const ipcRenderer = window.electron.ipcRenderer

function invoke(channel, payload) {
  return ipcRenderer.invoke(channel, payload)
}

function on(channel, cb) {
  ipcRenderer.on(channel, cb)
}

function removeAllListeners(channel) {
  ipcRenderer.removeAllListeners(channel)
}

export {
  invoke,
  on,
  removeAllListeners
}
