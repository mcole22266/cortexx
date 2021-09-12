// showBalance.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Balance Showing Component for Minibank Service of Cortexx
// ---------------------------------------------------------

import { Component } from 'react';
import axios from 'axios';

// TODO: Remove after testing
const loggedin_accountid = 1

const { config } = require('../../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = `/minibank/balances/${loggedin_accountid}`

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

export default class ShowBalance extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            balance: null
        }
    }

    componentDidMount () {
        // Get Balance
        api.get(backend_endpoint)
            .then(response => {
                this.setState({
                    balance: response.data[0].balance,
                    isLoaded: true
                })
            })
    }

    render () {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            const balance = this.state.balance
            return (
                <div className='card text-white bg-success mb-3 showBalance'>
                    <div className='card-body'>
                        <h5 className='card-title'>Current Balance</h5>
                        <h2 className='card-text'>${ balance }</h2>
                    </div>
                </div>

            )
        }
    }
}

