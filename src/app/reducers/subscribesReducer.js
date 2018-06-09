import * as Subscribes from '../constants/subscribesConstants';

export function subscribesReducer(state = {subscribes: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        case Subscribes.FETCH_USER_SUBSCRIBES_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Subscribes.FETCH_USER_SUBSCRIBES_SAMPLE_FULFILLED: {
            let subscribes = [...state.subscribes];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[url_arr.length - 1];
            if (action.payload.data.length === 0 && offset === 0) {
                subscribes = [];
                empty = true;
            } else if (action.payload.data.length === 0) {
                empty = true;
            } else if (offset === 0) {
                subscribes = action.payload.data;
                empty = false;
            } else {
                subscribes = subscribes.concat(action.payload.data);
                empty = false;
            }
            state = {...state, is_fetching: false, subscribes: subscribes, empty: empty};
            break;
        }
        case Subscribes.FETCH_USER_SUBSCRIBES_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}