import { icons } from '../../assets/weather-icons'
const { Router } = require('express')
const { ipStack } = require('../vendorAPI')
const router = Router()

router.get('/weather', (req, res, next) => {
  const ip = `72.178.92.118`
  // req.connection.remoteAddress || req.headers['x-forwarded-for']
  ipStack('GET', ip)
    .then((response) => {
      res.send(JSON.parse(response))
    })
    .catch((error) => {
      res.send(error)
    })
})

// let data = {
//   humidity: '70',
//   windDir: '100',
//   windSpeed: '67',
//   icon: icons.cloudy,
//   city: 'New Orleans',
//   summary: 'Oh hey',
//   labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
//   temp: '90',
//   forecast: []
// }

module.exports = router
