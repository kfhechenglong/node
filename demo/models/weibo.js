/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 17:18:45
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-13 10:44:12
 * @FilePath: \node\demo\models\weibo.js
 * @Description:
 */
const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  const User = sequelize.import('./user.js')
  class Weibo extends Model {}

  Weibo.init(
    {
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '发布类型'
      },
      content: {
        type: DataTypes.STRING(140),
        allowNull: false,
        comment: '微博内容'
      },
      shareContent: {
        type: DataTypes.STRING(140),
        comment: '转发语'
      },
      praiseCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '点赞数'
      },
      commentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '评论数'
      },
      shareCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '转发数'
      }
    },
    {
      sequelize: sequelize,
      tableName: 'weibo',
      underscored: true,
      paranoid: true
    }
  )

  Weibo.belongsTo(User, {
    constraints: false,
    foreignKey: 'userId',
    as: 'user'
  })

  Weibo.afterCreate(async (weibo) => {
    await User.increment({ weiboCount: 1 }, { where: { id: weibo.userId } })
  })
  Weibo.afterDestroy(async (weibo) => {
    await User.increment({ weiboCount: -1 }, { where: { id: weibo.userId } })
  })
  return Weibo
}

module.exports.PublishType = {
  Self: 1, // 自己发布
  Share: 2 // 转发分享
}
