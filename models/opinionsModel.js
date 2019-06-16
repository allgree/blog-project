const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, STRING, TEXT, DATE} = Sequelize;
const model = db.define('opinions', {
   id: {
       type: INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
    name: STRING(255),
    user_id: INTEGER,
    body: TEXT,
    createdAt: DATE,
    updatedAt: DATE
});

module.exports = model;