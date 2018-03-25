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
        case UserPosts.ADD_USER_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.ADD_USER_POST_FULFILLED: {
            let posts = state.posts.concat(action.payload.data);
            state = {...state, is_fetching: false, posts: posts};
            break;
        }
        case UserPosts.ADD_USER_POST_REJECTED: {
            state = {...state, is_fetching: false};
            break;
        }
        case UserPosts.DELETE_USER_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserPosts.DELETE_USER_POST_FULFILLED: {
            let posts = [...state.posts];
            if (action.payload.data === 1) {
                let deleted_post_id = JSON.parse(action.payload.config.data).post_id;
                posts.find((post, index) => {
                    if (post.id === deleted_post_id) {
                        return posts.splice(index, 1);
                    }
                })
            }
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