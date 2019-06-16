const TokensModel = require('../models/tokensModel');

let Tokens = {
 // найти токен
  findByToken: (token) => {
      return TokensModel.findOne({
            where: {
                token: token
            }
        })
  },
    // обновить токен по id пользователя
  updateByUserId: (user_id, token) => {
      return TokensModel.update({
          token: token
      }, {
          where: {
              user_id: user_id
          }
      })
  },
    // добавить строку с id пользователя
  addUserId: (user_id) => {
      return TokensModel.create({
          user_id: user_id
      })
  }
};

module.exports = Tokens;