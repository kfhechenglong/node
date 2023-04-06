const express = require('express')
const app = express()

app.set('views', './templates')
app.set('view engine', 'ejs')

app.get('/', (req, resp) => {
  const list = [
    {
      id: 123,
      name: 'zhangsan'
    },
    {
      id: 456,
      name: '李四'
    }
  ]
  resp.render('index', {
    title: 'ejs',
    content: '首页 home',
    users: list,
    show: true
  })
})
const port = 9001
app.listen(port, () => {
  console.log('listen port ' + port)
})
