const sequelize = require('./shared/sequelize')

sequelize.import('./models/comment.js')
sequelize.import('./models/user.js')
sequelize.import('./models/weibo.js')
sequelize
  .sync({ force: true })
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    sequelize.close()
  })
