import request from 'request'

module.exports = {
  ipStack(method, ipAddr) {
    return new Promise((resolve, reject) => {
      request(
        `http://api.ipstack.com/${ipAddr}`,
        {
          method,
          qs: {
            access_key: process.env.IP_STACK_KEY
          }
        },
        (err, res, body) => {
          err ? reject(err) : resolve(body)
        }
      )
    })
  },
  darkSky(method, corr) {
    return new Promise((resolve, reject) => {
      const BASE_URL = `https://api.darksky.net`
      const API_KEY = process.env.DARK_SKY_KEY
      request(
        `${BASE_URL}/forecast/${API_KEY}/${corr.lat},${corr.lon}`,
        {
          qs: {}
        },
        (err, res, body) => {
          err ? reject(err) : resolve(body)
        }
      )
    })
  }
}
