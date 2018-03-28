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
    }
    return state;
}