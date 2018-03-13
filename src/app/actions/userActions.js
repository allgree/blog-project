import axios from 'axios';

export function fetchUser(id) {
    return {
        type: 'FETCH_USER',
        payload: axios.get(`api/users/${id}`)
    }
}