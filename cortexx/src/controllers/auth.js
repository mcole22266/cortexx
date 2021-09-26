// auth.js
// 2021-09-26
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// Authentication Controllers
// ---------------------------------------------

import api from './api';

async function isLoggedIn() {
    const response = await api.get('/auth', {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })

    if (response.data.isLoggedIn===true) {
        return response.data.user
    } else {
        return false
    }
}

export default isLoggedIn
