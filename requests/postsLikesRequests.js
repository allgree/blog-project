const PostsLikesModel = require('../models/postsLikesModel');
const UsersModel = require('../models/usersModel');

PostsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let PostsLikes = {
    // получить лайки к посту
    findPostLikes: (post_id) => {
        return PostsLikesModel.findAll({
            attributes: ['id'],
            where: {
                post_id: post_id
            },
            include: [{
                model: UsersModel,
                attributes: ['id', 'name', 'surname', 'avatar_path']
            }]
        })
    },

    // добавить лайк
    add: (post_id, user_id) => {
        return PostsLikesModel.create({
            post_id: post_id,
            user_id: user_id,
        })
    },
    // удалить лайк
    delete: (post_id, user_id) => {
        return PostsLikesModel.destroy({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        })
    }
};

module.exports = PostsLikes;