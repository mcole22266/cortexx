// server.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// Entrypoint for NodeJS REST API Server
// --------------------------------------

const express = require('express')
const bodyParser = require('body-parser')

const { config } = require('./config')
const db_iou = require('./api_iou')

const app = express()
const cors = require('cors')
const port = config.REACT_APP_BACKEND_PORT

// Setup Body Parser
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

// Test Connection
app.get('/', (req, res) => {
    res.json(" info: Connection Successful ")
})

// IOU Routes
app.get('/iou/debts', db_iou.getDebts)
app.get('/iou/debts/:debtId', db_iou.getDebtById)
app.post('/iou/debts', db_iou.createDebt)
app.put('/iou/debts/:debtId', db_iou.updateDebt)
app.delete('/iou/debts/:debtId', db_iou.deleteDebt)

// Start Server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
