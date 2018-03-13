import axios from 'axios';

export function fetchUsers() {
    return {
        type: 'FETCH_USERS',
        payload: axios.get('/api/users/')
    }
}