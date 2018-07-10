import axios from 'axios';

export function fetchTopLikesPosts() {
    return {
        type: 'FETCH_TOP_LIKES_POSTS',
        payload: axios.get('/api/posts/top_likes/')
    }
}

export function deleteTopLikesPost(post_id) {
    return {
        type: 'DELETE_TOP_LIKES_POST',
        payload: axios.post('/api/posts/delete', {post_id: post_id})
    }
}