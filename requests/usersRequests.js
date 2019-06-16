const UsersModel = require('../models/usersModel');
const PostsModel = require('../models/postsModel');
const CommentsModel = require('../models/commentsModel');

const Sequelize = require('sequelize');
const {fn, col, Op} = Sequelize;
UsersModel.hasMany(PostsModel, {foreignKey: 'user_id'});
UsersModel.hasMany(CommentsModel, {foreignKey: 'user_id'});

let Users = {
    // самый активный автор
    findTopBloger: () => {
        return UsersModel.findAll({
            attributes: ['id', 'name', 'surname', 'city', 'avatar_path', [fn('count', col('posts.id')), 'posts_count']],
            group: ['users.id'],
            include: [{
                model: PostsModel,
                attributes: [],
                duplicating: false,
            }],
            order: [[fn('count', col('posts.id')), 'DESC']],
            limit: 1,
        })
    },

    // самый активный комментатор
    findTopCommentator: () => {
        return UsersModel.findAll({
            attributes: ['id', 'name', 'surname', 'city', 'avatar_path', [fn('count', col('comments.id')), 'comments_count']],
            group: ['users.id'],
            include: [{
                model: CommentsModel,
                attributes: [],
                duplicating: false,
            }],
            order: [[fn('count', col('comments.id')), 'DESC']],
            limit: 1,
        })
    },

    // выборка пользователей
    findSample: (limit, offset, val1, val2) => {
        return UsersModel.findAll({
            attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']},
            where: val2 !== 'null'
                ?
                {[Op.and]: [
                        {name: {[Op.like]: `${val1}%`}},
                        {surname: {[Op.like]: `${val2}%`}}
                    ]}
                :
                {[Op.or]: [
                        {name: {[Op.like]: `${val1}%`}},
                        {surname: {[Op.like]: `${val1}%`}}
                    ]},
            offset: offset,
            limit: limit
        })
    },

    // запрос одного пользователя для отображения на странице
    findUserById: (user_id) => {
        return UsersModel.findOne({
            attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
    },

    //Запрос одного пользователя для добавления лайка
    findUserByIdForLike: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'name', 'surname', 'avatar_path'],
            where: {
                id: user_id
            }
        })
    },

    // запрос пользователя для добавления информации о авторе в сохраняемом посте
    findUserByIdForNewItem: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'name', 'surname'],
            where: {
                id: user_id
            }
        })
    },

    // регистрация нового пользователя
    register: (user, avatar, password) => {
        return UsersModel.create({
            login: user.login,
            password: password,
            name: user.name,
            surname: user.surname,
            avatar_path: avatar,
            city: user.city,
            site: user.site,
            email: user.email
        })
    },

    // авторизация пользователя
    findByLogin: (login) => {
        return UsersModel.findOne({
            where: {
                login: login
            }
        })
    },

    //  запрос авторизованного пользователя
    findLoginById: (user_id) => {
        return UsersModel.findOne({
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
    },


    // редактирование профиля пользователя
    editProfile: (profile) => {
        return UsersModel.update({
            login: profile.login,
            name: profile.name,
            surname: profile.surname,
            city: profile.city,
            age: profile.age,
            site: profile.site,
            email: profile.email
        }, {
            where: {
                id: profile.id
            }
        })
    },

    // Запрос пользователя для проверки пароля при изменении
    findLoginForPass: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'login', 'password'],
            where: {
                id: user_id
            }
        });
    },

    // изменение пароля пользователя
    editPass: (user_id, password) => {
        return UsersModel.update({
            password: password
        }, {
            where: {
                id: user_id
            }
        })
    },

    // смена аватара пользователя
    editAvatar: (user_id, avatar_path) => {
        return UsersModel.update({
            avatar_path: avatar_path
        }, {
            where: {
                id: user_id
            }
        })
    }

};

module.exports = Users;