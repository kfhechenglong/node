/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 17:12:36
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-12 17:13:47
 * @FilePath: \node\demo\middlewares\guard.js
 * @Description: 登录权限
 */
module.exports = async function (ctx, next) {
  if (!ctx.state.userId) {
    await ctx.redirect('/user/login')
    return
  }
  await next()
}
