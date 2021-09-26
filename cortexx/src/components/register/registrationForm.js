// registrationForm.js
// 2021-09-12
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Registration Form for New Users
// --------------------------------------------

import { Component, createRef } from "react";
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const { config } = require('../../config')

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = `/auth/register`

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

class RegistrationForm extends Component {
    constructor (props) {
        super (props)
        this.handleRegister = this.handleRegister.bind(this)

        this.usernameInput = createRef()
        this.passwordInput = createRef()
        this.nameInput = createRef()
        this.emailInput = createRef()
        this.phoneInput = createRef()

        this.state = {
            error: null,
            isLoaded: false
        }
    }

    handleRegister (event) {
        event.preventDefault()

        const user = {
            username: this.usernameInput.current.value,
            password: this.passwordInput.current.value,
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        }

        api.post(backend_endpoint, user)
            .then(response => {
                console.log(response)
                api.post(`${backend_host}:${backend_port}/auth/login`, user)
                    .then(response => {
                        if ('token' in response.data) {
                            localStorage.setItem('token', response.data.token)
                            this.props.history.push('/minibank')
                        } else {
                            alert(response.data.message)
                        }
                    })
            })
    }

    render () {
        return (
            <Form onSubmit={this.handleRegister}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={this.usernameInput} placeholder="myKewlUsername4" autoComplete='username'/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={this.passwordInput} placeholder="mySecurePassword04!@" autoComplete='new-password'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={this.nameInput} placeholder="My Name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" ref={this.emailInput} placeholder="myKewlEmail@example.com" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" ref={this.phoneInput} placeholder="(555) 555-5555" />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        )
    }
}

export default withRouter(RegistrationForm)
