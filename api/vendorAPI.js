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
  }
}
