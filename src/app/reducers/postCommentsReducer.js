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
    }
    return state;
}