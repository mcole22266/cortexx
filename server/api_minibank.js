// api_minibank.js
// 2021-09-06
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// NodeJS Backend Queries for the Minibank API
// --------------------------------------------

const Pool = require('pg').Pool

const { config } = require('./config')

// Create DB Pool
const dbPool = new Pool({
    user: config.POSTGRES_USER,
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    password: config.POSTGRES_PASSWORD,
    port: config.POSTGRES_PORT
})

// Accounts 
const getAccounts = (req, res) => {
    console.log('Getting all Accounts from DB')

    let query = `
    SELECT *
    FROM minibank.account
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getAccountById = (req, res) => {
    console.log('Getting Account from DB')
    accountId = req.params.accountId

    let query = `
    SELECT *
    FROM minibank.account
    WHERE id='${accountId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createAccount = (req, res) => {
    console.log('Creating Account in DB')
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone

    let query = `
    INSERT INTO minibank.account (
        name, email, phone
    ) VALUES (
        '${name}', '${email}',
        '${phone}'
    ) RETURNING id
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`New Account added with ID: ${results.rows[0].id}`)
    })
}

const updateAccount = (req, res) => {
    console.log('Updating Account in DB')
    const accountId = req.params.accountId
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone

    let query = `
    UPDATE minibank.account
    SET
        name='${name}',
        email='${email}',
        phone='${phone}'
    WHERE id='${accountId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Account modified with ID: ${accountId}`)
    })
}

const deleteAccount = (req, res) => {
    console.log('Deleting Account from DB')
    const accountId = req.params.accountId

    let query = `
    DELETE FROM minibank.account
    WHERE id='${accountId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Account deleted with ID: ${accountId}`)
    })
}

// Payments

const getPayments = (req, res) => {
    console.log('Getting all Payments from DB')

    let query = `
    SELECT *
    FROM minibank.payment
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPaymentById = (req, res) => {
    console.log('Getting Payment from DB')
    paymentId = req.params.paymentId

    let query = `
    SELECT *
    FROM minibank.payment
    WHERE id='${paymentId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getPaymentByAccountId = (req, res) => {
    console.log('Getting Payment from DB')
    accountId = req.params.accountId

    let query = `
    SELECT *
    FROM minibank.payment
    WHERE account_id='${accountId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createPayment = (req, res) => {
    console.log('Creating Payment in DB')
    const accountId = req.body.accountId
    const amount = req.body.amount
    const note = req.body.note

    let query = `
    INSERT INTO minibank.payment (
        account_id, amount, note
    ) VALUES (
        '${accountId}', '${amount}',
        '${note}'
    ) RETURNING id
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`New Payment added with ID: ${results.rows[0].id}`)
    })
}

const updatePayment = (req, res) => {
    console.log('Updating Payment in DB')
    const paymentId = req.params.paymentId
    const accountId = req.body.accountId
    const amount = req.body.amount
    const note = req.body.note

    let query = `
    UPDATE minibank.payment
    SET
        account_id='${accountId}',
        amount='${amount}',
        note = '${note}'
    WHERE id='${paymentId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Payment modified with ID: ${paymentId}`)
    })
}

const deletePayment = (req, res) => {
    console.log('Deleting Payment from DB')
    const paymentId = req.params.paymentId

    let query = `
    DELETE FROM minibank.payment
    WHERE id='${paymentId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Payment deleted with ID: ${paymentId}`)
    })
}

// Balances
const getBalances = (req, res) => {
    console.log('Getting all Balances from DB')

    let query = `
    SELECT *
    FROM minibank.balance
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getBalanceById = (req, res) => {
    console.log('Getting Balance from DB')
    accountId = req.params.accountId

    let query = `
    SELECT *
    FROM minibank.balance
    WHERE account_id='${accountId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

// Export Functions
module.exports = {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount,

    getPayments,
    getPaymentById,
    getPaymentByAccountId,
    createPayment,
    updatePayment,
    deletePayment,

    getBalances,
    getBalanceById
}
