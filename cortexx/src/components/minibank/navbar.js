// navbar.js
// 2021-09-06
// Michael Cole (mcole042891.prod.dev@gmail.com)
//
// Navbar Component for Minibank Service of Cortexx
// ------------------------------------------------

import { Component } from "react";

export default class Navbar extends Component {

    render() {
        return (
            <nav className='navbar navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>
                        Cortexx
                    </a>
                </div>
            </nav>
        )
    }
}
