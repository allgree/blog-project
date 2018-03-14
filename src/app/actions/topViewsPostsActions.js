import axios from 'axios';

export function fetchTopViewsPost() {
    return {
        type: 'FETCH_TOP_VIEWS_POSTS',
        payload: axios.get('/api/posts/top-views')
    }
}