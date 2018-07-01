const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('subscriptions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    sub_user_id: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = model;