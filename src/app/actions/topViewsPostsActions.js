import axios from 'axios';

export function fetchTopViewsPosts() {
    return {
        type: 'FETCH_TOP_VIEWS_POSTS',
        payload: axios.get('api/posts/top_views/')
    }
}


export function deleteTopViewsPost(post_id) {
    return {
        type: 'DELETE_TOP_VIEWS_POST',
        payload: axios.post('/api/posts/delete', {post_id: post_id})
    }
}