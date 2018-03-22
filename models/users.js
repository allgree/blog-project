const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: Sequelize.STRING(255),
    password: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    surname: Sequelize.STRING(255),
    city: Sequelize.STRING(255),
    age: Sequelize.INTEGER,
    site: Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    avatar_path: Sequelize.STRING(100),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

let Users = {
    findAll: (callback) => {
        model.findAll({})
            .then(result => {
                callback(result);
            })
    },
    findById: (user_id, callback) => {
        model.findOne({
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    findByLogin: (login, callback) => {
        model.findOne({
            where: {
                login: login
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Users;