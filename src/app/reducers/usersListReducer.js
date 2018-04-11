import * as UsersList from '../constants/usersListConstants';

export function usersListReducer(state = {users: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        case UsersList.FETCH_USERS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UsersList.FETCH_USERS_FULFILLED: {
            state = {...state, is_fetching: false, users: action.payload.data};
            break;
        }
        case UsersList.FETCH_USERS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        case UsersList.FETCH_USERS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UsersList.FETCH_USERS_SAMPLE_FULFILLED: {

            let users = [...state.users];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[1];
            if (action.payload.data.length === 0) {
                empty = true;
            } else if (offset === 0){
                users = action.payload.data;
            } else {
                users = users.concat(action.payload.data);
            }
            state = {...state, is_fetching: false, users: users, empty: empty};
            break;
        }
        case UsersList.FETCH_USERS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

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