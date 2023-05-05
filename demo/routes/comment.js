/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-14 11:09:16
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-14 11:13:19
 * @FilePath: \node\demo\routes\comment.js
 * @Description: 删除评论
 */
const Router = require('koa-router')
const commentSerive = require('./../services/comment')
const guard = require('./../middlewares/guard')
const router = new Router({ prefix: '/comment' })
router.get('/delete/:id', guard, async (ctx) => {
  const userId = ctx.state.userId
  await commentSerive.destroy(ctx.params.id, userId)
  await ctx.redirect('back')
})

module.exports = router
