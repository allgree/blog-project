const UsersModel = require('../models/usersModel');
const PostsModel = require('../models/postsModel');
const CommentsModel = require('../models/commentsModel');

const Sequelize = require('sequelize');

UsersModel.hasMany(PostsModel, {foreignKey: 'user_id'});
UsersModel.hasMany(CommentsModel, {foreignKey: 'user_id'});

let Users = {
    findTopBloger: (callback) => {
        UsersModel.findAll({
            attributes: ['id', 'name', 'surname', 'city', 'avatar_path', [Sequelize.fn('count', Sequelize.col('posts.id')), 'posts_count']],
            group: ['users.id'],
            include: [{
                model: PostsModel,
                attributes: [],
                duplicating: false,
            }],
            order: [[Sequelize.fn('count', Sequelize.col('posts.id')), 'DESC']],
            limit: 1,
        })
            .then(result => {
                callback(result);
            })
    },

    findTopCommentator: (callback) => {
        UsersModel.findAll({
            attributes: ['id', 'name', 'surname', 'city', 'avatar_path', [Sequelize.fn('count', Sequelize.col('comments.id')), 'comments_count']],
            group: ['users.id'],
            include: [{
                model: CommentsModel,
                attributes: [],
                duplicating: false,
            }],
            order: [[Sequelize.fn('count', Sequelize.col('comments.id')), 'DESC']],
            limit: 1,
        })
            .then(result => {
                callback(result);
            })
    },

    findSample: (limit, offset, callback) => {
        UsersModel.findAll({
            attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']},
            offset: offset,
            limit: limit
        })
            .then(result => {
                callback(result)
            })
    },

    // запрос одного пользователя для отображения на странице
    findUserById: (user_id, callback) => {
        UsersModel.findOne({
            attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },

    //Запрос одного пользователя для добавления лайка
    findUserByIdForLike: (user_id, callback) => {
        UsersModel.findOne({
            attributes: ['id', 'name', 'surname', 'avatar_path'],
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },

    // запрос пользователя для добавления информации о авторе в сохраняемом посте
    findUserByIdForNewItem: (user_id, callback) => {
        UsersModel.findOne({
            attributes: ['id', 'name', 'surname'],
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },


    // регистрация нового пользователя
    register: (user, avatar, password, callback) => {
        UsersModel.create({
            login: user.login,
            password: password,
            name: user.name,
            surname: user.surname,
            avatar_path: avatar,
            city: user.city,
            site: user.site,
            email: user.email
        })
            .then(result => {
                callback(result);
            })
    },

    // авторизация пользователя
    findByLogin: (login, callback) => {
        UsersModel.findOne({
            where: {
                login: login
            }
        })
            .then(result => {
                callback(result);
            })
    },

    //  запрос авторизованного пользователя
    findLoginById: (user_id, callback) => {
        UsersModel.findOne({
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },


    // редактирование профиля пользователя
    editProfile: (profile, callback) => {
        UsersModel.update({
            login: profile.login,
            name: profile.name,
            surname: profile.surname,
            city: profile.city,
            site: profile.site,
            email: profile.email
        }, {
            where: {
                id: profile.id
            }
        })
            .then(result => {
                callback(result)
            })
    },

    // изменение пароля пользователя
    editPass: (user_id, password, callback) => {
        UsersModel.update({
            password: password
        }, {
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result)
            })
    },

    // смена аватара пользователя
    editAvatar: (user_id, avatar_path, callback) => {
        UsersModel.update({
            avatar_path: avatar_path
        }, {
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result)
            })
    }

};

module.exports = Users;