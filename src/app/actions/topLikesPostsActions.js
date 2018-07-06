import axios from 'axios';

export function fetchTopLikesPosts() {
    return {
        type: 'FETCH_TOP_LIKES_POSTS',
        payload: axios.get('api/posts/top_likes/')
    }
}