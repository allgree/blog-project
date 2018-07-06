import axios from 'axios';

export function fetchBloger() {
    return {
        type: 'FETCH_BLOGER',
        payload: axios.get('api/users/bloger/')
    }
}