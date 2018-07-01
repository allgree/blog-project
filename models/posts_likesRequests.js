const PostLikesModel = require('./posts-likesModel');

let PostsLikes = {
    findAll: (callback) => {
        PostLikesModel.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findByPostId: (post_id, callback) => {
        PostLikesModel.findAll({
            where: {
                post_id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    add: (post_id, user_id, callback) => {
        PostLikesModel.create({
            post_id: post_id,
            user_id: user_id,
        })
            .then(result => callback(result))
    },
    delete: (post_id, user_id, callback) => {
        PostLikesModel.destroy({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = PostsLikes;