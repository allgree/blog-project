import * as PostComments from '../constants/postCommentsConstants';
import * as CommentLikes from '../constants/commentLikesConstants';

import {addLike} from '../reducersFunctions/addLike';
import {deleteLike} from "../reducersFunctions/deleteLike";
import {deletePostOrComment} from "../reducersFunctions/deletePostOrComment";

export function postCommentsReducer(state = {comments: [], is_fetching: false, empty: false}, action) {
    switch (action.type) {
        // выборка комментариев для автоподгрузки
        case PostComments.FETCH_POST_COMMENTS_SAMPLE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.FETCH_POST_COMMENTS_SAMPLE_FULFILLED: {
            let comments = [...state.comments];
            let empty = state.empty;
            let url_arr = action.payload.config.url.split('=');
            let offset = +url_arr[url_arr.length - 1];

            if (action.payload.data.length === 0 && offset === 0) {
                comments = [];
                empty = true;
            } else if (action.payload.data.length === 0) {
                empty = true;
            } else if (offset === 0) {
                comments = action.payload.data;
                empty = false;
            } else {
                comments = comments.concat(action.payload.data);
                empty = false;
            }

            state = {...state, is_fetching: false, comments: comments, empty: empty};
            break;
        }
        case PostComments.FETCH_POST_COMMENTS_SAMPLE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // добавление лайка комментарию
        case CommentLikes.ADD_COMMENT_LIKE_PENDING: {
            state = {...state,
                    is_fetching: false};
            break;
        }
        case CommentLikes.ADD_COMMENT_LIKE_FULFILLED: {
            let comments = addLike([...state.comments], action.payload.data);
            state = {...state, comments: comments, is_fetching: false};
            break;
        }
        case CommentLikes.ADD_COMMENT_LIKE_REJECTED: {
            state = {...state,
                    is_fetching: false,
                    error_message: action.payload.message};
            break;
        }

        // удаление лайка с комментария
        case CommentLikes.DELETE_COMMENT_LIKE_PENDING: {
            state = {...state,
                   is_fetching: false};
            break;
        }
        case CommentLikes.DELETE_COMMENT_LIKE_FULFILLED: {
            let comments = deleteLike([...state.comments], action.payload.data);
            state = {...state, comments: comments, is_fetching: false};
            break;
        }
        case CommentLikes.DELETE_COMMENT_LIKE_REJECTED: {
            state = {...state, is_fetching: false,
                    error_message: action.payload.message};
            break;
        }

        // добавление комментария
        case PostComments.ADD_POST_COMMENT_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.ADD_POST_COMMENT_FULFILLED: {
            let comments = [...state.comments];
            comments.unshift(action.payload.data);
            //let comments = state.comments.concat(action.payload.data);
            state = {...state, is_fetching: false, comments: comments};
            break;
        }
        case PostComments.ADD_POST_COMMENT_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // удаление комментария
        case PostComments.DELETE_POST_COMMENT_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.DELETE_POST_COMMENT_FULFILLED: {
            let comments = deletePostOrComment([...state.comments], action.payload);
            //let comments = [...state.comments];
            //if (action.payload.data === 1) {
            //    let deleted_comment_id = JSON.parse(action.payload.config.data).comment_id;
            //    comments.find((comment, index) => {
            //        if (comment.id === deleted_comment_id) {
            //            return comments.splice(index, 1);
            //        }
            //    })
            //}
            state = {...state, is_fetching: false, comments: comments};
            break;
        }
        case PostComments.DELETE_POST_COMMENT_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}