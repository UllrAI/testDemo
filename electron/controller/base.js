const { Controller } = require('ee-core')

class BaseController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.service = this.app.service.base
  }

  minimize(payload) {
    const { id } = payload
    this.service.minimize(id)
  }

  maximize(payload) {
    const { id } = payload
    this.service.maximize(id)
  }

  unmaximize(payload) {
    const { id } = payload
    this.service.unmaximize(id)
  }

  setWindowSize(payload) {
    const {id, width, height} = payload
    this.service.setWindowSize(id, width, height)
  }

  close(payload) {
    const { id } = payload
    this.service.close(id)
  }

  relaunch() {
    this.service.relaunch()
  }

  getConfig() {
    return this.service.getConfig()
  }

  logInfo(payload) {
    const { content } = payload
    this.service.logInfo(content)
  }

  logError(payload) {
    const { content } = payload
    this.service.logError(content)
  }

  logDebug(payload) {
    const { content } = payload
    this.service.logDebug(content)
  }

  logWarn(payload) {
    const { content } = payload
    this.service.logWarn(content)
  }
}

BaseController.toString = () => '[class BaseController]'
module.exports = BaseController
