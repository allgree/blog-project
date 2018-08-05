import axios from 'axios';

// получить выборку комментариев для автоподгрузки
export function fetchPostCommentsSample(offset, post_id) {
    return {
        type: 'FETCH_POST_COMMENTS_SAMPLE',
        payload: axios.get(`/api/comments/sample/post/?post_id=${post_id}&offset=${offset}`)
    }
}

// добавить комментарий
export function addPostComment(post_id, user_id, body) {
    return {
        type: 'ADD_POST_COMMENT',
        payload: axios.post('/api/comments/add/',
            {
                post_id: post_id,
                user_id: user_id,
                body: body
            })
    }
}

// удалить комментарий
export function deletePostComment(comment_id) {
    return {
        type: 'DELETE_POST_COMMENT',
        payload: axios.post('/api/comments/delete',
            {
                comment_id: comment_id
            })
    }
}