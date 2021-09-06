// showPayments.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Payment Table Component for Minibank Service of Cortexx
// -------------------------------------------------------

import { Component } from 'react';
import axios from 'axios';

// TODO: Remove after testing
const loggedin_accountid = 3

const { config } = require('../../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = `/minibank/payments/account/${loggedin_accountid}`

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

export default class ShowPayments extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            payments: []
        }
    }

    componentDidMount () {
        // Get Payments
        api.get(backend_endpoint)
            .then(response => {
                this.setState({
                    payments: response.data,
                    isLoaded: true
                })
            })
    }

    render () {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            const payments = this.state.payments
            return (
                <div>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Payment ID</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map(payment => (
                                    <tr>
                                        <th scope="row">{ payment.id }</th>
                                        <td>{ payment.payment_date }</td>
                                        <td>{ payment.amount }</td>
                                        <td>{ payment.note }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}


