import * as Followers from '../constants/followersConstants';

import {autoloadContent} from "../reducersFunctions/autoloadContent";

export function followersReducer(state = {followers: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка подписчиков для автоподгрузки
        case Followers.FETCH_USER_FOLLOWERS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Followers.FETCH_USER_FOLLOWERS_SAMPLE_FULFILLED: {
            let [followers, empty] = autoloadContent([...state.followers], state.empty, action.payload);
            state = {...state, is_fetching: false, followers: followers, empty: empty};
            break;
        }
        case Followers.FETCH_USER_FOLLOWERS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // добавить подписчика
        case Followers.ADD_USER_FOLLOWER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Followers.ADD_USER_FOLLOWER_FULFILLED: {
            if (action.payload.data === 0) {
                state = {...state, is_fetching: false};
            } else {
                let followers = state.subscribes.concat(action.payload.data);
                state = {...state, is_fetching: false, followers: followers};
            }
            break;
        }

        case Followers.ADD_USER_FOLLOWER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }


        // удалить подписчика
        case Followers.DELETE_USER_FOLLOWER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case Followers.DELETE_USER_FOLLOWER_FULFILLED: {
            let followers = [...state.followers];
            if (action.payload.data === 1) {
                let deleted_follow = JSON.parse(action.payload.config.data);
                followers.find((sub, index) => {
                    if (sub.user_id === deleted_follow.user_id && sub.sub_user_id === deleted_follow.sub_user_id) {
                        return followers.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, followers: followers};
            break;
        }

        case Followers.DELETE_USER_FOLLOWER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}