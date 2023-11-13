const { Controller } = require('ee-core')

class AuthController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.service = this.service.auth
  }

  async login(payload, event) {
    this.service.login()
  }

  logout(payload, event) {
    this.service.logout()
  }
}

AuthController.toString = () => '[class AuthController]'
module.exports = AuthController
