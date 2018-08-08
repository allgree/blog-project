import axios from 'axios';

// получить выборку подписчиков пользователя для автоподгрузки
export function fetchUserFollowersSample(offset, val1, val2, sub_user_id) {
    return {
        type: 'FETCH_USER_FOLLOWERS_SAMPLE',
        payload: axios.get(`/api/subs/sample/followers/?sub_user_id=${sub_user_id}&val_1=${val1}&val_2=${val2}&offset=${offset}`)
    }
}

// добавить подписчика
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

// удалить подписчика
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