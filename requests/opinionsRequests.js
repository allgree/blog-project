const OpinionsModel = require('../models/opinionsModel');
const UsersModel = require('../models/usersModel');

OpinionsModel.belongsTo(UsersModel, {as: 'author', foreignKey: 'user_id'});

let Opinions = {
    //findAll: (callback) => {
    //    OpinionsModel.findAll({
    //        attributes: {exclude: ['id', 'updatedAt']},
    //        include: [{
    //            model: UsersModel,
    //            as: 'author',
    //            attributes: ['id', 'name', 'surname'],
    //            duplicating: false,
    //        }],
    //        order: [['createdAt', 'DESC']],
    //    })
    //        .then(result => callback(result))
    //},

    findSample: (limit, offset, callback) => {
        OpinionsModel.findAll({
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
            .then(result => callback(result))
    }
};

module.exports = Opinions;