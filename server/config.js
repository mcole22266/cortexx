// config.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Store Environment variables to be used across the server
// --------------------------------------------------------

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    config: process.env
}
