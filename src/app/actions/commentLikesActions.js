import axios from 'axios';
export function fetchCommentLikes() {
    return {
        type: 'FETCH_COMMENT_LIKES',
        payload: axios.get('/api/comment-likes/')
    }
}