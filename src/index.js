
const Axios = require('../Axios')

class API {
  constructor(token, debug) {
    this.axios = new Axios(token, debug)

    this.courses = require('./resources/courses')(this.axios)
    this.coupons = require('./resources/coupons')(this.axios)
    this.announcements = require('./resources/announcements')(this.axios)
    this.statements = require('./resources/statements')(this.axios)
  }
}

module.exports = API