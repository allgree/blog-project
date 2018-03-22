import axios from 'axios';

export function fetchLogin(login) {
    return {
        type: 'FETCH_LOGIN',
        payload: axios.post('/api/users/login', login)
    }
}

export function unlogged(login) {
    return {
        type: 'UNLOGGED',
        payload: axios.post('api/users/unlogged', {user_id: login.id})
    }
}