const fs = require('fs')
const http = require('https');

const req = http.request('https://profile-avatar.csdnimg.cn/f8f1ee593b864d8694e94a99e41e628e_m0_73063590.jpg!1', (response) => {
  console.log(response.statusMessage)
  response.pipe(fs.createWriteStream('./logo.jpg'))
})

req.end()