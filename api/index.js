const express = require('express')
const app = express()

// Import API Routes
app.use(require('./routes/weather'))

module.exports = {
  path: '/api',
  handler: app
}
