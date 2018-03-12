import * as TopPosts from '../constants/postsTopConstants';

export function topPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case TopPosts.FETCH_TOP_POSTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case TopPosts.FETCH_TOP_POSTS_FULFILLED: {
            state = {...state, is_fetching: false, posts: action.payload.data};
            break;
        }
        case TopPosts.FETCH_TOP_POSTS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}