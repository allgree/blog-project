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
    }
    return state;
}