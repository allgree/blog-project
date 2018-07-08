export function like(items, item_id, dispatch, addLike, deleteLike, login_id) {
    let item = items.find(item => item.id === item_id);
    if (!item) return;
    if (item.likes.find(like => like.user.id === login_id)) {
        dispatch(deleteLike(item_id, login_id));
    } else {
        dispatch(addLike(item_id, login_id));
    }
}