/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 16:27:16
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-05-05 17:07:31
 * @FilePath: \node\demo\index.js
 * @Description: index
 */
const Koa = require('koa')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')
const staticMiddleware = require('koa-static')
const errorHandler = require('./middlewares/errorHandler')
const authenticate = require('./middlewares/authenticate')
const homeRoute = require('./routes/home')
const userRoute = require('./routes/user')
const weiboRoute = require('./routes/weibo')
const commentRoute = require('./routes/comment')

const app = new Koa({
  keys: ['KGJ6NLxqOkYCNr1h']
})

// 中间件
app.use(errorHandler)
render(app, {
  // 使用ejs中间件
  root: './templates', // 模板目录
  layout: 'layout', // 关闭模板布局
  viewExt: 'ejs'
})
app.use(staticMiddleware(__dirname + '/public'))
app.use(bodyParser())
app.use(authenticate)
// 路由
app.use(homeRoute.routes()).use(homeRoute.allowedMethods())
app.use(userRoute.routes()).use(userRoute.allowedMethods())
app.use(weiboRoute.routes()).use(weiboRoute.allowedMethods())
app.use(commentRoute.routes()).use(commentRoute.allowedMethods())

app.listen(8090, () => {
  console.log('listen on 8090')
})
