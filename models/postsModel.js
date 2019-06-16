const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, STRING, TEXT, DATE} = Sequelize;
const model = db.define('posts', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: INTEGER,
    title: STRING(255),
    body: TEXT,
    views: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
});

module.exports = model;