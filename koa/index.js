const Koa = require('koa')
const app = new Koa()
app.proxy = true
// 设置签名cookie
app.keys = ['signedKey']

// 定义中间件

async function middleware1(ctx, next) {
  console.log('中间件middleware1被调用--开始')
  await next()
  console.log('中间件middleware1被调用--结束')
}
async function logger(ctx, next) {
  const startTime = Date.now()
  await next()
  console.log(Date.now() - startTime)
}
// 使用中间件
app.use(logger)
app.use(middleware1)

app.use(async (cxt) => {
  console.log('router in', cxt.path)
  cxt.set('x-version', '1.0.0')
  // 设置cookies
  cxt.cookies.set('logged', 1, {
    signed: true,
    httpOnly: true,
    maxAge: 3600 * 1000 * 24
  })
  // 获取cookies
  const logged = cxt.cookies.get('logged', {
    signed: true
  })
  cxt.body = {
    method: cxt.method,
    path: cxt.path,
    url: cxt.url,
    query: cxt.query,
    // headers: cxt.headers,
    ip: cxt.ip,
    cookies: logged
  }
})

app.listen(3001, () => {
  console.log('listen on 3001')
})
