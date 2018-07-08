import axios from 'axios';
//export function fetchCommentLikes() {
//    return {
//        type: 'FETCH_COMMENT_LIKES',
//        payload: axios.get('/api/comment-likes/')
            //    }
//}
//
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

export function deleteCommentLike(comment_id, user_id) {
    return {
        type: 'DELETE_COMMENT_LIKE',
        payload: axios.post('/api/comment-likes/delete/', {comment_id: comment_id, user_id: user_id})
    }
}