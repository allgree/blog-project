const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, TEXT} = Sequelize;
const model = db.define('tokens', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: INTEGER,
    token: TEXT
}, {
    timestamps: false
});

module.exports = model;