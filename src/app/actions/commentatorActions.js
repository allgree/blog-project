import axios from 'axios';

export function fetchCommentator() {
    return {
        type: 'FETCH_COMMENTATOR',
        payload: axios.get('api/users/commentator/')
    }
}