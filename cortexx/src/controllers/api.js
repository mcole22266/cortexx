// api.js
// 2021-09-26
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// API Controller
// ---------------------------------------------

import axios from 'axios';

const { config } = require('../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_base_url = `${backend_host}:${backend_port}`

const api = axios.create({
    baseURL: backend_base_url
})

export default api;
