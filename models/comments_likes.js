const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('comments_likes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
}, {
    timestamps: false
});

let CommentsLikes = {
    findAll: (callback) => {
        model.findAll({})
             .then(result => {
                callback(result);
            })
    },
    findByCommentId: (comment_id, callback) => {
        model.findAll({
            where: {
                comment_id: comment_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    add: (comment_id, user_id, callback) => {
        model.create({
            comment_id: comment_id,
            user_id: user_id
        })
            .then(result => {callback(result)})
    },
    delete: (comment_id, user_id, callback) => {
        model.destroy({
            where: {
                comment_id: comment_id,
                user_id: user_id
            }
        })
            .then(result => {callback(result);})
    }
};

module.exports = CommentsLikes;