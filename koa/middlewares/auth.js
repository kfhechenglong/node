/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-07 15:45:39
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-11 10:57:47
 * @FilePath: \node\koa\middlewares\auth.js
 * @Description: 权限认证中间件
 */
module.exports = async function (ctx, next) {
  // 获取cookies
  const logged = ctx.cookies.get('logged', {
    signed: true
  })
  ctx.state.logged = !!logged
  await next()
}
