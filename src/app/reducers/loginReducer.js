import * as Login from '../constants/loginConstants';

export function loginReducer(state = {login: {}, is_fetching: false}, action) {
    switch (action.type) {
        // получение логина
        case Login.FETCH_LOGIN_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.FETCH_LOGIN_FULFILLED: {
            state = {...state, is_fetching: false, login: action.payload.data};
            break;
        }
        case Login.FETCH_LOGIN_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload};
            break;
        }

        // проверка залогинен ли пользователь
        case Login.FETCH_LOGIN_DATA_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.FETCH_LOGIN_DATA_FULFILLED: {
            if (action.payload.data === 0) {
                state = {...state, is_fetching: false, login: {}};
            } else {
                state = {...state, is_fetching: false, login: action.payload.data};
            }
            break;
        }
        case Login.FETCH_LOGIN_DATA_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload};
            break;
        }


        // выход из логина
        case Login.UNLOGGED_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.UNLOGGED_FULFILLED: {
            state = {...state, is_fetching: false, login: {}};
            break;
        }
        case Login.UNLOGGED_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // редактирование логина
        case Login.EDIT_USER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.EDIT_USER_FULFILLED: {
            let login = {...state.login};
            if (action.payload.data[0] === 1) {
                let new_data = JSON.parse(action.payload.config.data);
                login.login = new_data.login;
                login.name = new_data.name;
                login.surname = new_data.surname;
                login.age = new_data.age;
                login.city = new_data.city;
                login.site = new_data.site;
                login.email = new_data.email;
            }
            state = {...state, is_fetching: false, login: login};
            break;
        }
        case Login.EDIT_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        //изменение аватара
        case Login.CHANGE_AVATAR_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.CHANGE_AVATAR_FULFILLED: {
            let login = {...state.login};
            if (action.payload.data.result === 1) {
                login.avatar_path = action.payload.data.avatar_path;
            }
            state = {...state, is_fetching: false, login: login};
            break;
        }
        case Login.CHANGE_AVATAR_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}