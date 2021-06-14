const DataTypes = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
});


async function syncTable() {
    await User.sync({force: true});
}

//syncTable().then(() => console.log('Users synced')).catch(err => console.log(err));


module.exports = User;
