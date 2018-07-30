const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('opinions', {
   id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
    name: Sequelize.STRING(255),
    user_id: Sequelize.INTEGER,
    body: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = model;