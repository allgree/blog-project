import axios from 'axios';

export function fetchUserPosts(user_id) {
    return {
        type: 'FETCH_USER_POSTS',
        payload: axios.get(`/api/posts/user/${user_id}`)
    }
}

export function addUserPost(user_id, title, body) {
    return {
        type: 'ADD_USER_POST',
        payload: axios.post('/api/posts/add/',
            {
                user_id: user_id,
                title: title,
                body: body
            })
    }
}

export function deleteUserPost(post_id) {
    return {
        type: 'DELETE_USER_POST',
        payload: axios.post('/api/posts/delete/', {post_id: post_id})
    }
}