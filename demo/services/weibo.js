/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-13 19:29:47
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-13 19:31:38
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
