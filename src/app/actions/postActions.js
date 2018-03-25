import axios from 'axios';

export function fetchPost(post_id) {
    return {
        type: 'FETCH_POST',
        payload: axios.get(`/api/posts/${post_id}`)
    }
}
