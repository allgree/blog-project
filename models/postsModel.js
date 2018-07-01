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

module.exports = model;