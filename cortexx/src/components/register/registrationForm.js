// registrationForm.js
// 2021-09-12
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Registration Form for New Users
// --------------------------------------------

import { Component } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class RegistrationForm extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false
        }
    }

    render () {
        return (
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="myKewlUsername4" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="mySecurePassword04!@" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="My Name" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="myKewlEmail@example.com" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="(555) 555-5555" />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        )
    }
}