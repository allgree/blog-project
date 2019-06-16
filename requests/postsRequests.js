const PostsModel = require('../models/postsModel');
const UsersModel = require('../models/usersModel');
const PostsLikesModel = require('../models/postsLikesModel');

const Sequelize = require('sequelize');
const {fn, col, Op} = Sequelize;
PostsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});
PostsModel.hasMany(PostsLikesModel, {as: 'likes', foreignKey: 'post_id'});
PostsLikesModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});

let Posts = {
    /**выборка постов для отображения топ-5 просмотренных постов
      SELECT `posts`.`id`,
             `posts`.`user_id`,
             `posts`.`title`,
             `posts`.`body`,
             `posts`.`views`,
             `posts`.`createdAt`,
             `author`.`id` AS `author.id`,
             `author`.`name` AS `author.name`,
             `author`.`surname` AS `author.surname`
        FROM `posts` AS `posts`
        LEFT OUTER JOIN `users` AS `author`
            ON `posts`.`user_id` = `author`.`id`
        ORDER BY `posts`.`views` DESC
        LIMIT 5;
      */
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


    /**выборка постов для отображения топ-5 отмеченных постов
      SELECT `posts`.`id`,
             `posts`.`user_id`,
             `posts`.`title`,
             `posts`.`body`,
             `posts`.`views`,
             `posts`.`createdAt`,
             `author`.`id` AS `author.id`,
             `author`.`name` AS `author.name`,
             `author`.`surname` AS `author.surname`
        FROM `posts` AS `posts`
        LEFT OUTER JOIN `users` AS `author`
            ON `posts`.`user_id` = `author`.`id`
        LEFT OUTER JOIN `posts_likes` AS `likes`
            ON `posts`.`id` = `likes`.`post_id`
        GROUP BY `posts`.`id`
        ORDER BY count(`likes`.`id`) DESC
        LIMIT 5;
      */
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

    /**выборка постов для автоподгрузки
     * SELECT `posts`.`id`,
              `posts`.`user_id`,
              `posts`.`title`,
              `posts`.`body`,
              `posts`.`views`,
              `posts`.`createdAt`,
              `author`.`id` AS `author.id`,
              `author`.`name` AS `author.name`,
              `author`.`surname` AS `author.surname`
     FROM `posts` AS `posts`
     LEFT OUTER JOIN `users` AS `author`
        ON `posts`.`user_id` = `author`.`id`
     WHERE `posts`.`title` LIKE '%%'
     ORDER BY `posts`.`createdAt` DESC
     LIMIT {offset}, 10;
      */
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

    /** выборка постов одного пользователя для автоподгрузки
      SELECT `id`,
             `user_id`,
             `title`, `body`,
             `views`, `createdAt`
        FROM `posts` AS `posts`
        WHERE `posts`.`user_id` = 1
            AND `posts`.`title`
        LIKE '%{search value}%'
        ORDER BY `posts`.`createdAt` DESC
        LIMIT {offset}, 10;
      */
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

    /**выборка постов для автоподгрузки ленты
       SELECT `posts`.`id`,
              `posts`.`user_id`,
              `posts`.`title`,
              `posts`.`body`,
              `posts`.`views`,
              `posts`.`createdAt`,
              `author`.`id` AS `author.id`,
              `author`.`name` AS `author.name`,
              `author`.`surname` AS `author.surname`
     FROM `posts` AS `posts`
     LEFT OUTER JOIN `users` AS `author`
        ON `posts`.`user_id` = `author`.`id`
     WHERE (`posts`.`user_id` = {user_id} OR `posts`.`user_id` = {user_id})
        AND `posts`.`title` LIKE '%%'
     ORDER BY `posts`.`createdAt` DESC
     LIMIT {offset}, 10;
      */
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

    /**найти один пост по id
       SELECT `posts`.`id`,
            `posts`.`title`,
            `posts`.`body`,
            `posts`.`views`,
            `posts`.`createdAt`,
            `author`.`id` AS `author.id`,
            `author`.`name` AS `author.name`,
            `author`.`surname` AS `author.surname`,
            `likes`.`id` AS `likes.id`,
            `likes->user`.`id` AS `likes.user.id`,
            `likes->user`.`name` AS `likes.user.name`,
            `likes->user`.`surname` AS `likes.user.surname`,
            `likes->user`.`avatar_path` AS `likes.user.avatar_path`
        FROM `posts` AS `posts`
        LEFT OUTER JOIN `users` AS `author`
            ON `posts`.`user_id` = `author`.`id`
        LEFT OUTER JOIN `posts_likes` AS `likes`
            ON `posts`.`id` = `likes`.`post_id`
        LEFT OUTER JOIN `users` AS `likes->user`
            ON `likes`.`user_id` = `likes->user`.`id`
        WHERE `posts`.`id` = {post_id};
      */
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


    /**добавить пост
      INSERT INTO `posts` (`id`,`user_id`,`title`,`body`,`views`,`createdAt`,`updatedAt`)
        VALUES (DEFAULT,{user_id},{title},{body},{views},{createdAt},{updatedAt});
      */
    add: (user_id, title, body) => {
        return PostsModel.create({
            user_id: user_id,
            title: title,
            body: body,
            views: 0
        })
    },

    /**удалить пост
       DELETE FROM `posts` WHERE `id` = {post_id}
      */
    delete: (post_id) => {
        return PostsModel.destroy({
            where: {
                id: post_id
            }
        })
    },

    /**добавить просмотр
      UPDATE `posts` SET `views`={views},`updatedAt`={updatedAt} WHERE `id` = {post_id}
      */
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