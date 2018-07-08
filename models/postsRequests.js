const PostsModel = require('./postsModel');
const UsersModel = require('./usersModel');
const PostsLikesModel = require('./posts-likesModel');

const Sequelize = require('sequelize');

PostsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});
PostsModel.hasMany(PostsLikesModel, {as: 'likes', foreignKey: 'post_id'});

let Posts = {
    findTopViewsPosts: (callback) => {
        PostsModel.findAll({
            attributes: {exclude: ['user_id', 'updatedAt']},
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

    findTopLikesPosts: (callback) => {
        PostsModel.findAll({
            attributes: ['id', 'title', 'body', 'views', 'createdAt'],
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

    findSample: (limit, offset, callback) => {
        PostsModel.findAll({
            attributes: {exclude: ['user_id', 'updatedAt']},
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

    findAll: (callback) => {
        PostsModel.findAll({})
             .then(result => {
                 callback(result);
             })
    },

    findById: (post_id, callback) => {
        PostsModel.findOne({
            where: {
                id: post_id
            }
        })
            .then(result => {
                callback(result);
            })
    },

    findByUserIdSample: (limit, offset, user_id, callback) => {
        PostsModel.findAll({
            where: {
                user_id: user_id
            },
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => {
                callback(result);
            })
    },
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