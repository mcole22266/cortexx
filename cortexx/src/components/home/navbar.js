// navbar.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Navbar Component for Minibank Service of Cortexx
// ------------------------------------------------

import { Component } from "react";
import { withRouter } from "react-router";

class Navbar extends Component {
    constructor (props) {
        super (props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    async handleLogout (event) {
        event.preventDefault()

        localStorage.removeItem('token')
        await this.props.history.push('/login')
    }

    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>Cortexx</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportContent'>
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <a className='nav-link' type='button' role='button' onClick={this.handleLogout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);
