export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

/** 相对时间：刚刚 / n 分钟前 / n 小时前 / n 天前 / 完整日期 */
export const fromNow = (ts: number) => {
  const diff = Date.now() - ts
  const min = 60 * 1000
  const hour = 60 * min
  const day = 24 * hour

  if (diff < min) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / min)} 分钟前`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < 7 * day) return `${Math.floor(diff / day)} 天前`
  return formatTime(new Date(ts))
}

/** 中国大陆手机号校验 */
export const isPhone = (v: string) => /^1[3-9]\d{9}$/.test((v || '').trim())

/** 去掉首尾空白 */
export const trim = (v: string) => (v || '').replace(/^\s+|\s+$/g, '')
