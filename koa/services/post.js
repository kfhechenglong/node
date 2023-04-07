const fs = require('fs')
const bluebird = require('bluebird')
// promise化fs
bluebird.promisifyAll(fs)
// 保存文章数据
const posts = []
// 文章id值
const postId = 1

// 发布文章
exports.publish = function (title, content) {
  const item = {
    id: postId++,
    title,
    content,
    time: new Date().toLocaleString()
  }
  posts.push(item)
  return item
}

// 查看文章
exports.show = function (id) {
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i]
    if (item.id === +id) {
      return item
    }
  }
  return null
}
// 编辑文章
exports.updated = function () {}
// 删除文章
