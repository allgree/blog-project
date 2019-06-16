const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, TEXT, DATE} = Sequelize;
const model = db.define('comments', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: INTEGER,
    user_id: INTEGER,
    body: TEXT,
    createdAt: DATE,
    updatedAt: DATE
});

module.exports = model;