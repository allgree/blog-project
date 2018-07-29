import * as Feed from '../constants/feedConstants';
import * as PostLikes from '../constants/postLikesConstants';

import {addLike} from '../reducersFunctions/addLike';
import {deleteLike} from "../reducersFunctions/deleteLike";
import {autoloadContent} from "../reducersFunctions/autoloadContent";

export function feedReducer(state = {posts: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка постов в ленте для автоподгрузки
        case Feed.FETCH_FEED_POSTS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Feed.FETCH_FEED_POSTS_SAMPLE_FULFILLED: {
            let [posts, empty] = autoloadContent([...state.posts], state.empty, action.payload);
            state = {...state, is_fetching: false, posts: posts, empty: empty};
            break;
        }
        case Feed.FETCH_FEED_POSTS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }

        // добавление лайка посту
        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let posts = addLike([...state.posts], action.payload.data);
            state = {...state, posts, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_REJECTED: {
            state = {...state,
                     is_fetching: false,
                     error_message: action.payload.message};
            break;
        }

        // удаление лайка с поста
        case PostLikes.DELETE_POST_LIKE_PENDING: {
            state = {...state, is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_FULFILLED: {
            let posts = deleteLike([...state.posts], action.payload.data);
            state = {...state, posts: posts, is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_REJECTED: {
            state = {...state,
                    is_fetching: false,
                    error_message: action.payload.message};
            break;
        }
    }
    return state;
}