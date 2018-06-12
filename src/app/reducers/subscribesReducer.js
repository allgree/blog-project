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

        case Subscribes.ADD_USER_SUBSCRIBE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Subscribes.ADD_USER_SUBSCRIBE_FULFILLED: {
            if (action.payload.data === 0) {
                state = {...state, is_fetching: false};
            } else {
                let subscribes = state.subscribes.concat(action.payload.data);
                state = {...state, is_fetching: false, subscribes: subscribes};
            }
            break;
        }

        case Subscribes.ADD_USER_SUBSCRIBE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }


        case Subscribes.DELETE_USER_SUBSCRIBE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Subscribes.DELETE_USER_SUBSCRIBE_FULFILLED: {
            let subscribes = [...state.subscribes];
            if (action.payload.data === 1) {
                let deleted_sub = JSON.parse(action.payload.config.data);
                subscribes.find((sub, index) => {
                    if (sub.user_id === deleted_sub.user_id && sub.sub_user_id === deleted_sub.sub_user_id) {
                        return subscribes.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, subscribes: subscribes};
            break;
        }

        case Subscribes.DELETE_USER_SUBSCRIBE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}