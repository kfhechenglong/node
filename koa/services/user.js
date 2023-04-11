/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-07 15:47:35
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-11 11:02:00
 * @FilePath: \node\koa\services\user.js
 * @Description: 用户登录
const user = {
  admin: 123456
}
/**
 * @param {*} username
 * @param {*} password
 * @return {*}
 * @description: 检查用户登录
 */
exports.login = function (username, password) {
  if (user[username] === undefined) {
    return false
  }
  return user[username] === +password
}
