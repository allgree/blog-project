import axios from 'axios';

export function fetchUserPosts(user_id) {
    return {
        type: 'FETCH_USER_POSTS',
        payload: axios.get(`/api/posts/user/${user_id}`)
    }
}