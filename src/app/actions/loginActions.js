import axios from 'axios';

export function fetchLogin(login) {
    return {
        type: 'FETCH_LOGIN',
        payload: axios.post('/api/users/login', login)
    }
}

export function unlogged(login) {
    return {
        type: 'UNLOGGED',
        payload: axios.post('api/users/unlogged', {user_id: login.id})
    }
}

export function editUser(login) {
    return {
        type: 'EDIT_USER',
        payload: axios.post('api/users/edit', login)
    }
}

export function changeAvatar(login_id, data) {
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return {
        type: 'CHANGE_AVATAR',
        payload: axios.post('api/users/avatar', data, config)
    }
}