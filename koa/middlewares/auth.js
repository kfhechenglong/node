// 权限认证中间件
module.exports = async function (ctx, next) {
  // 获取cookies
  const logged = ctx.cookies.get('logged', {
    signed: true
  })
  ctx.state.logged = !!logged
  await next()
}
