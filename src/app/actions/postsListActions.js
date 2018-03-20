import axios from 'axios';

export function fetchPostsList() {
    return {
        type: 'FETCH_POSTS',
        payload: axios.get('/api/posts/')
    }
}