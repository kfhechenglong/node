const Router = require('koa-router')
const userServe = require('./../services/user')
const weiboServe = require('./../services/weibo')
const guard = require('./../middlewares/guard')
const { post } = require('./home')
const router = new Router({ prefix: '/user' })

router.get('/login', async (ctx) => {
  await ctx.render('user/login')
})

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    throw new Error('账户名或密码不能为空！')
  }
  const user = await userServe.login(username, password)
  ctx.cookies.set('userId', user.id, {
    signed: true,
    // 有效期一天24小时
    maxAge: 24 * 3600 * 1000
  })
  await ctx.redirect('/')
})

// 注册
router.get('/register', async (ctx) => {
  await ctx.render('user/register')
})

router.post('/register', async (ctx) => {
  const { username, password, confirmPassword } = ctx.request.body
  if (!username || !password) {
    throw new Error('账户名或密码不能为空！')
  }
  if (!confirmPassword) {
    throw new Error('确认密码不能为空！')
  }
  await userServe.register(username, password)
  // 注册成功，重新调整到登录页
  await ctx.redirect('/user/login')
})
// 退出登录
router.get('/logout', async (ctx) => {
  ctx.cookies.set('userId', null, {
    maxAge: 0
  })
  ctx.redirect('/')
})
// 首页数据
router.get('/home', guard, async (ctx) => {
  const { page = 1, size = 10 } = ctx.query
  const { rows, count } = await weiboServe.listByUser(ctx.state.userId, page, size)
  await ctx.render('user/home', {
    list: rows,
    count,
    page: Number(page),
    size: Number(size)
  })
})
//
router.get('/homepage/:id', async (ctx) => {
  const { page = 1, size = 10 } = ctx.query
  const { rows, count } = await weiboService.listByUser(ctx.params.id, page, size)
  await ctx.render('user/homepage', {
    list: rows,
    count,
    page: Number(page),
    size: Number(size)
  })
})
// 个人信息
router.get('/profile', guard, async (ctx) => {
  const user = await userServe.show(ctx.state.userId)
  await ctx.render('user/profile', {
    user
  })
})
router.post('/profile', guard, async (ctx) => {
  const { nickname, password } = ctx.request.body
  if (!nickname || nickname.length > 20) {
    throw new Error('昵称不合法')
  }
  await userService.changeProfile(ctx.state.userId, nickname, password)
  await ctx.redirect('/user/home')
})
module.exports = router
