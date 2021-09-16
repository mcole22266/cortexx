// auth.js
// 2021-09-12
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// NodeJS Backend Queries for the Auth API
// --------------------------------------

const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
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

const getUsers = (req, res) => {
    console.log('Getting all Users from DB')

    let query = `
    SELECT *
    FROM auth.user
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    console.log('Getting User from DB')
    userId = req.params.userId

    let query = `
    SELECT *
    FROM auth.user
    WHERE id='${userId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    console.log('Creating User in DB')

    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const role = req.body.role

    let query = `
    INSERT INTO auth.user (
        username, name, email, password, phone, role
    ) VALUES (
        '${username}', '${name}',
        '${email}', '${password}',
        '${phone}', '${role}'
    ) RETURNING id
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`New User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (req, res) => {
    console.log('Updating User in DB')
    const userId = req.params.userId
    const username = req.body.username
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const role = req.body.role

    let query = `
    UPDATE auth.user
    SET 
        username='${username}',
        name='${name}',
        email='${email}',
        password='${password}',
        phone='${phone}',
        role='${role}'
    WHERE id='${userId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User modified with ID: ${userId}`)
    })
}

const deleteUser = (req, res) => {
    console.log('Deleting User from DB')
    const userId = req.params.userId

    let query = `
    DELETE FROM auth.user
    WHERE id='${userId}'
    `

    dbPool.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${userId}`)
    })
}

const registerUser = async (req, res) => {
    console.log('Registering New User')
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const role = 'user'

    // Check if username or email has been taken by another user already
    const usernameExists = await checkExists('username', username)
    const emailExists = await checkExists('email', email)

    if (usernameExists || emailExists) {
        res.json({message: "Username or email has already been taken"})
    } else {

        req.body.username = username.toLowerCase()
        req.body.email = email.toLowerCase()
        req.body.password = await bcrypt.hash(password, 10)
        req.body.role = role

        createUser(req, res)
    }
}

const loginUser = (req, res) => {
    console.log('Attempting to log in user')
    const username_input = req.body.username
    const password_input = req.body.password

    const user = getUserByUsername(username_input)
        .then(user => {
            // Check for valid Username
            if (!user.username) {
                return res.json({
                    message: 'Unrecognized Username'
                })
            }
            // If username is correct, continue
            bcrypt.compare(password_input, user.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            start_date: user.start_date,
                            end_date: user.end_date
                        }
                        jwt.sign(
                            payload,
                            config.REACT_APP_JWT_SECRET,
                            {expiresIn: 86400},
                            (err, token) => {
                                if (err) {
                                    return res.json({
                                        message: err
                                    })
                                } else {
                                    return res.json({
                                        message: 'success',
                                        token: 'Bearer ' + token
                                    })
                                }
                            }
                        )

                    } else {
                        return res.json({
                            message: 'Incorrect Password'
                        })
                    }
                })
        })
}

function checkExists(key, value) {
    // Check if a value exists in the DB
    let query = `
    SELECT *
    FROM auth.user
    WHERE ${key}='${value}'
    `

    return new Promise((resolve, reject) => {

        dbPool.query(query)
            .then(results => {
                if (results.rows.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

function getUserByUsername(username) {
    let query = `
    SELECT *
    FROM auth.user
    WHERE username='${username}'
    `

    return new Promise((resolve, reject) => {

        dbPool.query(query)
            .then(results => {
                if (results.rows.length > 0) {
                    resolve(results.rows[0])
                } else {
                    resolve(false)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

function verifyJWT(req, res, next) {
    console.log('Validating User')
    const token = req.headers['x-access-token']?.split(' ')[1]

    if (token) {
        jwt.verify(token, config.REACT_APP_JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to Authenticate"
                })
            } else {
                req.user = {};
                req.user.id = decoded.id
                req.user.username = decoded.username
                req.user.name = decoded.name
                req.user.email = decoded.email
                req.user.phone = decoded.phone
                next()
            }
        })
    } else {
        res.json({
            message: 'Incorrect Token Given',
            isLoggedIn: false
        })
    }
}


// Export Functions
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    registerUser,
    loginUser,
    verifyJWT
}
