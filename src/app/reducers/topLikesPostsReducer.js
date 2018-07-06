import * as TopLikesPosts from '../constants/topLikesPostsConstants';
import * as PostLikes from '../constants/postLikesConstants';

export function topLikesPostsReducer(state = {posts: [], is_fetching: false}, action) {
    switch (action.type) {
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_PENDING: {
            state = {
                ...state,
                is_fetching: true
            };
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_FULFILLED: {
            state = {
                ...state,
                is_fetching: false,
                posts: action.payload.data
            };
            break;
        }
        case TopLikesPosts.FETCH_TOP_LIKES_POSTS_REJECTED: {
            state = {
                ...state,
                is_fetching: false,
                error_message: action.payload.message
            };
            break;
        }

        case PostLikes.ADD_POST_LIKE_PENDING: {
            state = {...state,
                is_fetching: true};
            break;
        }
        case PostLikes.ADD_POST_LIKE_FULFILLED: {
            let posts = [...state.posts];
            let like = action.payload.data;
            posts.find((post) => {
                if (post.id === like.post_id) {
                    return post.likes.push({id: like.id, user: like.user});
                }
            });
            state = {...state, posts: posts, is_fetching: false};
            break;
        }
        case PostLikes.ADD_POST_LIKE_REJECTED: {
            state = {...state,
                is_fetching: false,
                error_message: action.payload.message};
            break;
        }

        case PostLikes.DELETE_POST_LIKE_PENDING: {
            state = {...state,
                is_fetching: true};
            break;
        }
        case PostLikes.DELETE_POST_LIKE_FULFILLED: {
            let like = action.payload.data;
            let posts = [...state.posts];
            if (like.result === 1) {
                posts.find((post) => {
                    if (post.id === like.post_id) {
                        return post.likes.find((find_like, index) => {
                            if (find_like.user.id === like.user_id) {
                                return post.likes.splice(index, 1);
                            }
                        })
                    }
                })
            }
            state = {...state, posts: posts, is_fetching: false};
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