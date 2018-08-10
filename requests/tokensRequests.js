const TokensModel = require('../models/tokensModel');

let Tokens = {
 // найти токен
  findByToken: (token, callback) => {
      TokensModel.findOne({
            where: {
                token: token
            }
        })
            .then(result => callback(result))
  },
    // обновить токен по id пользователя
  updateByUserId: (user_id, token, callback) => {
      TokensModel.update({
          token: token
      }, {
          where: {
              user_id: user_id
          }
      })
          .then(result => callback(result))
  },
    // добавить строку с id пользователя
  addUserId: (user_id, callback) => {
      TokensModel.create({
          user_id: user_id
      })
          .then(result => callback(result))
  }
};

module.exports = Tokens;