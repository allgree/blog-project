export function deletePostLike(posts, like) {
    if (like.result === 1) {
        posts.find((post) => {
            if (post.id === like.post_id) {
                return post.likes.find((find_like, index) => {
                    if (find_like.user.id === like.user_id) {
                        return post.likes.splice(index, 1);
                    }
                })
            }
        })
    }
    return posts;
}