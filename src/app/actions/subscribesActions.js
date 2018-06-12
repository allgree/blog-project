import axios from 'axios';

export function fetchUserSubscribesSample(offset, sub_user_id) {
    return {
        type: 'FETCH_USER_SUBSCRIBES_SAMPLE',
        payload: axios.get(`/api/subs/sample/subscribes/?sub_user_id=${sub_user_id}&offset=${offset}`)
    }
}

export function addSubcribe(user_id, sub_user_id) {
    return {
        type: 'ADD_USER_SUBSCRIBE',
        payload: axios.post('/api/subs/add/',
            {
                user_id: user_id,
                sub_user_id: sub_user_id
            })
    }
}

export function deleteSubscribe(user_id, sub_user_id) {
    return {
        type: 'DELETE_USER_SUBSCRIBE',
        payload: axios.post('/api/subs/delete/' ,
            {
                user_id: user_id,
                sub_user_id: sub_user_id
            })
    }
}