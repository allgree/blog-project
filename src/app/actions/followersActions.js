import axios from 'axios';

export function fetchUserFollowersSample(offset, sub_user_id) {
    return {
        type: 'FETCH_USER_FOLLOWERS_SAMPLE',
        payload: axios.get(`/api/subs/sample/followers/?sub_user_id=${sub_user_id}&offset=${offset}`)
    }
}

export function addFollower(user_id, sub_user_id) {
    return {
        type: 'ADD_USER_FOLLOWER',
        payload: axios.post('/api/subs/add/',
            {
                user_id: user_id,
                sub_user_id: sub_user_id
            })
    }
}

export function deleteFollower(user_id, sub_user_id) {
    return {
        type: 'DELETE_USER_FOLLOWER',
        payload: axios.post('/api/subs/delete/' ,
            {
                user_id: user_id,
                sub_user_id: sub_user_id
            })
    }
}