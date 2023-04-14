const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Weibo = sequelize.import('./weibo.js')
  const User = sequelize.import('./user.js')
  class Comment extends Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: '评论内容'
      }
    },
    {
      sequelize: sequelize,
      tableName: 'comment',
      underscored: true,
      paranoid: true
    }
  )
  Comment.belongsTo(Weibo, {
    constraints: false,
    foreignKey: 'weiboId'
  })
  Comment.belongsTo(User, {
    constraints: false,
    foreignKey: 'userId',
    as: 'user'
  })
  Comment.afterCreate(async (comment) => {
    await User.increment({ commentCount: 1 }, { where: { id: comment.userId } })
  })
  Comment.afterDestroy(async (comment) => {
    await User.increment({ commentCount: -1 }, { where: { id: comment.userId } })
  })
  return Comment
}
