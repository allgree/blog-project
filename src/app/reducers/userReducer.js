import * as User from '../constants/userConstants';

export function userReducer(state = {user: {}, is_fetching: false}, action) {
    switch (action.type) {
        // получить пользователя
        case User.FETCH_USER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case User.FETCH_USER_FULFILLED: {
            state = {...state, user: action.payload.data, is_fetching: false};
            break;
        }
        case User.FETCH_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}