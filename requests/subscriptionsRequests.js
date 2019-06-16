const SubscriptionsModel = require('../models/subscriptionsModel');
const UsersModel = require('../models/usersModel');

const Sequelize = require('sequelize');
const {Op} = Sequelize;
SubscriptionsModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});
SubscriptionsModel.belongsTo(UsersModel, {as: 'sub_user', foreignKey: 'sub_user_id'});

let Subscriptions = {
    /**выборка подписок пользователя для автоподгрузки
       SELECT `subscriptions`.`id`,
              `subscriptions`.`createdAt`,
              `user`.`id` AS `user.id`,
              `user`.`name` AS `user.name`,
              `user`.`surname` AS `user.surname`,
              `user`.`avatar_path` AS `user.avatar_path`,
              `user`.`city` AS `user.city`,
              `user`.`age` AS `user.age`,
              `sub_user`.`id` AS `sub_user.id`,
              `sub_user`.`name` AS `sub_user.name`,
              `sub_user`.`surname` AS `sub_user.surname`,
              `sub_user`.`avatar_path` AS `sub_user.avatar_path`,
              `sub_user`.`city` AS `sub_user.city`,
              `sub_user`.`age` AS `sub_user.age`
            FROM `subscriptions` AS `subscriptions`
            LEFT OUTER JOIN `users` AS `user`
                ON `subscriptions`.`user_id` = `user`.`id`
            INNER JOIN `users` AS `sub_user`
                ON `subscriptions`.`sub_user_id` = `sub_user`.`id`
                AND (`sub_user`.`name` LIKE '%'
                        AND
                    `sub_user`.`surname` LIKE '%')
            WHERE `subscriptions`.`user_id` = {user_id}
            ORDER BY `subscriptions`.`createdAt` DESC
            LIMIT {offset}, 10;
      */
  findSampleSubs: (limit, offset, user_id, val1, val2) => {
      return SubscriptionsModel.findAll({
          where: {
              user_id: user_id
          },
          attributes: {exclude: ['id', 'user_id', 'sub_user_id', 'updatedAt']},
          include: [{
             model: UsersModel,
             as: 'user',
             attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
             duplicating: false,
          }, {
              model: UsersModel,
              as: 'sub_user',
              attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
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
              duplicating: false,
          }],
          offset: offset,
          limit: limit,
          order: [['createdAt', 'DESC']]
      })
  },

    /**выборка подписчиков пользователя для автоподгрузки
       SELECT `subscriptions`.`id`,
              `subscriptions`.`createdAt`,
              `user`.`id` AS `user.id`,
              `user`.`name` AS `user.name`,
              `user`.`surname` AS `user.surname`,
              `user`.`avatar_path` AS `user.avatar_path`,
              `user`.`city` AS `user.city`,
              `user`.`age` AS `user.age`,
              `sub_user`.`id` AS `sub_user.id`,
              `sub_user`.`name` AS `sub_user.name`,
              `sub_user`.`surname` AS `sub_user.surname`,
              `sub_user`.`avatar_path` AS `sub_user.avatar_path`,
              `sub_user`.`city` AS `sub_user.city`,
              `sub_user`.`age` AS `sub_user.age`
        FROM `subscriptions` AS `subscriptions`
        INNER JOIN `users` AS `user`
            ON `subscriptions`.`user_id` = `user`.`id`
                AND (`user`.`name` LIKE '%'
                    AND
                   `user`.`surname` LIKE '%')
        LEFT OUTER JOIN `users` AS `sub_user`
            ON `subscriptions`.`sub_user_id` = `sub_user`.`id`
        WHERE `subscriptions`.`sub_user_id` = {sub_user_id}
        ORDER BY `subscriptions`.`createdAt` DESC
        LIMIT {offset}, 10;
     */
  findSampleFollowers: (limit, offset, sub_user_id, val1, val2) => {
        return SubscriptionsModel.findAll({
            where: {
                sub_user_id: sub_user_id
            },
            attributes: {exclude: ['id', 'user_id', 'sub_user_id', 'updatedAt']},
            include: [{
                model: UsersModel,
                as: 'user',
                attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
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
                duplicating: false,
            }, {
                model: UsersModel,
                as: 'sub_user',
                attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
                duplicating: false,
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
    },


    /**запрос подписок для построения запроса ленты новостей
       SELECT `id`,
            `user_id`,
            `sub_user_id`,
            `createdAt`,
            `updatedAt`
        FROM `subscriptions` AS `subscriptions`
        WHERE `subscriptions`.`user_id` = {user_id};
      */
  findSubs: (user_id) => {
      return SubscriptionsModel.findAll({
          where: {
              user_id: user_id
          },
      })
  },

    /** одна подписка (для проверки имеется ли уже подобное сочетание)
       SELECT `id`,
              `user_id`,
              `sub_user_id`,
              `createdAt`,
              `updatedAt`
     FROM `subscriptions` AS `subscriptions`
     WHERE `subscriptions`.`user_id` = {user_id}
        AND `subscriptions`.`sub_user_id` = {sub_user_id};
      */

  findSub: (user_id, sub_user_id) => {
      return SubscriptionsModel.findAll({
            where: {
                user_id: user_id,
                sub_user_id: sub_user_id

      }})
  },


    /**одна подписка с полной информацией о подписчике и подписанном пользователе
      SELECT `subscriptions`.`id`,
             `subscriptions`.`createdAt`,
             `user`.`id` AS `user.id`,
             `user`.`name` AS `user.name`,
             `user`.`surname` AS `user.surname`,
             `user`.`avatar_path` AS `user.avatar_path`,
             `user`.`city` AS `user.city`,
             `user`.`age` AS `user.age`,
             `sub_user`.`id` AS `sub_user.id`,
             `sub_user`.`name` AS `sub_user.name`,
             `sub_user`.`surname` AS `sub_user.surname`,
             `sub_user`.`avatar_path` AS `sub_user.avatar_path`,
             `sub_user`.`city` AS `sub_user.city`,
             `sub_user`.`age` AS `sub_user.age`
     FROM `subscriptions` AS `subscriptions`
     LEFT OUTER JOIN `users` AS `user`
        ON `subscriptions`.`user_id` = `user`.`id`
     LEFT OUTER JOIN `users` AS `sub_user`
        ON `subscriptions`.`sub_user_id` = `sub_user`.`id`
     WHERE `subscriptions`.`user_id` = {user_id}
        AND `subscriptions`.`sub_user_id` = {sub_user_id};
      */
  findSubWithUsers: (user_id, sub_user_id) => {
     return SubscriptionsModel.findAll({
          where: {
              user_id: user_id,
              sub_user_id: sub_user_id
          },
          attributes: {exclude: ['id', 'user_id', 'sub_user_id', 'updatedAt']},
          include: [{
              model: UsersModel,
              as: 'user',
              attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
              duplicating: false,
          }, {
              model: UsersModel,
              as: 'sub_user',
              attributes: ['id', 'name', 'surname', 'avatar_path', 'city', 'age'],
              duplicating: false,
          }],
      })
  },

    /**добавить подписчика
      INSERT INTO `subscriptions` (`id`,`user_id`,`sub_user_id`,`createdAt`,`updatedAt`)
     VALUES (DEFAULT,{user_id},{sub_user_id},{createdAt},{updatedAt});
      */
  addSub: (user_id, sub_user_id) => {
      return SubscriptionsModel.create({
          user_id: user_id,
          sub_user_id: sub_user_id
      })
  },

    /**удалить подписчика
     *  DELETE FROM `subscriptions` WHERE `user_id` = {user_id} AND `sub_user_id` = {sub_user_id}
      */
  deleteSub: (user_id, sub_user_id) => {
      return SubscriptionsModel.destroy({
          where: {
              user_id: user_id,
              sub_user_id: sub_user_id
          }
      })
  },


};

module.exports = Subscriptions;