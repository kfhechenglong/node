/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-07 15:46:05
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-10 18:36:14
 * @FilePath: \node\koa\routes\site.js
 * @Description:
 */
const Router = require('koa-router')
const postService = require('./../services/post')

const router = new Router()
/**
 * @return {*}
 * @description: 首页
 */
router.get('/', async (ctx) => {
  const list = postService.list()
  await ctx.render('index', {
    list: list
  })
})

module.exports = router
