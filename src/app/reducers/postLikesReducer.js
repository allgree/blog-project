import * as PostLikes from '../constants/postLikesConstants';

export function postLikesReducer(state = {likes: [], is_fetching: false}, action) {
    switch (action.type) {
        case PostLikes.FETCH_POST_LIKES_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostLikes.FETCH_POST_LIKES_FULFILLED: {
            state = {...state, is_fetching: false, likes: action.payload.data};
            break;
        }
        case PostLikes.FETCH_POST_LIKES_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}