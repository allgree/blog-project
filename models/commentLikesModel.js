const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER} = Sequelize;
const model = db.define('comments_likes', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_id: INTEGER,
    user_id: INTEGER
}, {
    timestamps: false
});

module.exports = model;