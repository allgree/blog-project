const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    body: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

let Comments = {
    findAll: (callback) => {
        model.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findByPostIdSample: (limit, offset, post_id, callback) => {
        model.findAll({
            where: {
                post_id: post_id
            },
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => {
                callback(result);
            })
    },
    add: (post_id, user_id, body, callback) => {
        model.create({
            post_id: post_id,
            user_id: user_id,
            body: body
        })
            .then(result => {callback(result)})
    },
    delete: (comment_id, callback) => {
        model.destroy({
            where: {
                id: comment_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Comments;