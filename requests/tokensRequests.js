const TokensModel = require('../models/tokensModel');

let Tokens = {
    /**найти токен
       SELECT `id`,
              `user_id`,
              `token`
        FROM `tokens` AS `tokens`
        WHERE `tokens`.`token` = {token}
        LIMIT 1;
      */
  findByToken: (token) => {
      return TokensModel.findOne({
            where: {
                token: token
            }
        })
  },

    /**обновить токен по id пользователя
       UPDATE `tokens`
        SET `token`={token}
        WHERE `user_id` = {user_id}
      */

  updateByUserId: (user_id, token) => {
      return TokensModel.update({
          token: token
      }, {
          where: {
              user_id: user_id
          }
      })
  },
    /**добавить строку с id пользователя
     * INSERT INTO `tokens` (`id`,`user_id`) VALUES (DEFAULT,{user_id});
      */
  addUserId: (user_id) => {
      return TokensModel.create({
          user_id: user_id
      })
  }
};

module.exports = Tokens;