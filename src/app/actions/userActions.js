import axios from 'axios';

// получить пользователя для страницы Автор
export function fetchUser(user_id) {
    return {
        type: 'FETCH_USER',
        payload: axios.get(`/api/users/${user_id}`)
    }
}