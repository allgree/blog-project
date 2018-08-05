import * as Bloger from '../constants/blogerConstants';

export function blogerReducer(state = {user: {}, is_fetching: false}, action) {
    switch (action.type) {
        // получение самого активного блогера
        case Bloger.FETCH_BLOGER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Bloger.FETCH_BLOGER_FULFILLED: {
            state = {...state, user: action.payload.data, is_fetching: false};
            break;
        }
        case Bloger.FETCH_BLOGER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}