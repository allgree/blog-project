export function deleteLike(items, like) {
    if (like.result === 1) {
        items.find(item => {
            if (item.id === like.post_id || item.id === like.comment_id) {
                return item.likes.find((find_like, index) => {
                    if (find_like.user.id === like.user_id) {
                        return item.likes.splice(index, 1);
                    }
                })
            }
        })
    }
    return items;
}