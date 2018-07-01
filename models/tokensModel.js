const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('tokens', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    token: Sequelize.TEXT
}, {
    timestamps: false
});

module.exports = model;