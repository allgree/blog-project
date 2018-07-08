const SubscriptionsModel = require('./subscriptionsModel');
const UsersModel = require('./usersModel');

SubscriptionsModel.belongsTo(UsersModel, {as: 'user', foreignKey: 'user_id'});
SubscriptionsModel.belongsTo(UsersModel, {as: 'sub_user', foreignKey: 'sub_user_id'});

let Subscriptions = {
  findSampleSubs: (limit, offset, user_id, callback) => {
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
              duplicating: false,
          }],
          offset: offset,
          limit: limit,
          order: [['createdAt', 'DESC']]
      })
          .then(result => {
              callback(result);
          })
  },

  findSampleSubscribes: (limit, offset, sub_user_id, callback) => {
        SubscriptionsModel.findAll({
            where: {
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
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']]
        })
            .then(result => {
                callback(result);
            })
    },

  findSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.findAll({
            where: {
                user_id: user_id,
                sub_user_id: sub_user_id
            }
        })
            .then(result => {
                callback(result);
            })
  },

  addSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.create({
          user_id: user_id,
          sub_user_id: sub_user_id
      })
          .then(result => {
              callback(result);
          })
  },
  deleteSub: (user_id, sub_user_id, callback) => {
      SubscriptionsModel.destroy({
          where: {
              user_id: user_id,
              sub_user_id: sub_user_id
          }
      })
          .then(result => {
              callback(result);
          })
  },


};

module.exports = Subscriptions;