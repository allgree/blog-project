import axios from 'axios';

export function addPostLike(post_id, user_id) {
    return {
        type: 'ADD_POST_LIKE',
        payload: axios.post('/api/post-likes/add/',
            {
                post_id: post_id,
                user_id: user_id
            })
    }
}

export function deletePostLike(post_id, user_id) {
    return {
        type: 'DELETE_POST_LIKE',
        payload: axios.post('/api/post-likes/delete/',
            {
                post_id: post_id,
                user_id: user_id
            })
    }
}