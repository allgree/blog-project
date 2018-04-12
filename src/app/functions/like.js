export function like(content_id, login, likes, dispatch, del, add) {
    if (Object.keys(login).length === 0) return;
    if (likes.find(item => item.post_id === content_id && item.user_id === login.id) ||
        likes.find(item => item.comment_id === content_id && item.user_id === login.id)) {
        dispatch(del(content_id, login.id))
    } else {
        dispatch(add(content_id, login.id))
    }
}