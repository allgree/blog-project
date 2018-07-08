export function addPostLike(posts, like) {
    posts.find((post) => {
        if (post.id === like.post_id) {
            return post.likes.push({id: like.id, user: like.user});
        }
    });
    return posts;
}