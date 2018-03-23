const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('posts_likes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
}, {
    timestamps: false
});

let PostsLikes = {
    findAll: (callback) => {
        model.findAll({})
             .then(result => {
                 callback(result);
             })
    },
    findByPostId: (post_id, callback) => {
        model.findAll({
            where: {
                post_id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    add: (post_id, user_id, callback) => {
        model.create({
            post_id: post_id,
            user_id: user_id,
        })
            .then(result => callback(result))
    },
    delete: (post_id, user_id, callback) => {
        model.destroy({
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