import axios from 'axios';

// удалить пост
export function deletePost(post_id) {
    return {
        type: 'DELETE_POST',
        payload: axios.post('/api/posts/delete/', {post_id: post_id})
    }
}
