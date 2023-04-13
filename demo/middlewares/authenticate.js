/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 17:04:31
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-12 17:05:48
 * @FilePath: \node\demo\middlewares\authenticate.js
 * @Description: 鉴权，读取cookie
 */
module.exports = async function (ctx, next) {
  ctx.state.userId = Number(
    ctx.cookies.get('userId', {
      signed: true
    })
  )
  next()
}
