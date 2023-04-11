/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-06 18:26:26
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-11 10:49:18
 * @FilePath: \node\koa\index.js
 * @Description: 入口文件
 */
const Koa = require('koa')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')
const auth = require('./middlewares/auth')
// 路由
const siteRoute = require('./routes/site')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const app = new Koa()
app.proxy = true
// 设置签名cookie
app.keys = ['signedKey']

// 定义中间件

// 使用中间件
app.use(bodyParser())
app.use(auth)

render(app, {
  root: './templates',
  layout: 'main',
  viewExt: 'ejs'
})
app.use(siteRoute.routes()).use(siteRoute.allowedMethods())
app.use(userRoute.routes()).use(userRoute.allowedMethods())
app.use(postRoute.routes()).use(postRoute.allowedMethods())
app.listen(3001, () => {
  console.log('listen on 3001')
})
