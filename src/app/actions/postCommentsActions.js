import axios from 'axios';

export function fetchPostComments(post_id) {
    return {
        type: 'FETCH_POST_COMMENTS',
        payload: axios.get(`/api/comments/post/${post_id}`)
    }
}

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

export function deletePostComment(comment_id) {
    return {
        type: 'DELETE_POST_COMMENT',
        payload: axios.post('/api/comments/delete',
            {
                comment_id: comment_id
            })
    }
}