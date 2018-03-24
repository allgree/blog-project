import * as PostComments from '../constants/postCommentsConstants';

export function postCommentsReducer(state = {comments: [], is_fetching: false}, action) {
    switch (action.type) {

        case PostComments.FETCH_POST_COMMENTS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.FETCH_POST_COMMENTS_FULFILLED: {
            state = {...state, is_fetching: false, comments: action.payload.data};
            break;
        }
        case PostComments.FETCH_POST_COMMENTS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        case PostComments.ADD_POST_COMMENT_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.ADD_POST_COMMENT_FULFILLED: {
            let comments = state.comments.concat(action.payload.data);
            state = {...state, is_fetching: false, comments: comments};
            break;
        }
        case PostComments.ADD_POST_COMMENT_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }

        case PostComments.DELETE_POST_COMMENT_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case PostComments.DELETE_POST_COMMENT_FULFILLED: {
            let comments = [...state.comments];
            if (action.payload.data === 1) {
                let deleted_comment_id = JSON.parse(action.payload.config.data).comment_id;
                comments.find((comment, index) => {
                    if (comment.id === deleted_comment_id) {
                        return comments.splice(index, 1);
                    }
                })
            }
            state = {...state, is_fetching: false, comments: comments};
            break;
        }
        case PostComments.DELETE_POST_COMMENT_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}