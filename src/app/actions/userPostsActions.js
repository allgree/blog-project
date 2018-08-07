import axios from 'axios';

// получить выборку постов пользователя для автоподгрузки
export function fetchUserPostsSample(offset, user_id) {
    return {
        type: 'FETCH_USER_POSTS_SAMPLE',
        payload: axios.get(`/api/posts/user-posts-sample/?user_id=${user_id}&offset=${offset}`)
    }
}

// добавить пост
export function addUserPost(user_id, title, body) {
    return {
        type: 'ADD_USER_POST',
        payload: axios.post('/api/posts/add/',
            {
                user_id: user_id,
                title: title,
                body: body
            })
    }
}
