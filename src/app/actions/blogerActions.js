import axios from 'axios';

// получить самого активного автора
export function fetchBloger() {
    return {
        type: 'FETCH_BLOGER',
        payload: axios.get('api/users/bloger/')
    }
}