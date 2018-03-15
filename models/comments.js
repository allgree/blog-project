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
    findByPostId: (post_id, callback) => {
        model.findAll({
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