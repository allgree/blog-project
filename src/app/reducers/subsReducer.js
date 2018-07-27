import * as Subs from '../constants/subsConstants';

import {autoloadContent} from "../reducersFunctions/autoloadContent";

export function subsReducer(state = {subs: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка подписок для автоподгрузки
        case Subs.FETCH_USER_SUBS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Subs.FETCH_USER_SUBS_SAMPLE_FULFILLED: {
            let [subs, empty] = autoloadContent([...state.subs], state.empty, action.payload);
            state = {...state, is_fetching: false, subs: subs, empty: empty};
            break;
        }
        case Subs.FETCH_USER_SUBS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // удалить подписку
        case Subs.DELETE_USER_SUB_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Subs.DELETE_USER_SUB_FULFILLED: {
            let subs = [...state.subs];
            if (action.payload.data === 1) {
                let deleted_sub = JSON.parse(action.payload.config.data);
                subs.find((sub, index) => {
                    if(sub.user.id === deleted_sub.user_id && sub.sub_user.id === deleted_sub.sub_user_id) {
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