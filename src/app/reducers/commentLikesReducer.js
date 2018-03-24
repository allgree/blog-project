import * as CommentLikes from '../constants/commentLikesConstants';

export function commentLikesReducer(state = {likes: [], is_fetching: false}, action) {
    switch (action.type) {
        case CommentLikes.FETCH_COMMENT_LIKES_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case CommentLikes.FETCH_COMMENT_LIKES_FULFILLED: {
            state = {...state, is_fetching: false, likes: action.payload.data};
            break;
        }
        case CommentLikes.FETCH_COMMENT_LIKES_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
        case CommentLikes.ADD_COMMENT_LIKE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case CommentLikes.ADD_COMMENT_LIKE_FULFILLED: {
            let likes = state.likes.concat(action.payload.data);
            state = {...state, is_fetching: false, likes: likes};
            break;
        }
        case CommentLikes.ADD_COMMENT_LIKE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
        case CommentLikes.DELETE_COMMENT_LIKE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case CommentLikes.DELETE_COMMENT_LIKE_FULFILLED: {
            let likes = [...state.likes];
            let deleted_like = JSON.parse(action.payload.config.data);
            if (action.payload.data === 1) {
                likes.find((like, index) => {
                    if (like.comment_id === deleted_like.comment_id && like.user_id === deleted_like.user_id) {
                        return likes.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, likes: likes};
            break;
        }
        case CommentLikes.DELETE_COMMENT_LIKE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}