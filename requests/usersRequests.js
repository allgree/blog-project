const UsersModel = require('../models/usersModel');
const PostsModel = require('../models/postsModel');
const CommentsModel = require('../models/commentsModel');

const Sequelize = require('sequelize');
const {fn, col, Op} = Sequelize;
UsersModel.hasMany(PostsModel, {foreignKey: 'user_id'});
UsersModel.hasMany(CommentsModel, {foreignKey: 'user_id'});

let Users = {
    /**самый активный автор
      SELECT `users`.`id`,
             `users`.`name`,
             `users`.`surname`,
             `users`.`city`,
             `users`.`avatar_path`,
             count(`posts`.`id`) AS `posts_count`
        FROM `users` AS `users`
        LEFT OUTER JOIN `posts` AS `posts`
            ON `users`.`id` = `posts`.`user_id`
        GROUP BY `users`.`id`
        ORDER BY count(`posts`.`id`) DESC
        LIMIT 1;
      */
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

    /**самый активный комментатор
     SELECT `users`.`id`,
            `users`.`name`,
            `users`.`surname`,
            `users`.`city`,
            `users`.`avatar_path`,
             count(`comments`.`id`) AS `comments_count`
     FROM `users` AS `users`
     LEFT OUTER JOIN `comments` AS `comments`
        ON `users`.`id` = `comments`.`user_id`
     GROUP BY `users`.`id`
     ORDER BY count(`comments`.`id`) DESC
     LIMIT 1;
      */
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

    /**выборка пользователей
      SELECT `id`, `name`,
             `surname`, `city`,
             `age`, `site`,
             `email`, `avatar_path`
        FROM `users` AS `users`
        WHERE (`users`.`name` LIKE '%'
               AND
              `users`.`surname` LIKE '%')
        LIMIT {offset}, 10;
      */
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

    /**запрос одного пользователя для отображения на странице
       SELECT `id`, `name`, `surname`, `city`, `age`, `site`, `email`, `avatar_path`
       FROM `users` AS `users`
       WHERE `users`.`id` = {user_id};
      */
    findUserById: (user_id) => {
        return UsersModel.findOne({
            attributes: {exclude: ['login', 'password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
    },

    /**Запрос одного пользователя для добавления лайка
       SELECT `id`, `name`, `surname`, `avatar_path`
        FROM `users` AS `users`
        WHERE `users`.`id` = {user_id};
     */
    findUserByIdForLike: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'name', 'surname', 'avatar_path'],
            where: {
                id: user_id
            }
        })
    },

    /**запрос пользователя для добавления информации о авторе в сохраняемом посте
      SELECT `id`, `name`, `surname`
        FROM `users` AS `users`
        WHERE `users`.`id` = {user_id}
      */
    findUserByIdForNewItem: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'name', 'surname'],
            where: {
                id: user_id
            }
        })
    },

    /**регистрация нового пользователя
     INSERT INTO `users` (`id`,`login`,`password`,`name`,`surname`,`avatar_path`,`createdAt`,`updatedAt`)
      VALUES (DEFAULT,{login},{password},{name},{surname},{avatar_path},{createdAt},{updatedAt});
      */
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

    /** авторизация пользователя
     SELECT `id`, `login`, `password`, `name`, `surname`, `city`, `age`, `site`, `email`, `avatar_path`, `createdAt`, `updatedAt`
        FROM `users` AS `users`
        WHERE `users`.`login` = {login}
        LIMIT 1;
      */
    findByLogin: (login) => {
        return UsersModel.findOne({
            where: {
                login: login
            }
        })
    },

    /**запрос авторизованного пользователя
      SELECT `id`, `login`, `name`, `surname`, `city`, `age`, `site`, `email`, `avatar_path`
        FROM `users` AS `users`
        WHERE `users`.`id` = {user_id};
      */
    findLoginById: (user_id) => {
        return UsersModel.findOne({
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
            where: {
                id: user_id
            }
        })
    },


    /**редактирование профиля пользователя
       UPDATE `users`
       SET `login`={login},
           `name`={name},
           `surname`={surname},
           `city`={city},
           `age`={age},
           `site`={site},
           `email`={email},
           `updatedAt`={updatedAt}
        WHERE `id` = {user_id}
      */
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

    /**Запрос пользователя для проверки пароля при изменении
      SELECT `id`, `login`, `password`
        FROM `users` AS `users`
        WHERE `users`.`id` = {user_id};
      */
    findLoginForPass: (user_id) => {
        return UsersModel.findOne({
            attributes: ['id', 'login', 'password'],
            where: {
                id: user_id
            }
        });
    },

    /**изменение пароля пользователя
      UPDATE `users`
        SET `password`={password},`updatedAt`={updatedAt}
        WHERE `id` = {user_id}
      */
    editPass: (user_id, password) => {
        return UsersModel.update({
            password: password
        }, {
            where: {
                id: user_id
            }
        })
    },

    /**смена аватара пользователя
      UPDATE `users`
        SET `avatar_path`={avatar_path},`updatedAt`={updatedAt}
        WHERE `id` = 16
      */
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