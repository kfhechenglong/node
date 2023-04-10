/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-07 15:46:57
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-10 11:35:50
 * @FilePath: \node\koa\services\post.js
 * @Description: 文章业务
 */
const fs = require('fs')
const bluebird = require('bluebird')
// promise化fs
bluebird.promisifyAll(fs)
// 保存文章数据
const posts = []
// 文章id值
const postId = 1

/**
 * @param {*} title
 * @param {*} content
 * @return {*}
 * @description: 发布文章
 */
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
/**
 * @param {*} id
 * @return {*}
 * @description:查询文章
 */
exports.show = function (id) {
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i]
    if (item.id === +id) {
      return item
    }
  }
  return null
}
/**
 * @param {*} id
 * @param {*} title
 * @param {*} content
 * @return {*}
 * @description: 编辑文章
 */
exports.updated = function (id, title, content) {
  posts.forEach((item) => {
    if (item.id === +id) {
      item.title = title
      item.content = content
    }
  })
}
/**
 * @param {*} id
 * @return {*}
 * @description: 删除文章
 */
exports.delete = function (id) {
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i]
    if (item.id === +id) {
      posts.splice(i, 1)
      break
    }
  }
}
/**
 * @return {*}
 * @description: 文章列表
 */
exports.list = function () {
  return posts.map((item) => item)
}
