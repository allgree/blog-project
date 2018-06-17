import axios from 'axios';

export function fetchUserSubsSample(offset, user_id) {
    return {
        type: 'FETCH_USER_SUBS_SAMPLE',
        payload: axios.get(`/api/subs/sample/subs/?user_id=${user_id}&offset=${offset}`)
    }
}

export function deleteSub(user_id, sub_user_id) {
    return {
        type: 'DELETE_USER_SUB',
        payload: axios.post('/api/subs/delete',
            {
                user_id: user_id,
                sub_user_id: sub_user_id
            })
    }
}