// messages.js 我的留言
//
// 留言提交后会尝试上报到企业服务器（config.inquiryApi）。
// 网络失败时保存在本机，本页显示「待送达」并支持重新提交，
// 同时进页面会自动重试一次，保证「提交 → 企业收到」这条闭环不会断。
const { SITE } = require('../../data/site')
const { APP_CONFIG } = require('../../config')
const {
  listInquiries,
  removeInquiry,
  clearInquiries,
  retryPending,
} = require('../../utils/inquiry')
const { fromNow } = require('../../utils/util')
const { shareApp, shareTimeline } = require('../../utils/share')

function decorate(list) {
  return list.map(function (i) {
    return Object.assign({}, i, {
      timeText: fromNow(i.createdAt),
      // 已送达企业后台 / 仍待送达
      statusText: i.synced ? '已送达' : '待送达',
    })
  })
}

Component({
  data: {
    site: SITE,
    list: [],
    pendingCount: 0,
    retrying: false,
    apiEnabled: !!APP_CONFIG.inquiryApi,
  },

  pageLifetimes: {
    show() {
      this.refresh()
      this.autoRetry()
    },
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      return shareApp('messages', { title: '贝之然 · 我的留言' })
    },

    onShareTimeline() {
      return shareTimeline('messages', { title: '贝之然 · 我的留言' })
    },

    refresh() {
      const raw = listInquiries()
      this.setData({
        list: decorate(raw),
        pendingCount: raw.filter(function (i) {
          return !i.synced
        }).length,
      })
    },

    /** 进页面时静默重试未送达的留言 */
    autoRetry() {
      if (!this.data.apiEnabled) return
      const that = this
      retryPending(APP_CONFIG.inquiryApi).then(function (done) {
        if (done > 0) {
          that.refresh()
          wx.showToast({ title: '已补发 ' + done + ' 条留言', icon: 'none' })
        }
      })
    },

    /** 手动重新提交 */
    retryAll() {
      if (this.data.retrying || !this.data.apiEnabled) return
      const that = this
      this.setData({ retrying: true })
      retryPending(APP_CONFIG.inquiryApi).then(function (done) {
        that.setData({ retrying: false })
        that.refresh()
        wx.showToast({
          title: done > 0 ? '已补发 ' + done + ' 条' : '仍未能送达，请检查网络',
          icon: 'none',
        })
      })
    },

    removeItem(e) {
      const id = e.currentTarget.dataset.id
      const that = this
      wx.showModal({
        title: '删除这条留言？',
        content: '删除后本机不再保留这条记录。若需要继续沟通，可重新提交或直接致电。',
        confirmText: '删除',
        confirmColor: '#C0453B',
        success: function (res) {
          if (!res.confirm) return
          removeInquiry(id)
          that.refresh()
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
          that.setData({ list: [], pendingCount: 0 })
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
