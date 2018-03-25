const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    title: Sequelize.STRING(255),
    body: Sequelize.TEXT,
    views: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

let Posts = {
    findAll: (callback) => {
        model.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findById: (post_id, callback) => {
        model.findOne({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    findByUserId: (user_id, callback) => {
        model.findAll({
            where: {
                user_id: user_id
            }
        })
            .then(result => {
                callback(result);
            }
        )
    },
    add: (user_id, title, body, callback) => {
        model.create({
            user_id: user_id,
            title: title,
            body: body,
            views: 0
        })
            .then(result => {
                callback(result);
            })
    },
    delete: (post_id, callback) => {
        model.destroy({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    updateViews: (post_id, views, callback) => {
        model.update({
            views: views
        }, {
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Posts;