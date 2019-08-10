import axios from 'axios'
const { Router } = require('express')
const { ipStack, darkSky, openDataZip } = require('../vendorAPI')
const router = Router()

router.get('/weather', async (req, res, next) => {
  try {
    // Get Location from IP or Zip
    const ip = await axios('https://icanhazip.com')
    const location = req.query.zip
      ? await getZip(req.query.zip)
      : await getIP(ip.data)
    // Dark Sky Call
    darkSky('GET', { lat: location.lat, lon: location.lon })
      // Dark Sky Call Successful
      .then((data) => {
        // Extract and Parse Data
        const { currently, daily, hourly } = JSON.parse(data)

        // Format Forecast Data
        daily.data = daily.data.map((data) => {
          return {
            time: getWeekDay(data.time),
            temp: {
              low: Math.round(data.temperatureLow),
              high: Math.round(data.temperatureHigh)
            },
            icon: `/${data.icon}.svg`
          }
        })

        // Send Response
        res.status(200).json({
          ...location,
          pressure: Math.round(currently.pressure),
          summary: hourly.summary,
          temp: Math.round(currently.temperature),
          windSpeed: currently.windSpeed,
          windDir: getDir(currently.windBearing),
          humidity: currently.humidity * 100,
          icon: `/${currently.icon}.svg`,
          labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
          forecast: daily.data
        })
      })
      // Dark Sky Call Error
      .catch((error) => {
        res.status(500).json(error)
      })
    // Error locating by zip or ip
  } catch (e) {
    res.status(500).json({
      error: e.toString(),
      alert: { msg: 'That is not the zip im looking for...', title: 'Ouch' }
    })
  }
})

// Turns Degree into Wind Direction
function getDir(num) {
  const val = parseInt(num / 45 + 0.5)
  const dir = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dir[val % dir.length]
}

// Turns weekday number into day
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

// Get Coordinates bas off Zip
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

// Get Coordinates bas off IP
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
