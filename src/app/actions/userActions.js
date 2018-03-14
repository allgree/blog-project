import axios from 'axios';

export function fetchUser(user_id) {
    return {
        type: 'FETCH_USER',
        payload: axios.get(`/api/users/${user_id}`)
    }
}