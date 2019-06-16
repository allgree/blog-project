const PostsModel = require('../models/postsModel');
const UsersModel = require('../models/usersModel');
const PostsLikesModel = require('../models/postsLikesModel');

const Sequelize = require('sequelize');
const {fn, col, Op} = Sequelize;
PostsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});
PostsModel.hasMany(PostsLikesModel, {as: 'likes', foreignKey: 'post_id'});
PostsLikesModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});

let Posts = {
    // выборка постов для отображения топ-5 просмотренных постов
    findTopViewsPosts: () => {
        return PostsModel.findAll({
            attributes: {exclude: ['updatedAt']},
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            }],
            order: [['views', 'DESC']],
            limit: 5
        });
    },


    // выборка постов для отображения топ-5 отмеченных постов
    findTopLikesPosts: () => {
        return PostsModel.findAll({
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
            order: [[fn('count', col('likes.id')), 'DESC']],
            limit: 5
        })
    },

    // выборка постов для автоподгрузки
    findSample: (limit, offset, value) => {
        return PostsModel.findAll({
            attributes: {exclude: ['updatedAt']},
            where: {
                title: {
                    [Op.like]: `%${value}%`
                }
            },
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
        });
    },

    // выборка постов одного пользователя для автоподгрузки
    findByUserIdSample: (limit, offset, user_id, value) => {
        return PostsModel.findAll({
            where: {
                user_id: user_id,
                title: {
                    [Op.like]: `%${value}%`
                }
            },
            attributes: {exclude: ['updatedAt']},
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
    },

    // выюорка постов для автоподгрузки ленты
    findPostsByFeed: (limit, offset, users_id, value) => {
        if (users_id.length === 0) return [];
        return PostsModel.findAll({
            where: {
                user_id: {
                    [Op.or]: users_id
                },
                title: {
                    [Op.like]: `%${value}%`
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
        });
    },

    // найти один пост по id
    findById: (post_id) => {
        return PostsModel.findOne({
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
    },


    // добавить пост
    add: (user_id, title, body) => {
        return PostsModel.create({
            user_id: user_id,
            title: title,
            body: body,
            views: 0
        })
    },

    // удалить пост
    delete: (post_id) => {
        return PostsModel.destroy({
            where: {
                id: post_id
            }
        })
    },

    // добавить просмотр
    updateViews: (post_id, views) => {
        return PostsModel.update({
            views: views
        }, {
            where: {
                id: post_id
            }
        })
    }
};

module.exports = Posts;