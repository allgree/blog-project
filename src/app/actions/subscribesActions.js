import axios from 'axios';

export function fetchUserSubscribesSample(offset, sub_user_id) {
    return {
        type: 'FETCH_USER_SUBSCRIBES_SAMPLE',
        payload: axios.get(`/api/subs/sample/subscribes/?sub_user_id=${sub_user_id}&offset=${offset}`)
    }
}