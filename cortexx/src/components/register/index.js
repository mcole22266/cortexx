// index.js
// 2021-09-12
// Michael Cole (mcole042891.prof.def@gmail.com)
//
// Landing Page for Cortexx Registration
// ---------------------------------------------

import { Component } from 'react';
import { withRouter } from 'react-router';
import Navbar from '../home/navbar';
import RegistrationForm from './registrationForm';
import isLoggedIn from '../../controllers/auth';

class Register extends Component {
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
                    <RegistrationForm />
                </div>

            </div>
        )
    }
}

export default withRouter(Register);
