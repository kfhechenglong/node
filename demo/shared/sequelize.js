/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 16:38:00
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-13 10:57:34
 * @FilePath: \node\demo\shared\sequelize.js
 * @Description: sequelize
 */
const { Sequelize } = require('sequelize')

module.exports = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'he19880828',
  database: 'weibo'
})
