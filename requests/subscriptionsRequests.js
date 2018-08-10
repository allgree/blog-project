const SubscriptionsModel = require('../models/subscriptionsModel');
const UsersModel = require('../models/usersModel');

const Sequelize = require('sequelize');

SubscriptionsModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});
SubscriptionsModel.belongsTo(UsersModel, {as: 'sub_user', foreignKey: 'sub_user_id'});

let Subscriptions = {
    // выборка подписок пользователя для автоподгрузки
  findSampleSubs: (limit, offset, user_id, val1, val2, callback) => {
      SubscriptionsModel.findAll({
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
                  {[Sequelize.Op.and]: [
                          {name: {[Sequelize.Op.like]: `${val1}%`}},
                          {surname: {[Sequelize.Op.like]: `${val2}%`}}
                      ]}
                  :
                  {[Sequelize.Op.or]: [
                          {name: {[Sequelize.Op.like]: `${val1}%`}},
                          {surname: {[Sequelize.Op.like]: `${val1}%`}}
                      ]},
              duplicating: false,
          }],
          offset: offset,
          limit: limit,
          order: [['createdAt', 'DESC']]
      })
          .then(result => callback(result))
  },

    // выборка подписчиков пользователя для автоподгрузки
  findSampleFollowers: (limit, offset, sub_user_id, val1, val2, callback) => {
        SubscriptionsModel.findAll({
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
                    {[Sequelize.Op.and]: [
                            {name: {[Sequelize.Op.like]: `${val1}%`}},
                            {surname: {[Sequelize.Op.like]: `${val2}%`}}
                        ]}
                    :
                    {[Sequelize.Op.or]: [
                            {name: {[Sequelize.Op.like]: `${val1}%`}},
                            {surname: {[Sequelize.Op.like]: `${val1}%`}}
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
            .then(result => callback(result))
    },


    // запрос подписок для построения запроса ленты новостей
    findSubs: (user_id, callback) => {
        SubscriptionsModel.findAll({
            where: {
                user_id: user_id
            },
        })
            .then(result => callback(result))
    },

    // одна подписка
  findSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.findAll({
            where: {
                user_id: user_id,
                sub_user_id: sub_user_id

      }})
          .then(result => callback(result))
      },


    // одна подписка с полной информацией о подписанных пользователях
    findSubWithUsers: (user_id, sub_user_id, callback) => {
        SubscriptionsModel.findAll({
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
            .then(result => callback(result))
    },

    // добавить подписчика
  addSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.create({
          user_id: user_id,
          sub_user_id: sub_user_id
      })
          .then(result => {
              callback(result);
          })
  },

    // удалить подписчика
  deleteSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.destroy({
          where: {
              user_id: user_id,
              sub_user_id: sub_user_id
          }
      })
          .then(result => callback(result))
  },


};

module.exports = Subscriptions;