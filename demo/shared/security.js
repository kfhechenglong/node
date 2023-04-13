/*
 * @Author: hechenglong kfhechenglong@126.com
 * @Date: 2023-04-12 16:34:41
 * @LastEditors: hechenglong kfhechenglong@126.com
 * @LastEditTime: 2023-04-12 16:36:57
 * @FilePath: \node\demo\shared\security.js
 * @Description: 安全加密
 */
const crypto = require('crypto')
/**
 * @param {*} data
 * @return {*}
 * @description: sha256加密
 */
exports.sha256 = function (data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}
