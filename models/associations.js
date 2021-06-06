const User = require('./user')
const Post = require('./post')

// User.hasMany(Post, {as: "pubs", foreignKey: "authorId"});
// Post.belongsTo(User, {as: "author"});

// User.hasMany(Post, { foreignKey: "authorId", sourceKey: "id"});
// Post.belongsTo(User, { foreignKey: 'authorId', targetKey: "id"});

// User.hasMany(Post, {foreignKey: true});
// Post.belongsTo(User);
