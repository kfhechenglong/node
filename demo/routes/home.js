/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-14 11:14:01
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-14 11:18:39
 * @FilePath: \node\demo\routes\home.js
 * @Description: 首页
 */
const Router = require('koa-router')
const weiboSerive = require('./../services/weibo')
const router = new Router()
router.get('/', async (ctx) => {
  let { page = 1, size = 10 } = ctx.query
  page = Number(page)
  size = Number(size)
  const { rows, count } = await weiboSerive.list(page, size)
  await ctx.render('home', {
    list: rows,
    count,
    page: page,
    size: size
  })
})

module.exports = router
