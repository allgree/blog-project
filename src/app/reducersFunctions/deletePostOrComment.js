export function deletePost(posts, payload) {
    if (payload.data === 1) {
        let deleted_post_id = JSON.parse(payload.config.data).post_id;
        posts.find((post, index) => {
            if (post.id === deleted_post_id) {
                return posts.splice(index, 1);
            }
        })
    }
    return posts;
}