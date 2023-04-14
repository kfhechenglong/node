/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-13 19:29:47
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-14 10:13:43
 * @FilePath: \node\demo\services\weibo.js
 * @Description:
 */
const sequelize = require('./../shared/sequelize')
const User = require('./../models/user')(sequelize)
const Weibo = require('./../models/weibo')(sequelize)
const PublishType = require('./../models/weibo').PublishType
/**
 * @param {*} userId
 * @param {*} content
 * @return {*}
 * @description: 发表微博
 */
exports.publish = async function (userId, content) {
  return Weibo.create({
    userId,
    type: PublishType.Self,
    content
  })
}
/**
 * @param {*} userId
 * @param {*} weiboId
 * @param {*} shareContent
 * @return {*}
 * @description: 转发微博
 */
exports.share = async function (userId, weiboId, shareContent) {
  const weibo = await Weibo.findByPk(weiboId)
  if (weibo === null) {
    throw new Error('转发的微博不存在')
  }
  if (weibo.userId === userId) {
    throw new Error('不能转发自己的微博！')
  }

  return sequelize.transaction(async (transaction) => {
    const newWeibo = await Weibo.create(
      {
        userId,
        content: weibo.content,
        shareContent,
        type: PublishType.Share
      },
      { transaction }
    )
    weibo.shareContent++
    await weibo.save({ transaction })
    return newWeibo
  })
}
/**
 * @param {*} id
 * @param {*} withUser
 * @return {*}
 * @description: 查询单条微博
 */
exports.show = async function (id, withUser = false) {
  const options = {}
  if (withUser) {
    options.include = {
      mode: User,
      as: 'user'
    }
  }
  return Weibo.findByPk(id, options)
}
/**
 * @param {number} page 起始页码
 * @param {number} size 每页条数
 * @return 微博列表
 * @description: 查询微博列表
 */
exports.list = async function (page = 1, size = 10) {
  return Weibo.findAndCountAll({
    limit: size,
    offset: (page - 1) * size,
    order: [['id', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
        as: 'user'
      }
    ]
  })
}
/**
 * @param {*} userId
 * @param {*} page
 * @param {*} size
 * @return 已查询到的数据列表
 * @description: 根据用户查询数据列表
 */
exports.listByUser = async function (userId, page = 1, size = 10) {
  return Weibo.findAndCountAll({
    where: { userId },
    limit: size,
    offset: (page - 1) * size,
    order: [['id', 'DESC']]
  })
}
/**
 * @param {*} id
 * @param {*} userId
 * @param {*} content
 * @return {*}
 * @description: 编辑内容
 */
exports.update = async function (id, userId, content) {
  const weibo = await Weibo.findByPk(id)
  if (weibo === null || weibo.userId !== userId) {
    throw new Error('无权编辑该微博')
  }
  if (weibo.type !== PublishType.Self) {
    throw new Error('只能编辑自己发布的微博')
  }
  weibo.content = content
  return weibo.save()
}
/**
 * @param {*} id
 * @param {*} userId
 * @return {*}
 * @description: 删除内容
 */
exports.destroy = async function (id, userId) {
  const weibo = await Weibo.findByPk(id)
  if (weibo === null || weibo.userId !== userId) {
    throw new Error('你无权删除该微博！')
  }
  return weibo.destroy()
}
