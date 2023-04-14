/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-14 10:21:38
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-14 10:55:43
 * @FilePath: \node\demo\services\comment.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const sequelize = require('./../shared/sequelize')
const weiboService = require('./../services/weibo')
const User = require('./../models/user')(sequelize)
const Comment = require('./../models/comment')(sequelize)
/**
 * @param {*} weiboId
 * @param {*} userId
 * @param {*} content
 * @return {*}
 * @description: 发布评论
 */
exports.publish = async function (weiboId, userId, content) {
  const weibo = await weiboService.show(weiboId)
  if (weibo === null) {
    throw new Error('内容不存在')
  }
  return Comment.create({
    content,
    weiboId,
    userId
  })
}
// 删除评论
exports.destroy = async function (commentId, userId) {
  const comment = await Comment.findByPk(commentId)
  if (comment === null || comment.userId !== userId) {
    throw new Error('你无权删除该评论')
  }
  return comment.destroy()
}
// 查看评论列表
exports.listByWeibo = async function (weiboId, page, size) {
  return Comment.findAndCountAll({
    where: { weiboId },
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
        as: 'user'
      }
    ],
    offset: (page - 1) * size,
    limit: size,
    order: [['id', 'DESC']]
  })
}
