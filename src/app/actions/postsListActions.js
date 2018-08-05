import axios from 'axios';

// получить выборку постов для автопогрузки ан странице Записи
export function fetchPostsSample(offset, value) {
    return {
        type: 'FETCH_POSTS_SAMPLE',
        payload: axios.get(`/api/posts/sample/?value=${value}&offset=${offset}`)
    }
}