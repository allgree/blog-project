// удалить пост или комментарий
export function deletePostOrComment(items, payload) {
    if (payload.data === 1) {
        let deleted_item_id = JSON.parse(payload.config.data).post_id || JSON.parse(payload.config.data).comment_id;
        items.find((item, index) => {
            if (item.id === deleted_item_id) {
                return items.splice(index, 1);
            }
        })
    }
    return items;
}