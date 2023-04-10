/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-07 15:47:35
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-10 17:28:20
 * @FilePath: \node\koa\services\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
