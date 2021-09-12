// iou.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// NodeJS Backend Queries for the IOU API
// --------------------------------------

const Pool = require('pg').Pool

const { config } = require('../config')

// Create DB Pool
const dbPool = new Pool({
    user: config.POSTGRES_USER,
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    password: config.POSTGRES_PASSWORD,
    port: config.POSTGRES_PORT
})

const getDebts = (req, res) => {
    console.log('Getting all Debts from DB')

    let query = `
    SELECT *
    FROM iou.debt
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getDebtById = (req, res) => {
    console.log('Getting Debt from DB')
    debtId = req.params.debtId

    let query = `
    SELECT *
    FROM iou.debt
    WHERE id='${debtId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createDebt = (req, res) => {
    console.log('Creating Debt in DB')
    const name = req.body.name
    const amount = req.body.amount

    let query = `
    INSERT INTO iou.debt (
        name, amount
    ) VALUES (
        '${name}', ${amount}
    ) RETURNING id
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`New Debt added with ID: ${results.rows[0].id}`)
    })
}

const updateDebt = (req, res) => {
    console.log('Updating Debt in DB')
    const debtId = req.params.debtId
    const name = req.body.name
    const amount = req.body.amount

    let query = `
    UPDATE iou.debt
    SET 
        name='${name}',
        amount=${amount}
    WHERE id='${debtId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Debt modified with ID: ${debtId}`)
    })
}

const deleteDebt = (req, res) => {
    console.log('Deleting Debt from DB')
    const debtId = req.params.debtId

    let query = `
    DELETE FROM iou.debt
    WHERE id='${debtId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Debt deleted with ID: ${debtId}`)
    })
}

// Export Functions
module.exports = {
    getDebts,
    getDebtById,
    createDebt,
    updateDebt,
    deleteDebt
}
