import axios from 'axios';

// получить выборку пользователей для автоподгрузки
export function fetchUsersSample(offset, val1, val2) {
    return {
        type: 'FETCH_USERS_SAMPLE',
        payload: axios.get(`/api/users/sample/?val_1=${val1}&val_2=${val2}&offset=${offset}`)
    }
}

// зарегистрировать пользователя
export function registerUser(user) {
    return {
        type: 'REGISTER_USER',
        payload: axios.post('api/login/register/', user)
    }
}