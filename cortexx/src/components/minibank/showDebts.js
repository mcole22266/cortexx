import { Component } from 'react';
import axios from 'axios';

const { config } = require('../../config');

const backend_host = config.REACT_APP_BACKEND_HOST
const backend_port = config.REACT_APP_BACKEND_PORT
const backend_endpoint = '/iou/debts'

const api = axios.create({
    baseURL: `${backend_host}:${backend_port}`
})

export default class ShowDebts extends Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            debts: []
        }
    }

    componentDidMount () {
        // Get Debts
        api.get(backend_endpoint)
            .then(response => {
                this.setState({
                    debts: response.data,
                    isLoaded: true
                })
            })
    }

    render () {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            const debts = this.state.debts
            return (
                <div>
                    <ul>
                        {
                            debts.map(debt => (
                                <li key={ debt.id }>
                                    { debt.name } { debt.amt }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        }
    }
}
