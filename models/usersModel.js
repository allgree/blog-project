const Sequelize = require('sequelize');
const db = require('../db');

const {INTEGER, STRING, DATE} = Sequelize;
const model = db.define('users', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: STRING(255),
    password: STRING(255),
    name: STRING(255),
    surname: STRING(255),
    city: STRING(255),
    age: INTEGER,
    site: STRING(100),
    email: STRING(100),
    avatar_path: STRING(100),
    createdAt: DATE,
    updatedAt: DATE
}, //{
   // classMethods: {
   //     associate: (models) => {
   //         model.hasMany(models.Chapter, {
   //             foreignKey: 'fk_users_posts'
   //         });
   //     }
   // }
//}
);

module.exports = model;