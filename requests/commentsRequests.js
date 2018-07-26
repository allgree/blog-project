const CommentsModel = require('../models/commentsModel');
const UsersModel = require('../models/usersModel');

CommentsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});

let Comments = {
    findAll: (callback) => {
        CommentsModel.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findByPostIdSample: (limit, offset, post_id, callback) => {
        CommentsModel.findAll({
            where: {
                post_id: post_id
            },
            attributes: {exclude: ['user_id', 'updatedAt']},
            include: [{
               model: UsersModel,
               as: 'author',
               attributes: ['id', 'name', 'surname'],
               duplicating: false,
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => {
                callback(result);
            })
    },
    add: (post_id, user_id, body, callback) => {
        CommentsModel.create({
            post_id: post_id,
            user_id: user_id,
            body: body
        })
            .then(result => {callback(result)})
    },
    deleteById: (comment_id, callback) => {
        CommentsModel.destroy({
            where: {
                id: comment_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    deleteByPostId: (post_id, callback) => {
        CommentsModel.destroy({
            where: {
                post_id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Comments;