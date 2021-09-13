// index.js
// 2021-09-12
// Michael Cole (mcole042891.prof.def@gmail.com)
//
// Landing Page for Cortexx Registration
// ---------------------------------------------

import { Component } from 'react';
import Navbar from '../home/navbar';
import RegistrationForm from './registrationForm';

export default class Register extends Component {
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
                    <RegistrationForm />
                </div>

            </div>
        )
    }
}
