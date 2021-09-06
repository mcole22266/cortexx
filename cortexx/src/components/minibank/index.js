import { Component } from 'react';
import ShowDebts from './showDebts';

export default class Minibank extends Component {

    render() {
        return (
            <div className='container'>
                <h1>Mini Bank</h1>

                <ShowDebts />

            </div>
        )
    }
}
