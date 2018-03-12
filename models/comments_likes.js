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
    }
};

module.exports = CommentsLikes;