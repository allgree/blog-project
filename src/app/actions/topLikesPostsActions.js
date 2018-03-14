import axios from 'axios';

export function fetchTopLikesPost() {
    return {
        type: 'FETCH_TOP_LIKES_POSTS',
        payload: axios.get('/api/posts/top-likes')
    }
}