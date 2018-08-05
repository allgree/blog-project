import axios from 'axios';

// получить один пост для отображения на странице Запись
export function fetchPost(post_id) {
    return {
        type: 'FETCH_POST',
        payload: axios.get(`/api/posts/${post_id}`)
    }
}
