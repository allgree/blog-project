import axios from 'axios';



// получить выборку пользователей для автоподгрузки
export function fetchUsersSample(offset) {
    return {
        type: 'FETCH_USERS_SAMPLE',
        payload: axios.get(`/api/users/sample/?offset=${offset}`)
    }
}

// зарегистрировать пользователя
export function registerUser(user) {
    return {
        type: 'REGISTER_USER',
        payload: axios.post('api/login/register/', user)
    }
}