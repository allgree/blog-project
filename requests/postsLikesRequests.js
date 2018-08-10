const PostsLikesModel = require('../models/postsLikesModel');
const UsersModel = require('../models/usersModel');

PostsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let PostsLikes = {
    // получить лайки к посту
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
            .then(result => callback(result))
    },

    // добавить лайк
    add: (post_id, user_id, callback) => {
        PostsLikesModel.create({
            post_id: post_id,
            user_id: user_id,
        })
            .then(result => callback(result))
    },
    // удалить лайк
    delete: (post_id, user_id, callback) => {
        PostsLikesModel.destroy({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        })
            .then(result => callback(result))
    }
};

module.exports = PostsLikes;