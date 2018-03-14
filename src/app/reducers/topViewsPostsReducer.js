import * as TopViewsPosts from '../constants/topViewsPostsConstants';

export function topViewsPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case TopViewsPosts.FETCH_TOP_VIEWS_POSTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case TopViewsPosts.FETCH_TOP_VIEWS_POSTS_FULFILLED: {
            state = {...state, is_fetching: false, posts: action.payload.data};
            break;
        }
        case TopViewsPosts.FETCH_TOP_VIEWS_POSTS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}