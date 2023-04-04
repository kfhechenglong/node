const fs = require('fs')

// let data = ''

const stream = fs.createReadStream('./index.js', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./write.js', {encoding: 'utf8'})
// stream.on('data', function (chunk) {
//   // data += chunk;
//   writeStream.write(chunk)
// })
stream.pipe(writeStream)
// stream.on('end', () => {
//   writeStream.end()
//   console.log('read end \r\n')
// })
writeStream.on('finish', () => {
  console.log('write end \r\n')
})
writeStream.on('error', (err) => {
  console.log(err)
})
stream.on('error', (err) => {
  console.log(err)
})

console.log('over \r\n')