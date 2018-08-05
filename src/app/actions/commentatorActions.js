import axios from 'axios';

// получить самого активного комментатора
export function fetchCommentator() {
    return {
        type: 'FETCH_COMMENTATOR',
        payload: axios.get('api/users/commentator/')
    }
}