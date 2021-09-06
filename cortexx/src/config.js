// config.js
// 2021-09-05
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Store Environment variables to be used across the app
// -----------------------------------------------------

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    config: process.env
}
