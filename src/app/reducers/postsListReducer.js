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
        case Posts.DELETE_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Posts.DELETE_POST_FULFILLED: {

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
        case Posts.DELETE_POST_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

    }
    return state;
}