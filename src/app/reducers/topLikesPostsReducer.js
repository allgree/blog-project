import * as TopLikesPosts from '../constants/topLikesPostsConstants';

export function topLikesPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_FULFILLED: {
            state = {...state, is_fetching: false, posts: action.payload.data};
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}