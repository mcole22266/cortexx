// user.js
// 2021-09-12
// Michael Cole (mcole042891.prof.dev@gmail.com)
// 
// User Model
// ---------------------------------------------

export default class User {
    constructor (props) {

        this.id = props.id
        this.username = props.username
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.phone = props.phone
        this.start_date = props.start_date
        this.end_date = props.end_date
    }
}
