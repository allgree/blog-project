import axios from 'axios';

// получить выборку подписок пользователя для автоподгрузки
export function fetchUserSubsSample(offset, val1, val2, user_id) {
    return {
        type: 'FETCH_USER_SUBS_SAMPLE',
        payload: axios.get(`/api/subs/sample/subs/?user_id=${user_id}&val_1=${val1}&val_2=${val2}&offset=${offset}`)
    }
}

// удалить подписку
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