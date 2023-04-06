const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set('views', './templates')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
const messages = []

app.get('/', (req, resp) => {
  resp.render('index', {
    messages
  })
})

app
  .route('/publish')
  .get((req, resq) => {
    resq.render('publish')
  })
  .post((req, resp) => {
    const name = req.body.name
    const content = req.body.content
    console.log(req.body)
    console.log(name)
    console.log(content)
    if (!name || !content) {
      throw new Error('请填写完整的信息内容！')
    }
    const now = new Date().toLocaleString()
    messages.push({
      name,
      content,
      time: now
    })
    resp.redirect('/')
  })

const port = 9001
app.listen(port, () => {
  console.log('listen port ' + port)
})
