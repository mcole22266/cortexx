// index.js
// 2021-09-15
// Michael Cole (mcole042891.prof.def@gmail.com)
//
// Landing Page for Cortexx Login
// ---------------------------------------------

import { Component } from 'react';
import Navbar from '../home/navbar';
import LoginForm from './loginForm';

export default class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {
            error: null,
            isLoaded: false
        }
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
