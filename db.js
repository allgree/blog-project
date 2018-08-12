const Sequelize = require('sequelize');
let config = {
    db: {
        host: 'localhost',
        database: 'blog_project',
        user: 'root',
        password: '',
        dialect: 'mysql'
    }
};

const seq = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect
});

module.exports = seq;