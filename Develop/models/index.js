const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'comment_id'
});

module.exports = { User, Post, Comment };
