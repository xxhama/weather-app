import { icons } from '../../assets/weather-icons'

const { Router } = require('express')
const router = Router()

router.get('/weather', (req, res, next) => {
  res.send(data)
})

const data = {
  humidity: '70',
  windDir: '100',
  windSpeed: '67',
  icon: icons.cloudy,
  city: 'New Orleans',
  summary: 'Oh hey',
  labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
  temp: '90',
  forecast: []
}

module.exports = router
