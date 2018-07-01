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

module.exports = model;