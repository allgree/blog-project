import axios from 'axios';

export function fetchUsers() {
    return {
        type: 'FETCH_USERS',
        payload: axios.get('/api/users/')
    }
}

export function registerUser(user) {
    return {
        type: 'REGISTER_USER',
        payload: axios.post('api/login/register', user)
    }
}