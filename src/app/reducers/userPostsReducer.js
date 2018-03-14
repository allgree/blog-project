import * as UserPosts from '../constants/userPostsConstants';

export function userPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case UserPosts.FETCH_USER_POSTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.FETCH_USER_POSTS_FULFILLED: {
            state = {...state, is_fetching: false, posts: action.payload.data};
            break;
        }
        case UserPosts.FETCH_USER_POSTS_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }
    }
    return state;
}