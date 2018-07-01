const UsersModel = require('./usersModel');

let Users = {
    findAll: (callback) => {
        UsersModel.findAll({
            attributes: ['id', 'name', 'surname', 'city', 'age', 'site', 'email', 'avatar_path']
        })
            .then(result => {
                callback(result);
            })
    },
    findSample: (limit, offset, callback) => {
        UsersModel.findAll({
            offset: offset,
            limit: limit
        })
            .then(result => {
                callback(result)
            })
    },
    findUserById: (user_id, callback) => {
        UsersModel.findOne({
            attributes: ['id', 'name', 'surname', 'city', 'age', 'site', 'email', 'avatar_path'],
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    findById: (user_id, callback) => {
        UsersModel.findOne({
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result);
            })
    },
    findByLogin: (login, callback) => {
        UsersModel.findOne({
            where: {
                login: login
            }
        })
            .then(result => {
                callback(result);
            })
    },
    register: (user, avatar, password, callback) => {
        UsersModel.create({
            login: user.login,
            password: password,
            name: user.name,
            surname: user.surname,
            avatar_path: avatar,
            city: user.city,
            site: user.site,
            email: user.email
        })
            .then(result => {
                callback(result);
            })
    },
    editProfile: (profile, callback) => {
        UsersModel.update({
            login: profile.login,
            name: profile.name,
            surname: profile.surname,
            city: profile.city,
            site: profile.site,
            email: profile.email
        }, {
            where: {
                id: profile.id
            }
        })
            .then(result => {
                callback(result)
            })
    },
    editPass: (user_id, password, callback) => {
        UsersModel.update({
            password: password
        }, {
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result)
            })
    },
    editAvatar: (user_id, avatar_path, callback) => {
        UsersModel.update({
            avatar_path: avatar_path
        }, {
            where: {
                id: user_id
            }
        })
            .then(result => {
                callback(result)
            })
    }

};

module.exports = Users;