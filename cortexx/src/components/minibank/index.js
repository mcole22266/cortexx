// index.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Landing Page for Minibank Service of Cortexx
// --------------------------------------------

import { Component } from 'react';
import axios from 'axios';
import Navbar from '..//home/navbar';
import ShowBalance from './showBalance';
import ShowPayments from './showPayments';
import Account from '../../models/account';

// TODO: Remove after testing
const loggedin_accountid = 1

const { config } = require('../../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = `/minibank/accounts/${loggedin_accountid}`

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

export default class Minibank extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            account: null
        }
    }

    componentDidMount () {
        // Get Account Information
        api.get(backend_endpoint)
            .then(response => {
                this.setState({
                    account: new Account(response.data[0]),
                    isLoaded: true
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            const account = this.state.account
            console.log(account)
            return (
                <div>
                    <Navbar />

                    <div className='container'>
                        <h1>Welcome { account.name }!</h1>

                        <h3>Your Info</h3>
                        <ul>
                            <li>Email: { account.email }</li>
                            <li>Phone: { account.phone }</li>
                        </ul>

                        <ShowBalance />

                        <ShowPayments />

                    </div>

                </div>
            )
        }
    }
}
