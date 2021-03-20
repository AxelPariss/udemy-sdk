
const axios = require('axios')
const log = require('./log.config')

module.exports = class {
  constructor(token, debug = false) {

    axios.defaults.baseURL = 'https://www.udemy.com/api-2.0/'
    axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8'
    axios.defaults.headers.common['accept'] = 'application/json;charset=UTF-8'
    axios.defaults.headers.common['x-udemy-authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    
    axios.defaults.headers.common['accept-language'] = `fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7`
    axios.defaults.headers.common['sec-fetch-dest'] = `empty`
    axios.defaults.headers.common['sec-fetch-mode'] = `cors`
    axios.defaults.headers.common['sec-fetch-site'] = `same-origin`
    axios.defaults.headers.common['authorization'] = `XMLHttpRequest`
    axios.defaults.headers.common['referrer'] = `https://www.udemy.com/announcement/?type=Promotional`
    axios.defaults.headers.common['referrerPolicy'] = `strict-origin-when-cross-origin`
    axios.defaults.headers.common['mode'] = `cors`
    axios.defaults.headers.common['method'] = `POST`


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