import * as UserPosts from '../constants/userPostsConstants';
import * as PostLikes from '../constants/postLikesConstants';

import {addLike} from '../reducersFunctions/addLike';
import {deleteLike} from "../reducersFunctions/deleteLike";
import {deletePostOrComment} from "../reducersFunctions/deletePostOrComment";

export function userPostsReducer(state = {posts: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка постов для автоподгрузки
        case UserPosts.FETCH_USER_POSTS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.FETCH_USER_POSTS_SAMPLE_FULFILLED: {
            let posts = [...state.posts];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[url_arr.length - 1];
            if (action.payload.data.length === 0 && offset === 0) {
                posts = [];
                empty = true;
            } else if (action.payload.data.length === 0) {
                empty = true;
            } else if(offset === 0) {         //
                posts = action.payload.data;  //
                empty = false;                //
            } else {
                posts = posts.concat(action.payload.data);
                empty = false;
            }
            state = {...state, is_fetching: false, posts: posts, empty: empty};
            break;
        }
        case UserPosts.FETCH_USER_POSTS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }

        // добавление лайка посту
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

        // добавление поста
        case UserPosts.ADD_USER_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.ADD_USER_POST_FULFILLED: {
            let posts = [...state.posts];
            posts.unshift(action.payload.data);
            state = {...state, is_fetching: false, posts: posts};
            break;
        }
        case UserPosts.ADD_USER_POST_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }

        // удаление поста
        case UserPosts.DELETE_USER_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.DELETE_USER_POST_FULFILLED: {
            let posts = deletePostOrComment(posts, action.payload);
            state = {...state, is_fetching: false, posts: posts};
            break;
        }
        case UserPosts.DELETE_USER_POST_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }
    }
    return state;
}