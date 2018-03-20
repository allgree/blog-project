import * as Posts from '../constants/postsListConstants';

export function postsListReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case Posts.FETCH_POSTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Posts.FETCH_POSTS_FULFILLED: {
            state = {...state, is_fetching: false, posts: action.payload.data};
            break;
        }
        case Posts.FETCH_POSTS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}