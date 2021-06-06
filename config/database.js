const Sequelize = require('sequelize').Sequelize;
const db_conf = require('./dbconfig');

const sequelize = new Sequelize(db_conf.database, db_conf.user, db_conf.password, {
    host: db_conf.server,
    dialect: 'mssql',
    dialectOptions: {
        useUTC: false
    },
    timezone: '+02:00'

});

module.exports = sequelize;
