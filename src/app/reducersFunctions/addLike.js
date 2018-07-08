export function addLike(items, like) {
    items.find(item => {
        if (item.id === like.post_id || item.id === like.comment_id) {
            return item.likes.push({id: like.id, user: like.user});
        }
    });
    return items;
}