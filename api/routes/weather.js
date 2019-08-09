const { Router } = require('express')
const { ipStack, darkSky, openDataZip } = require('../vendorAPI')
const router = Router()

router.get('/weather', async (req, res, next) => {
  // Set IP
  const ip = process.env.NODE_ENV
    ? `72.178.92.118`
    : req.connection.remoteAddress || req.headers['x-forwarded-for']

  try {
    // Get Location from IP or Zip
    const location = req.query.zip
      ? await getZip(req.query.zip)
      : await getIP(ip)

    // Dark Sky Call
    darkSky('GET', { lat: location.lat, lon: location.lon })
      // Dark Sky Call Successful
      .then((data) => {
        // Parse Data
        const { currently, alerts, daily, hourly } = JSON.parse(data)

        // Format Forecast Data
        daily.data = daily.data.map((data) => {
          return {
            time: getWeekDay(data.time),
            temp: averageTemp([data.temperatureHigh, data.temperatureLow]),
            icon: `/${data.icon}.svg`
          }
        })
        res.send({
          ...location,
          labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
          summary: hourly.summary,
          temp: Math.round(currently.temperature),
          windSpeed: currently.windSpeed,
          windDir: currently.windBearing,
          forecast: daily.data,
          humidity: currently.humidity * 100,
          icon: `/${currently.icon}.svg`,
          alerts
        })
      })
      // Dark Sky Call Error
      .catch((error) => {
        res.status(500).json(error)
      })
  } catch (e) {
    res.status(500).json({
      error: e.toString(),
      msg: 'That is not the zip im looking for...'
    })
  }
})

function getWeekDay(date) {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  date = new Date(date * 1000).getDay()
  return weekdays[date]
}

function averageTemp(temps) {
  return Math.round(temps.reduce((low, high) => low + high, 0) / temps.length)
}

function getZip(zip) {
  return new Promise((resolve, reject) => {
    openDataZip(zip)
      .then((data) => {
        const location = JSON.parse(data).records[0].fields
        resolve({
          city: location.city,
          lon: location.longitude,
          lat: location.latitude
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function getIP(ip) {
  return new Promise((resolve, reject) => {
    // ipStack Call
    ipStack('GET', ip)
      // ip Stack Call Successful
      .then((data) => {
        const location = JSON.parse(data)
        resolve({
          lat: location.latitude,
          lon: location.longitude,
          city: location.city
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
module.exports = router
