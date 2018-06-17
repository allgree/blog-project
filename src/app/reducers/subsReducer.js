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


        case Subs.DELETE_USER_SUB_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Subs.DELETE_USER_SUB_FULFILLED: {
            let subs = [...state.subs];
            if (action.payload.data === 1) {
                let deleted_sub = JSON.parse(action.payload.config.data);
                subs.find((sub, index) => {
                    if(sub.user_id === deleted_sub.user_id && sub.sub_user_id === deleted_sub.sub_user_id) {
                        return subs.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, subs: subs};
            break;
        }

        case Subs.DELETE_USER_SUB_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}