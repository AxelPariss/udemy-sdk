
const axios = require('axios')
const log = require('./log.config')

module.exports = class {
  constructor(token, debug = false) {

    axios.defaults.baseURL = 'https://www.udemy.com/api-2.0/'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common.Accept = 'application/json;charset=UTF-8'
    axios.defaults.headers.common['x-udemy-authorization'] = `Bearer ${token}`
    axios.defaults.headers.common.authorization = `Bearer ${token}`

    /* -------------------------
   ----- INTERCEPTORS ------
   ------------------------- */

    // Request
    axios.interceptors.request.use(
      (config) => {
        if (debug) {
          log.info('➡️ Request ✅', { url: config.url })
        }
        return config
      },
      (error) => {
        if (debug) {
          log.error('➡️ Request ️❌', error)
        }
        throw new Error(error)
      }
    )

    // Response
    axios.interceptors.response.use(
      (response) => {
        if (debug) {
          log.info('⬅️️ Response ✅', { data: response.data })
        }

        if (response.status === 400 || response.status === 403) throw response.data.detail

        return response
      },
      (error) => {
        if (debug) {
          log.info('⬅️️ Response ️❌', error)
        }

        throw error.response.data.detail
      }
    )


    return axios;
  }
}