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

module.exports = model;