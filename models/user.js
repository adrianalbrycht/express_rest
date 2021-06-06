const DataTypes = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        foreignKey: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
});


async function syncTable() {
    await User.sync({force: true});
}

//syncTable().then(() => console.log('Users synced')).catch(err => console.log(err));


module.exports = User;
