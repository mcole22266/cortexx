// api_iou.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// Set of queries for the IOU Schema
// ---------------------------------------------

const Pool = require('pg').Pool

// Create DB Pool
const dbPool = new Pool({
    user: 'db_admin',
    host: 'db',
    database: 'cortexx',
    password: 'dbadmin12!@',
    port: 5432
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
    const amt = req.body.amt

    let query = `
    INSERT INTO iou.debt (
        name, amt
    ) VALUES (
        '${name}', ${amt}
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
    const amt = req.body.amt

    let query = `
    UPDATE iou.debt
    SET 
        name='${name}',
        amt=${amt}
    WHERE id='${debtId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).send(`Debt modified with ID: ${debtId}`)
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
