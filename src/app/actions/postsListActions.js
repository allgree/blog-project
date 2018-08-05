import axios from 'axios';

// получить выборку постов для автопогрузки ан странице Записи
export function fetchPostsSample(offset) {
    return {
        type: 'FETCH_POSTS_SAMPLE',
        payload: axios.get(`/api/posts/sample/?offset=${offset}`)
    }
}

// удалить пост
export function deletePost(post_id) {
    return {
        type: 'DELETE_POST',
        payload: axios.post('/api/posts/delete/', {post_id: post_id})
    }
}