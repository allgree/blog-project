const OpinionsModel = require('../models/opinionsModel');
const UsersModel = require('../models/usersModel');

OpinionsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});

let Opinions = {

    /**выборка отзывов для автоподгрузки
       SELECT `opinions`.`id`,
              `opinions`.`name`,
              `opinions`.`user_id`,
              `opinions`.`body`,
              `opinions`.`createdAt`,
              `author`.`id` AS `author.id`,
              `author`.`name` AS `author.name`,
              `author`.`surname` AS `author.surname`
            FROM `opinions` AS `opinions`
            LEFT OUTER JOIN `users` AS `author`
                ON `opinions`.`user_id` = `author`.`id`
            ORDER BY `opinions`.`createdAt` DESC
            LIMIT {offset}, 10;
     */
    findSample: (limit, offset) => {
        return OpinionsModel.findAll({
            attributes: {exclude: ['id', 'updatedAt']},
            include: [{
                model: UsersModel,
                as: 'author',
                attributes: ['id', 'name', 'surname'],
                duplicating: false,
            }],
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
        })
    },

    /**добавить отзыв
     * INSERT INTO `opinions` (`id`,`name`,`user_id`,`body`,`createdAt`,`updatedAt`)
     *     VALUES (DEFAULT,{name},{user_id},{body},{createdAt},{updatedAt});
      */
    add: (name, user_id, body) => {
        return OpinionsModel.create({
            name: name || null,
            user_id: user_id || null,
            body: body
        })
    }


};

module.exports = Opinions;