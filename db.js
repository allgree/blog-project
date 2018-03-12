const Sequelize = require('sequelize');
const config = require('./config.js');

const seq = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

module.exports = seq;