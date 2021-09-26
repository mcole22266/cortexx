// index.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Landing Page for Minibank Service of Cortexx
// --------------------------------------------

import { Component } from 'react';
import { withRouter } from 'react-router';
import Navbar from '..//home/navbar';
import ShowBalance from './showBalance';
import ShowPayments from './showPayments';
import Account from '../../models/account';
import api from '../../controllers/api';
import isLoggedIn from '../../controllers/auth';

class Minibank extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            account: null
        }
    }

    componentDidMount () {

        isLoggedIn()
            .then(result => {
                if (!result) {
                    this.props.history.push('/login')
                } else {
                    // get account information
                    api.get(`/minibank/accounts/${result.id}`)
                        .then(response => {
                            this.setState({
                                account: new Account(response.data[0]),
                                isLoaded: true
                            })
                        })
                }
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

export default withRouter(Minibank)
