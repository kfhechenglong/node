const Router = require('koa-router')
const postService = require('./../services/post')
const router = new Router()

// 访问发布页面
router.get('/publish', async (ctx) => {
  await ctx.render('publish')
})
// 发布表单内容

router.post('/publish', async (ctx) => {
  const data = ctx.request.body
  if (!data.title || !data.content) {
    ctx.throw(400, '参数错误！')
  }
  const item = postService.publish(data.title, data.content)
  ctx.redirect(`/post/${item.id}`)
})
