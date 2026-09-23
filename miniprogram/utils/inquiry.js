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
 * 上报到微信云开发（可选）。返回 true 表示上报成功。
 * 启用步骤见 README「接入云开发」。
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
  reportToCloud,
}
