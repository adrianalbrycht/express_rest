const DataTypes = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    lead: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    }
});


async function syncTable() {
    await Post.sync({force: true});
}

//syncTable().then(() => console.log('Posts synced')).catch(err => console.log(err));


module.exports = Post;
