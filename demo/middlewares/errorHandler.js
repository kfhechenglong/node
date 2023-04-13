/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 17:10:42
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-12 17:11:53
 * @FilePath: \node\demo\middlewares\errorHandler.js
 * @Description: 错误处理
 */
module.exports = async function (ctx, next) {
  try {
    await next()
  } catch (error) {
    await ctx.render('error', {
      error: error.message,
      title: '错误'
    })
  }
}
