const CommentsLikesModel = require('../models/commentLikesModel');
const UsersModel = require('../models/usersModel');

CommentsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let CommentsLikes = {
    /**получить лайки к комментарию
    SELECT `comments_likes`.`id`,
           `user`.`id` AS `user.id`,
           `user`.`name` AS `user.name`,
           `user`.`surname` AS `user.surname`,
           `user`.`avatar_path` AS `user.avatar_path`
        FROM `comments_likes` AS `comments_likes`
        LEFT OUTER JOIN `users` AS `user`
            ON `comments_likes`.`user_id` = `user`.`id`
        WHERE `comments_likes`.`comment_id` = {comment_id};*/
    findByCommentId: (comment_id) => {
        return CommentsLikesModel.findAll({
            attributes: ['id'],
            where: {
                comment_id: comment_id
            },
            include: [{
                model: UsersModel,
                attributes: ['id', 'name', 'surname', 'avatar_path']
            }]
        })
    },

    /** добавить лайк к комметарию
     INSERT INTO `comments_likes` (`id`,`comment_id`,`user_id`) VALUES (DEFAULT,{comment_id},{user_id});
      */
    add: (comment_id, user_id) => {
        return CommentsLikesModel.create({
            comment_id: comment_id,
            user_id: user_id
        })
    },
    /** удалить лайк к комментарию
     *  DELETE FROM `comments_likes` WHERE `comment_id` = {comment_id} AND `user_id` = {user_id}
     * */
    delete: (comment_id, user_id) => {
        return CommentsLikesModel.destroy({
            where: {
                comment_id: comment_id,
                user_id: user_id
            }
        })
    }
};

module.exports = CommentsLikes;