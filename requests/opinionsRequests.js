const OpinionsModel = require('../models/opinionsModel');
const UsersModel = require('../models/usersModel');

OpinionsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});

let Opinions = {

    // выборка отзывов для автоподгрузки
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

    // добавить отзыв
    add: (name, user_id, body) => {
        return OpinionsModel.create({
            name: name || null,
            user_id: user_id || null,
            body: body
        })
    }


};

module.exports = Opinions;