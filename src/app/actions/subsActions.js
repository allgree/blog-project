import axios from 'axios';

export function fetchUserSubsSample(offset, user_id) {
    return {
        type: 'FETCH_USER_SUBS_SAMPLE',
        payload: axios.get(`/api/subs/sample/subs/?user_id=${user_id}&offset=${offset}`)
    }
}