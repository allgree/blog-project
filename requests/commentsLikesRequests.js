const CommentsLikesModel = require('../models/commentLikesModel');
const UsersModel = require('../models/usersModel');

CommentsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let CommentsLikes = {
    // получить лайки к комментарию
    findByCommentId: (comment_id, callback) => {
        CommentsLikesModel.findAll({
            attributes: ['id'],
            where: {
                comment_id: comment_id
            },
            include: [{
                model: UsersModel,
                attributes: ['id', 'name', 'surname', 'avatar_path']
            }]
        })
            .then(result => callback(result))
    },
    // добавить лайк к комметарию
    add: (comment_id, user_id, callback) => {
        CommentsLikesModel.create({
            comment_id: comment_id,
            user_id: user_id
        })
            .then(result => callback(result))
    },
    // удалить лайк к комментарию
    delete: (comment_id, user_id, callback) => {
        CommentsLikesModel.destroy({
            where: {
                comment_id: comment_id,
                user_id: user_id
            }
        })
            .then(result => callback(result))
    }
};

module.exports = CommentsLikes;