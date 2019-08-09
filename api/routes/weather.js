const { Router } = require('express')
const { ipStack, darkSky } = require('../vendorAPI')
const router = Router()

router.get('/weather', (req, res, next) => {
  const ip = `72.178.92.118`
  // req.connection.remoteAddress || req.headers['x-forwarded-for']
  let response = {}

  // ipStack Call
  ipStack('GET', ip)
    // ip Stack Call Successful
    .then((data) => {
      const location = JSON.parse(data)
      response = {
        ...response,
        lat: location.latitude,
        lon: location.longitude,
        city: location.city
      }

      // Dark Sky Call
      darkSky('GET', { lat: response.lat, lon: response.lon })
        // Dark Sky Call Successful
        .then((data) => {
          // Parse Data
          const { currently, alerts, daily } = JSON.parse(data)

          // Format Forecast Data
          daily.data = daily.data.map((data) => {
            return {
              time: getWeekDay(data.time),
              temp: averageTemp([data.temperatureHigh, data.temperatureLow]),
              icon: `/${data.icon}.svg`
            }
          })
          res.send({
            ...response,
            labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
            summary: currently.summary,
            temp: Math.round(currently.temperature),
            windSpeed: currently.windSpeed,
            windDir: currently.windBearing,
            forecast: daily.data,
            icon: `/${currently.icon}.svg`,
            alerts
          })
        })
        // Dark Sky Call Error
        .catch((error) => {
          res.send(error)
        })
    })
    .catch((error) => {
      res.send(error)
    })
})

function getWeekDay(date) {
  date = new Date(date * 1000).getDay()
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  return weekdays[date]
}

function averageTemp(temps) {
  return Math.round(temps.reduce((low, high) => low + high, 0) / temps.length)
}

function getIcon(icon) {}

module.exports = router
