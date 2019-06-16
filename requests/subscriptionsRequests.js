const SubscriptionsModel = require('../models/subscriptionsModel');
const UsersModel = require('../models/usersModel');

const Sequelize = require('sequelize');
const {Op} = Sequelize;
SubscriptionsModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});
SubscriptionsModel.belongsTo(UsersModel, {as: 'sub_user', foreignKey: 'sub_user_id'});

let Subscriptions = {
    // выборка подписок пользователя для автоподгрузки
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

    // выборка подписчиков пользователя для автоподгрузки
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


  // запрос подписок для построения запроса ленты новостей
  findSubs: (user_id) => {
      return SubscriptionsModel.findAll({
          where: {
              user_id: user_id
          },
      })
  },

    // одна подписка
  findSub: (user_id, sub_user_id) => {
      return SubscriptionsModel.findAll({
            where: {
                user_id: user_id,
                sub_user_id: sub_user_id

      }})
  },


  // одна подписка с полной информацией о подписчике и подписанном пользователе
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

    // добавить подписчика
  addSub: (user_id, sub_user_id) => {
      return SubscriptionsModel.create({
          user_id: user_id,
          sub_user_id: sub_user_id
      })
  },

    // удалить подписчика
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