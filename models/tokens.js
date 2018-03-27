const Sequelize = require('sequelize');
const db = require('../db');

const model = db.define('tokens', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: Sequelize.INTEGER,
    token: Sequelize.TEXT
}, {
    timestamps: false
});

let Tokens = {
  findByUserId: (user_id, callback) => {
      model.findOne({
          where: {
              user_id: user_id
          }
      })
          .then(result => {
              callback(result);
      })
  },
  updateByUserId: (user_id, token, callback) => {
      model.update({
          token: token
      }, {
          where: {
              user_id: user_id
          }
      })
          .then(result => {callback(result)})
  },
  addUserId: (user_id, callback) => {
      model.create({
          user_id: user_id
      })
          .then(result => {
              callback(result);
          })
  }
};

module.exports = Tokens;