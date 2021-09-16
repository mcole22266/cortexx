// loginForm.js
// 2021-09-15
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Registration Form for New Users
// --------------------------------------------

import { Component, createRef } from "react";
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const { config } = require('../../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = `/auth/login`

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

class LoginForm extends Component {
    constructor (props) {
        super (props)
        this.handleLogin = this.handleLogin.bind(this)

        this.usernameInput = createRef()
        this.passwordInput = createRef()

        this.state = {
            error: null,
            isLoaded: false
        }
    }

    handleLogin (event) {
        event.preventDefault()

        const user = {
            username: this.usernameInput.current.value,
            password: this.passwordInput.current.value
        }

        api.post(backend_endpoint, user)
            .then(response => {
                if ('token' in response.data) {
                    localStorage.setItem("token", response.data.token)
                    this.props.history.push('/minibank')
                } else {
                    alert(response.data.message)
                }
            }
        )
    }

    componentDidMount () {

        api.get(`${backend_host}:${backend_port}/auth`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.data.isLoggedIn) {
                    this.props.history.push('/minibank')
                }
            })
    }

    render () {
        return (
            <Form onSubmit={this.handleLogin}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" ref={this.usernameInput} placeholder="myKewlUsername" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" ref={this.passwordInput} placeholder="mySecurePassword04!@" />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        )
    }
}

export default withRouter(LoginForm)
