import axios from 'axios';

export function fetchPostComments(post_id) {
    return {
        type: 'FETCH_POST_COMMENTS',
        payload: axios.get(`/api/comments/post/${post_id}`)
    }
}