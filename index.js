
const Axios = require('./src/axios.config')

class API {
  constructor(token, debug) {
    this.axios = new Axios(token, debug)

    this.courses = require('./src/resources/courses')(this.axios)
    this.coupons = require('./src/resources/coupons')(this.axios)
    this.announcements = require('./src/resources/announcements')(this.axios)
    this.statements = require('./src/resources/statements')(this.axios)
  }
}

module.exports = API