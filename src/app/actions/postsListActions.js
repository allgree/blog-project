import axios from 'axios';

export function fetchPostsList() {
    return {
        type: 'FETCH_POSTS',
        payload: axios.get('/api/posts/')
    }
}

export function fetchPostsSample(offset) {
    return {
        type: 'FETCH_POSTS_SAMPLE',
        payload: axios.get(`/api/posts/sample/?offset=${offset}`)
    }
}

export function deletePost(post_id) {
    return {
        type: 'DELETE_POST',
        payload: axios.post('/api/posts/delete/', {post_id: post_id})
    }
}