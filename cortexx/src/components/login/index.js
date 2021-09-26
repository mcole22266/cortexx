// index.js
// 2021-09-15
// Michael Cole (mcole042891.prof.def@gmail.com)
//
// Landing Page for Cortexx Login
// ---------------------------------------------

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../home/navbar';
import LoginForm from './loginForm';
import isLoggedIn from '../../controllers/auth';

class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false
        }
    }

    componentDidMount () {

        isLoggedIn()
            .then(result => {
                if (result) {
                    this.props.history.push('/minibank')
                }
            })

    }


    render () {
        return (
            <div>
                <Navbar />

                <div className='container'>
                    <LoginForm />
                </div>

            </div>
        )
    }
}

export default withRouter(Login)
