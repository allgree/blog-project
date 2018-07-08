import * as Post from '../constants/postConstants';
import * as PostLikes from '../constants/postLikesConstants';

export function postReducer(state = {post: {}, is_fetching: false}, action) {
    switch (action.type) {
        // получение одного поста
        case Post.FETCH_POST_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case Post.FETCH_POST_FULFILLED: {
            state = {...state, post: action.payload.data, is_fetching: false};
            break;
        }
        case Post.FETCH_POST_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        // добавление лайка посту
        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let post = {...state.post};
            let like = action.payload.data;
            if (post.id === like.post_id) {
                post.likes.push({id: like.id, user: like.user});
            }
            state = {...state, post: post, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_REJECTED: {
            state = {...state,
                    is_fetching: false,
                    error_message: action.payload.message};
            break;
        }

        // удаление лайка с поста
        case PostLikes.DELETE_POST_LIKE_PENDING: {
            state = {...state, is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_FULFILLED: {
            let post = {...state.post};
            let like = action.payload.data;
            if (like.result === 1 && post.id === like.post_id) {
                post.likes.find((find_like, index) => {
                    if (find_like.user.id === like.user_id) {
                        post.likes.splice(index, 1);
                    }
                })
            }
            state = {...state, post: post, is_fetching: false};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_REJECTED: {
            state = {...state,
                    is_fetching: false,
                    error_message: action.payload.message};
            break;
        }
    }
    return state;
}