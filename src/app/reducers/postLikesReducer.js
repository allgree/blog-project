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
        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let likes = state.likes.concat(action.payload.data);
            state = {...state, is_fetching: false, likes: likes};
            break;
        }
        case PostLikes.ADD_POST_LIKE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_FULFILLED: {
            let likes = [...state.likes];
            if (action.payload.data === 1) {
                let deleted_like = JSON.parse(action.payload.config.data);
                likes.find((like, index) => {
                    if (like.post_id === deleted_like.post_id && like.user_id === deleted_like.user_id) {
                        return likes.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, likes: likes};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}