// loginForm.js
// 2021-09-15
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Registration Form for New Users
// --------------------------------------------

import { Component, createRef } from "react";
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import api from '../../controllers/api';

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

        api.post('/auth/login', user)
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

    render () {
        return (
            <Form onSubmit={this.handleLogin}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" ref={this.usernameInput} placeholder="myKewlUsername" autoComplete='username'/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" ref={this.passwordInput} placeholder="mySecurePassword04!@" autoComplete='current-password'/>
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
