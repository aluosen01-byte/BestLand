// util.js —— 由 util.ts 编译而来（构建产物）
var formatNumber = function (n) {
  var s = n.toString()
  return s[1] ? s : '0' + s
}

var formatTime = function (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/** 相对时间：刚刚 / n 分钟前 / n 小时前 / n 天前 / 完整日期 */
var fromNow = function (ts) {
  var diff = Date.now() - ts
  var min = 60 * 1000
  var hour = 60 * min
  var day = 24 * hour

  if (diff < min) return '刚刚'
  if (diff < hour) return Math.floor(diff / min) + ' 分钟前'
  if (diff < day) return Math.floor(diff / hour) + ' 小时前'
  if (diff < 7 * day) return Math.floor(diff / day) + ' 天前'
  return formatTime(new Date(ts))
}

/** 中国大陆手机号校验 */
var isPhone = function (v) {
  return /^1[3-9]\d{9}$/.test((v || '').trim())
}

/** 去掉首尾空白 */
var trim = function (v) {
  return (v || '').replace(/^\s+|\s+$/g, '')
}

module.exports = { formatTime, fromNow, isPhone, trim }
