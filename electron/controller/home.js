const { Controller, Utils } = require('ee-core')

class HomeController extends Controller {

  constructor(ctx) {
    super(ctx)
    this.service = this.service.home
  }

  test(payload) {
    const { id } = payload
    const result = this.service.test(id)
    if (result) {
      return {
        success: true,
        message: 'ok',
        data: '',
      }
    } else {
      return {
        success: false,
        message: 'id err',
        data: null
      }
    }
  }
}

HomeController.toString = () => '[class HomeController]'
module.exports = HomeController
