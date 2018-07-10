import * as Posts from '../constants/postsListConstants';
import * as PostLikes from '../constants/postLikesConstants';

import {addLike} from '../reducersFunctions/addLike';
import {deleteLike} from "../reducersFunctions/deleteLike";
import {deletePostOrComment} from "../reducersFunctions/deletePostOrComment";

export function postsListReducer(state = {posts: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        //case Posts.FETCH_POSTS_PENDING: {
        //    state = {...state, is_fetching: true};
        //    break;
        //}
        //case Posts.FETCH_POSTS_FULFILLED: {
        //    state = {...state, is_fetching: false, posts: action.payload.data};
        //    break;
        //}
        //case Posts.FETCH_POSTS_REJECTED: {
        //    state = {...state, is_fetching: false, error_message: action.payload.message};
        //    break;
        //}


        // выборка постов для автоподгрузки
        case Posts.FETCH_POSTS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Posts.FETCH_POSTS_SAMPLE_FULFILLED: {
            let posts = [...state.posts];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[1];
            if (action.payload.data.length === 0) {
                empty = true;
            } else if (offset === 0) {
                posts = action.payload.data;
            } else {
                posts = posts.concat(action.payload.data);
            }
            state = {...state, is_fetching: false, posts: posts, empty: empty};
            break;
        }
        case Posts.FETCH_POSTS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // Добавление лайка посту
        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state,
                is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let posts = addLike([...state.posts], action.payload.data);
            state = {...state, posts: posts, is_fetching: false};
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
            state = {...state,
                is_fetching: false};
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

        // удаление поста
        case Posts.DELETE_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Posts.DELETE_POST_FULFILLED: {
            let posts = deletePostOrComment([...state.posts], action.payload);
            state = {...state, is_fetching: false, posts: posts};
            break;
        }
        case Posts.DELETE_POST_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}