import axios from 'axios';

export function fetchUsers() {
    return {
        type: 'FETCH_USERS',
        payload: axios.get('/api/users/')
    }
}

export function fetchUsersSample(offset) {
    return {
        type: 'FETCH_USERS_SAMPLE',
        payload: axios.get(`/api/users/sample/?offset=${offset}`)
    }
}

export function registerUser(user) {
    return {
        type: 'REGISTER_USER',
        payload: axios.post('api/login/register/', user)
    }
}