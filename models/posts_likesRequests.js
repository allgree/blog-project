const PostsLikesModel = require('./posts-likesModel');
const UsersModel = require('./usersModel');

PostsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let PostsLikes = {
    findPostLikes: (post_id, callback) => {
        PostsLikesModel.findAll({
            attributes: ['id'],
            where: {
                post_id: post_id
            },
            include: [{
                model: UsersModel,
                attributes: ['id', 'name', 'surname', 'avatar_path']
            }]
        })
            .then(result => {
                callback(result);
            })
    },

    findAll: (callback) => {
        PostsLikesModel.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findByPostId: (post_id, callback) => {
        PostsLikesModel.findAll({
            where: {
                post_id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    add: (post_id, user_id, callback) => {
        PostsLikesModel.create({
            post_id: post_id,
            user_id: user_id,
        })
            .then(result => callback(result))
    },
    delete: (post_id, user_id, callback) => {
        PostsLikesModel.destroy({
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