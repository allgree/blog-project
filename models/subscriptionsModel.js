const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, DATE} = Sequelize;
const model = db.define('subscriptions', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: INTEGER,
    sub_user_id: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
});

module.exports = model;