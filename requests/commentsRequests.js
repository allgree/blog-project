const CommentsModel = require('../models/commentsModel');
const UsersModel = require('../models/usersModel');

CommentsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});

let Comments = {
    /** получить выборку комментариев для автоподгрузки
      SELECT `comments`.`id`,
             `comments`.`post_id`,
             `comments`.`body`,
             `comments`.`createdAt`,
             `author`.`id` AS `author.id`,
             `author`.`name` AS `author.name`,
             `author`.`surname` AS `author.surname`
        FROM `comments` AS `comments`
        LEFT OUTER JOIN `users` AS `author`
           ON `comments`.`user_id` = `author`.`id`
        WHERE `comments`.`post_id` = {post_id}
        ORDER BY `comments`.`createdAt` DESC
        LIMIT {offset}, 10;
     */
    findByPostIdSample: (limit, offset, post_id) => {
        return CommentsModel.findAll({
            where: {
                post_id: post_id
            },
            attributes: {exclude: ['user_id', 'updatedAt']},
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
    },

    /** добавить комментаий
     INSERT INTO `comments` (`id`,`post_id`,`user_id`,`body`,`createdAt`,`updatedAt`)
        VALUES (DEFAULT,{post_id},{user_id},{body},{createdAt},{updatedAt};
      */
    add: (post_id, user_id, body) => {
        return CommentsModel.create({
            post_id: post_id,
            user_id: user_id,
            body: body
        })
    },
    /** удалить коментарий
      DELETE FROM `comments` WHERE `id` = {comment_id}
      */

    deleteById: (comment_id) => {
        return CommentsModel.destroy({
            where: {
                id: comment_id
            }
        })
    },

};

module.exports = Comments;