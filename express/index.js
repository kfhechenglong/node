const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json(req.headers)
})
const port = 9001
app.listen(port, () => {
  console.log('listen port ' + port)
})
