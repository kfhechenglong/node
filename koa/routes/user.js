const Router = require('koa-router')
const userService = require('./../services/user')
const router = new Router()

router.get('/login', async (ctx) => {
  await ctx.render('login')
})

router.post('/login', async (ctx) => {
  const data = ctx.request.body
  if (!data.username || !data.password) {
    ctx.throw(400, '请求参数错误！')
  }
  const logged = userService.login(data.username, data.password)
  if (!logged) {
    ctx.throw(400, '账号或密码错误！')
  }
  ctx.cookies.set('logged', 1, {
    signed: true,
    httpOnly: true
  })

  ctx.redirect('/', '登录成功')
})

router.get('/logout', async (ctx) => {
  ctx.cookies.set('logged', 0, {
    maxAge: -1,
    signed: true
  })
  ctx.redirect('/', '退出登录')
})
module.exports = router
