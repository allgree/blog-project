import * as Commentator from '../constants/commentatorConstants';

export function commentatorReducer(state = {user: {}, is_fetching: false}, action) {
    switch (action.type) {
        // получение самого активного комментатора
        case Commentator.FETCH_COMMENTATOR_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Commentator.FETCH_COMMENTATOR_FULFILLED: {
            state = {...state, user: action.payload.data, is_fetching: false};
            break;
        }
        case Commentator.FETCH_COMMENTATOR_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}