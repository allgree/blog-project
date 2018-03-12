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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

let Posts = {
    findAll: (callback) => {
        model.findAll({})
             .then(result => {
                 callback(result);
             })
    }
};

module.exports = Posts;