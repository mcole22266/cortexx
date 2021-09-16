// server.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// Entrypoint for NodeJS REST API Server
// --------------------------------------

const express = require('express')
const bodyParser = require('body-parser')

const { config } = require('./config')
const db_iou = require('./api/iou')
const db_minibank = require('./api/minibank')
const db_auth = require('./api/auth')

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

// Minibank Routes
    // Accounts
app.get('/minibank/accounts', db_minibank.getAccounts)
app.get('/minibank/accounts/:accountId', db_minibank.getAccountById)
app.post('/minibank/accounts', db_minibank.createAccount)
app.put('/minibank/accounts/:accountId', db_minibank.updateAccount)
app.delete('/minibank/accounts/:accountId', db_minibank.deleteAccount)
    // Payments
app.get('/minibank/payments', db_minibank.getPayments)
app.get('/minibank/payments/:paymentId', db_minibank.getPaymentById)
app.get('/minibank/payments/account/:accountId', db_minibank.getPaymentByAccountId)
app.post('/minibank/payments', db_minibank.createPayment)
app.put('/minibank/payments/:paymentId', db_minibank.updatePayment)
app.delete('/minibank/payments/:paymentId', db_minibank.deletePayment)
    // Balances
app.get('/minibank/balances', db_minibank.getBalances)
app.get('/minibank/balances/:accountId', db_minibank.getBalanceById)

// User Routes
app.get('/auth/users', db_auth.getUsers)
app.get('/auth/users/:userId', db_auth.getUserById)
app.post('/auth/users', db_auth.createUser)
app.put('/auth/users/:userId', db_auth.updateUser)
app.delete('/auth/users/:userId', db_auth.deleteUser)
    // Register
app.post('/auth/register', db_auth.registerUser)
    // Login
app.post('/auth/login', db_auth.loginUser)
    // Verify
app.get('/auth', db_auth.verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.id})
})

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
