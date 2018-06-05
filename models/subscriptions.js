const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('subscriptions', {
   id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
   },
   user_id: Sequelize.INTEGER,
   sub_user_id: Sequelize.INTEGER,
   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE
});

let Subscriptions = {
  findSampleSubs: (limit, offset, user_id, callback) => {
      model.findAll({
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
  addSub: (user_id, sub_user_id, callback) => {
      model.create({
          user_id: user_id,
          sub_user_id: sub_user_id
      })
          .then(result => {
              callback(result);
          })
  },
  deleteSub: (user_id, sub_user_id, callback) => {
      model.destroy({
          where: {
              user_id: user_id,
              sub_user_id: sub_user_id
          }
      })
          .then(result => {
              callback(result);
          })
  }
};

module.exports = Subscriptions;