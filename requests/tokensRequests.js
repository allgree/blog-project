const TokensModel = require('../models/tokensModel');

let Tokens = {
  findByUserId: (user_id, callback) => {
      TokensModel.findOne({
          where: {
              user_id: user_id
          }
      })
          .then(result => {
              callback(result);
      })
  },
  findByToken: (token, callback) => {
      TokensModel.findOne({
            where: {
                token: token
            }
        })
            .then(result => {
                callback(result);
            })
  },
  updateByUserId: (user_id, token, callback) => {
      TokensModel.update({
          token: token
      }, {
          where: {
              user_id: user_id
          }
      })
          .then(result => {callback(result)})
  },
  addUserId: (user_id, callback) => {
      TokensModel.create({
          user_id: user_id
      })
          .then(result => {
              callback(result);
          })
  }
};

module.exports = Tokens;