import * as Subs from '../constants/subsConstants';

export function subsReducer(state = {subs: [], is_fetching: false, empty_subs: false}, action) {
    switch (action.type) {
        case Subs.FETCH_USER_SUBS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Subs.FETCH_USER_SUBS_SAMPLE_FULFILLED: {
            let subs = [...state.subs];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[url_arr.length - 1];
            if (action.payload.data.length === 0 && offset === 0) {
                subs = [];
                empty = true;
            } else if (action.payload.data.length === 0) {
                empty = true;
            } else if (offset === 0) {
                subs = action.payload.data;
                empty = false;
            } else {
                subs = subs.concat(action.payload.data);
                empty = false;
            }
            state = {...state, is_fetching: false, subs: subs, empty: empty};
            break;
        }
        case Subs.FETCH_USER_SUBS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }


    }
    return state;
}