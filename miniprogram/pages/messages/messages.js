// messages.js —— 由 messages.ts 编译而来（构建产物）｜我的留言
const { SITE } = require('../../data/site')
const { APP_CONFIG } = require('../../config')
const { listInquiries, removeInquiry, clearInquiries } = require('../../utils/inquiry')
const { fromNow } = require('../../utils/util')

function decorate(list) {
  return list.map(function (i) {
    return Object.assign({}, i, { timeText: fromNow(i.createdAt) })
  })
}

Component({
  data: {
    site: SITE,
    list: [],
    localOnly: !APP_CONFIG.cloudEnv,
  },

  pageLifetimes: {
    show() {
      this.refresh()
    },
  },

  methods: {
    refresh() {
      this.setData({ list: decorate(listInquiries()) })
    },

    removeItem(e) {
      const id = e.currentTarget.dataset.id
      const that = this
      wx.showModal({
        title: '删除这条留言？',
        content: '删除后无法恢复，但你仍然可以直接拨打电话联系我们。',
        confirmText: '删除',
        confirmColor: '#C0453B',
        success: function (res) {
          if (!res.confirm) return
          that.setData({ list: decorate(removeInquiry(id)) })
          wx.showToast({ title: '已删除', icon: 'none' })
        },
      })
    },

    clearAll() {
      const that = this
      wx.showModal({
        title: '清空全部留言？',
        content: '将删除本机保存的所有留言记录。',
        confirmText: '清空',
        confirmColor: '#C0453B',
        success: function (res) {
          if (!res.confirm) return
          clearInquiries()
          that.setData({ list: [] })
          wx.showToast({ title: '已清空', icon: 'none' })
        },
      })
    },

    callItem(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
        fail: () => wx.showToast({ title: '已取消', icon: 'none' }),
      })
    },

    copyItem(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.phone,
        success: () => wx.showToast({ title: '号码已复制', icon: 'none' }),
      })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },
  },
})
