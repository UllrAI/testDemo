const { Service } = require('ee-core')

class HomeService extends Service {

  constructor(ctx) {
    super(ctx)
  }

  test(id) {
    if (id === 561) {
      return true
    } else {
      return false
    }
  }
}

HomeService.toString = () => '[class HomeService]'
module.exports = HomeService
