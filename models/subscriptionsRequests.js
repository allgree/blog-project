const SubscriptionsModel = require('./subscriptionsModel');

let Subscriptions = {
  findSampleSubs: (limit, offset, user_id, callback) => {
      SubscriptionsModel.findAll({
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

  findSampleSubscribes: (limit, offset, sub_user_id, callback) => {
      SubscriptionsModel.findAll({
          where: {
              sub_user_id: sub_user_id
          },
          offset: offset,
          limit: limit,
          order: [['createdAt', 'DESC']]
      })
          .then(result => {
              callback(result);
          })
  }
};

module.exports = Subscriptions;