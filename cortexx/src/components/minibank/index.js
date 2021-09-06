import React from 'react';
import axios from 'axios';

export default class Minibank extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            error: null,
            isLoaded: false,
            debts: []
        }
    }

    componentDidMount () {
        axios.get('http://localhost:5000/iou/debts/1')
            .then(response => {
                this.setState({
                    debts: response.data,
                    isLoaded: true
                })
            })
    }

    render() {
        if (!this.state.isLoaded) {
            console.log('Loading...')
            return <div>Loading...</div>
        } else {
            console.log('Loaded! ', this.state.debts[0])
            return (
                <div>
                    <p>{ this.state.debts[0].name }</p>
                </div>
            )
        }
    }
}
