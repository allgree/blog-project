import * as Opinions from '../constants/opinionsConstants';

import {autoloadContent} from "../reducersFunctions/autoloadContent";

export function opinionsReducer(state = {opinions: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // получение отзывов
        case Opinions.FETCH_OPINIONS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Opinions.FETCH_OPINIONS_SAMPLE_FULFILLED: {
            let [opinions, empty] = autoloadContent([...state.opinions], state.empty, action.payload);
            state = {...state, is_fetching: false, opinions: opinions, empty: empty};
            break;
        }
        case Opinions.FETCH_OPINIONS_SAMPLE_REJECTED: {
            state = {...state,
                    is_fetching: false,
                    error_message: action.payload.message};
            break;
        }

        // добавление отзыва
        case Opinions.ADD_OPINION_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Opinions.ADD_OPINION_FULFILLED: {
            let opinions = [...state.opinions];
            opinions.unshift(action.payload.data);
            state = {...state, opinions: opinions, is_fetching: false};
            break;
        }
        case Opinions.ADD_OPINION_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}