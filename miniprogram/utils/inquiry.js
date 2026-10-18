// inquiry.js —— 由 inquiry.ts 编译而来（构建产物）
//
// 当前实现为「本地留存 + 可选云端上报」：
//  1. 用户提交后立即写入本地 Storage，保证弱网与离线也不会丢；
//  2. 若在 config.js 中配置了 cloudEnv 与云函数，会同时上报到云端。

var INQUIRY_TYPES = ['工程采购', '经销代理', '家装零售', '技术咨询', '其他']

var STORAGE_KEY = 'bzr_inquiries'

function listInquiries() {
  var raw = wx.getStorageSync(STORAGE_KEY)
  return Array.isArray(raw) ? raw : []
}

function saveInquiry(data) {
  var item = {
    name: data.name,
    phone: data.phone,
    company: data.company,
    city: data.city,
    type: data.type,
    interest: data.interest,
    message: data.message,
    id: 'inq_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    createdAt: Date.now(),
    synced: false,
  }
  var all = listInquiries()
  all.unshift(item)
  wx.setStorageSync(STORAGE_KEY, all)
  return item
}

function removeInquiry(id) {
  var rest = listInquiries().filter(function (i) {
    return i.id !== id
  })
  wx.setStorageSync(STORAGE_KEY, rest)
  return rest
}

function clearInquiries() {
  wx.removeStorageSync(STORAGE_KEY)
}

function markSynced(id) {
  var all = listInquiries().map(function (i) {
    return i.id === id ? Object.assign({}, i, { synced: true }) : i
  })
  wx.setStorageSync(STORAGE_KEY, all)
}

/**
 * 上报到自有服务器接口（方案 A，当前使用）。
 * 返回 true 表示服务端已确认收到。
 *
 * 接口：POST https://senluoflow.com/mp/inquiry
 * 服务端把留言写入 /opt/mp-inquiry/inquiries.jsonl，企业可直接查看。
 * 不提供读取接口，避免留言中的手机号被公开抓取。
 */
function postInquiry(item, apiUrl) {
  return new Promise(function (resolve) {
    if (!apiUrl || !wx.request) {
      resolve(false)
      return
    }
    wx.request({
      url: apiUrl,
      method: 'POST',
      timeout: 8000,
      header: { 'content-type': 'application/json' },
      data: {
        id: item.id,
        name: item.name,
        phone: item.phone,
        company: item.company,
        city: item.city,
        type: item.type,
        interest: item.interest,
        message: item.message,
      },
      success: function (res) {
        resolve(!!res && res.statusCode >= 200 && res.statusCode < 300)
      },
      fail: function () {
        resolve(false)
      },
    })
  })
}

/** 还没成功上报的留言 */
function pendingInquiries() {
  return listInquiries().filter(function (i) {
    return !i.synced
  })
}

/**
 * 重试上报所有未同步留言（进「我的留言」页时自动触发）。
 * 返回成功条数。
 */
function retryPending(apiUrl) {
  var pending = pendingInquiries()
  if (!pending.length) return Promise.resolve(0)
  var done = 0
  return pending
    .reduce(function (chain, item) {
      return chain.then(function () {
        return postInquiry(item, apiUrl).then(function (ok) {
          if (ok) {
            markSynced(item.id)
            done++
          }
        })
      })
    }, Promise.resolve())
    .then(function () {
      return done
    })
}

/**
 * 上报到微信云开发（可选，仅在配置了 cloudEnv 时使用）。
 * 注意：需要在云开发里自行部署名为 submitInquiry 的云函数。
 */
function reportToCloud(item, cloudEnv) {
  return new Promise(function (resolve) {
    if (!cloudEnv || !wx.cloud) {
      resolve(false)
      return
    }
    try {
      wx.cloud.callFunction({
        name: 'submitInquiry',
        data: item,
        success: function () {
          resolve(true)
        },
        fail: function () {
          resolve(false)
        },
      })
    } catch (e) {
      resolve(false)
    }
  })
}

module.exports = {
  INQUIRY_TYPES,
  listInquiries,
  saveInquiry,
  removeInquiry,
  clearInquiries,
  markSynced,
  postInquiry,
  pendingInquiries,
  retryPending,
  reportToCloud,
}
