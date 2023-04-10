const Router = require('koa-router')
const postService = require('./../services/post')
const router = new Router()

// 访问发布页面
router.get('/publish', async (ctx) => {
  await ctx.render('publish')
})
/**
 * @return {*}
 * @description: 发布表单内容
 */
router.post('/publish', async (ctx) => {
  const data = ctx.request.body
  if (!data.title || !data.content) {
    ctx.throw(400, '参数错误！')
  }
  const item = postService.publish(data.title, data.content)
  ctx.redirect(`/post/${item.id}`)
})
/**
 * @return {*}
 * @description:文章详情页
 */
router.get('/post/:postId', async (ctx) => {
  const post = postService.show(ctx.params.postId)
  if (!post) {
    ctx.throw(404, '文章不存在！')
  }
  await ctx.render('post', {
    post
  })
})
/**
 * @return {*}
 * @description: 编辑文章详情页
 */
router.get('/update/:postId', async (ctx) => {
  const post = postService.show(ctx.params.postId)
  if (!post) {
    ctx.throw(404, '文章不存在！')
  }
  await ctx.render('update', {
    post
  })
})
/**
 * @return {*}
 * @description: 更新编辑内容
 */
router.post('/update/:postId', async (ctx) => {
  const data = ctx.request.body
  if (!data.title || !data.content) {
    ctx.throw(400, '请求参数错误！')
  }
  const postId = ctx.params.postId
  postService.updated(postId, data.title, data.content)
  ctx.redirect(`/post/${postId}`)
})
router.get('/delete/:postId', async (ctx) => {
  postService.delete(ctx.params.postId)
  ctx.redirect('/')
})
module.exports = router
