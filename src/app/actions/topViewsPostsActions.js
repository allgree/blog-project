import axios from 'axios';

export function fetchTopViewsPosts() {
    return {
        type: 'FETCH_TOP_VIEWS_POSTS',
        payload: axios.get('api/posts/top_views/')
    }
}

//export function addLikeTopViewPost(post_id, user_id) {
//    return {
//        type: 'ADD_LIKE_TOP_VIEW_POST',
//        payload: axios.post('/api/post-likes/add/',
//            {
//                post_id: post_id,
//                user_id: user_id
//            })
//    }
//}
//
//export function deleteLikeTopViewPost(post_id, user_id) {
//    return {
//        type: 'DELETE_LIKE_TOP_VIEW_POST',
//        payload: axios.post('/api/post-likes/delete',
//            {
//                post_id: post_id,
//                user_id: user_id
//            })
//    }
//}