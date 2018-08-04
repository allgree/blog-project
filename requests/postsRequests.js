const PostsModel = require('../models/postsModel');
const UsersModel = require('../models/usersModel');
const PostsLikesModel = require('../models/postsLikesModel');

const Sequelize = require('sequelize');

PostsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});
PostsModel.hasMany(PostsLikesModel, {as: 'likes', foreignKey: 'post_id'});
PostsLikesModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});

let Posts = {
    // выборка постов для отображения топ-5 просмотренных постов
    findTopViewsPosts: (callback) => {
        PostsModel.findAll({
            attributes: {exclude: ['updatedAt']},
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            }],
            order: [['views', 'DESC']],
            limit: 5
        })
            .then(result => {
                callback(result);
            })
    },


    // выборка постов для отображения топ-5 отмеченных постов
    findTopLikesPosts: (callback) => {
        PostsModel.findAll({
            attributes: ['id', 'user_id', 'title', 'body', 'views', 'createdAt'],
            group: ['posts.id'],
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            },{
                model: PostsLikesModel,
                as: 'likes',
                attributes: [],
                duplicating: false,
            }],
            order: [[Sequelize.fn('count', Sequelize.col('likes.id')), 'DESC']],
            limit: 5
        })
            .then(result => {
                callback(result);
            })
    },

    // выборка постов для автоподгрузки
    findSample: (limit, offset, callback) => {
        PostsModel.findAll({
            attributes: {exclude: ['updatedAt']},
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
        })
            .then(result => {
                callback(result);
            })
    },

    // выборка постов одного пользователя для автоподгрузки
    findByUserIdSample: (limit, offset, user_id, callback) => {
        PostsModel.findAll({
            where: {
                user_id: user_id
            },
            attributes: {exclude: ['updatedAt']},
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => callback(result))
    },

    // выюорка постов для автоподгрузки ленты
    findPostsByFeed: (limit, offset, users_id, callback) => {
        if (users_id.length !== 0) {
            PostsModel.findAll({
                where: {
                    user_id: {
                        [Sequelize.Op.or]: users_id
                    }
                },
                attributes: {exclude: ['updatedAt']},
                include: [{
                    model: UsersModel,
                    as: 'author',
                    attributes: ['id', 'name', 'surname'],
                    duplicating: false,
                }],
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']]
            })
                .then(result => callback(result))
        } else {
            callback([]);
        }

    },

    // найти один пост по id
    findById: (post_id, callback) => {
        PostsModel.findOne({
            where: {
                id: post_id
            },
            attributes: ['id', 'title', 'body', 'views', 'createdAt'],
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
            },{
                model: PostsLikesModel,
                as: 'likes',
                attributes: ['id'],
                include: [{
                    model: UsersModel,
                    as: 'user',
                    attributes: ['id', 'name', 'surname', 'avatar_path']
                }]
            }],
        })
            .then(result => {
                callback(result);
            })
    },


    // добавить пост
    add: (user_id, title, body, callback) => {
        PostsModel.create({
            user_id: user_id,
            title: title,
            body: body,
            views: 0
        })
            .then(result => {
                callback(result);
            })
    },

    // удалить пост
    delete: (post_id, callback) => {
        PostsModel.destroy({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },

    // добавить просмотр
    updateViews: (post_id, views, callback) => {
        PostsModel.update({
            views: views
        }, {
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    }
};

module.exports = Posts;