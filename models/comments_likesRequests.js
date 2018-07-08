const CommentsLikesModel = require('./comments-likesModel');
const UsersModel = require('./usersModel');

CommentsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let CommentsLikes = {
    findAll: (callback) => {
        CommentsLikesModel.findAll({})
             .then(result => {
                callback(result);
            })
    },
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
            .then(result => {
                callback(result);
            })
    },
    add: (comment_id, user_id, callback) => {
        CommentsLikesModel.create({
            comment_id: comment_id,
            user_id: user_id
        })
            .then(result => {callback(result)})
    },
    delete: (comment_id, user_id, callback) => {
        CommentsLikesModel.destroy({
            where: {
                comment_id: comment_id,
                user_id: user_id
            }
        })
            .then(result => {callback(result);})
    }
};

module.exports = CommentsLikes;