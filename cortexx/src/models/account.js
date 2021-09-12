// account.js
// 2021-09-12
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// Account Model
// ---------------------------------------------

export default class Account {
    constructor (props) {

        this.id = props.id
        this.name = props.name
        this.email = props.email
        this.phone = props.phone
        this.account_create_date = props.account_create_date
        this.account_close_date = props.account_close_date
    }
}
