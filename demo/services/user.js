/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-13 10:59:24
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-13 19:28:57
 * @FilePath: \node\demo\services\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const sequelize = require('./../shared/sequelize')
const User = require('./../models/user')(sequelize)
/**
 * @param {*} usernmae
 * @param {*} password
 * @return {*}
 * @description: 注册账户
 */
exports.register = async function (usernmae, password) {
  const user = await User.findOne({
    where: { usernmae }
  })
  if (user !== null) {
    throw new Error('相同的账号已存在！')
  }
  return User.create({
    usernmae,
    password
  })
}
/**
 * @param {*} username
 * @param {*} password
 * @return {*}
 * @description: 用户登录
 */
exports.login = async function username(username, password) {
  const user = await User.findOne({
    where: { username }
  })
  if (user === null || !user.checkPassword(password)) {
    throw new Error('账号或密码错误！')
  }
  return user
}

exports.show = function (userId) {
  return User.findByPk(userId, {
    attributes: ['id', 'nickname', 'weibo_count']
  })
}

exports.changeProfile = function (userId, nickname, password) {
  return User.update(
    { nickname, password: password || '' },
    {
      where: {
        id: userId
      },
      individualHooks: true
    }
  )
}
