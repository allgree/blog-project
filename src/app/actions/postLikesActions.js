import axios from 'axios';
export function fetchPostLikes() {
    return {
        type: 'FETCH_POST_LIKES',
        payload: axios.get('/api/post-likes/')
    }
}