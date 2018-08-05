import axios from 'axios';

// добавить лайк к комментарию
export function addCommentLike(comment_id, user_id) {
    return {
        type: 'ADD_COMMENT_LIKE',
        payload: axios.post('/api/comment-likes/add/',
            {
                comment_id: comment_id,
                user_id: user_id
            })
    }
}

// удалить лайк с комментария
export function deleteCommentLike(comment_id, user_id) {
    return {
        type: 'DELETE_COMMENT_LIKE',
        payload: axios.post('/api/comment-likes/delete/', {comment_id: comment_id, user_id: user_id})
    }
}