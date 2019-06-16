const PostsLikesModel = require('../models/postsLikesModel');
const UsersModel = require('../models/usersModel');

PostsLikesModel.belongsTo(UsersModel, {foreignKey: 'user_id'});

let PostsLikes = {
    /** получить лайки к посту
      SELECT `posts_likes`.`id`,
             `user`.`id` AS `user.id`,
             `user`.`name` AS `user.name`,
             `user`.`surname` AS `user.surname`,
             `user`.`avatar_path` AS `user.avatar_path`
        FROM `posts_likes` AS `posts_likes`
        LEFT OUTER JOIN `users` AS `user`
            ON `posts_likes`.`user_id` = `user`.`id`
        WHERE `posts_likes`.`post_id` = {post_id};
     */
    findPostLikes: (post_id) => {
        return PostsLikesModel.findAll({
            attributes: ['id'],
            where: {
                post_id: post_id
            },
            include: [{
                model: UsersModel,
                attributes: ['id', 'name', 'surname', 'avatar_path']
            }]
        })
    },

    /**добавить лайк
     *  INSERT INTO `posts_likes` (`id`,`post_id`,`user_id`) VALUES (DEFAULT,{post_id},{user_id});
      */
    add: (post_id, user_id) => {
        return PostsLikesModel.create({
            post_id: post_id,
            user_id: user_id,
        })
    },
    /**удалить лайк
     * DELETE FROM `posts_likes` WHERE `post_id` = {post_id} AND `user_id` = {user_id}
      */
    delete: (post_id, user_id) => {
        return PostsLikesModel.destroy({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        })
    }
};

module.exports = PostsLikes;