import axios from 'axios';

export function fetchTopPost() {
    return {
        type: 'FETCH_TOP_POSTS',
        payload: axios.get('/api/posts/top')
    }
}