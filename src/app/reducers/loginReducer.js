import * as Login from '../constants/loginConstants';

export function loginReducer(state = {login: {}, is_fetching: false}, action) {
    switch (action.type) {
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
        case Login.UNLOGGED_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Login.UNLOGGED_FULFILLED: {
            state = {...state, is_fetching: false, login: {}};
            break;
        }
        case Login.UNLOGGED_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload};
            break;
        }
    }
    return state;
}