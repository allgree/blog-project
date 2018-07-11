import * as UsersList from '../constants/usersListConstants';

import {autoloadContent} from "../reducersFunctions/autoloadContent";

export function usersListReducer(state = {users: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка пользователей для автоподгрузки
        case UsersList.FETCH_USERS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UsersList.FETCH_USERS_SAMPLE_FULFILLED: {
            let [users, empty] = autoloadContent([...state.users], state.empty, action.payload);
            state = {...state, is_fetching: false, users: users, empty: empty};
            break;
        }
        case UsersList.FETCH_USERS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // регистрация нового пользователя
        case UsersList.REGISTER_USER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UsersList.REGISTER_USER_FULFILLED: {
            let users = state.users.concat(action.payload.data);
            state = {...state, is_fetching: false, users: users};
            break;
        }
        case UsersList.REGISTER_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}