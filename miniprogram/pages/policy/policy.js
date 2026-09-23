// policy.js 政策背书
const { INTRO, POLICIES_A, POLICIES_B, REFERENCES, TAKEAWAYS } = require('../../data/policy')

Component({
  data: {
    intro: INTRO,
    takeaways: TAKEAWAYS,
    policiesA: POLICIES_A,
    policiesB: POLICIES_B,
    references: REFERENCES,
  },

  methods: {
    /** 小程序内不能直接打开站外网页，复制链接是最稳的做法 */
    copyRef(e) {
      const url = e.currentTarget.dataset.url
      const name = e.currentTarget.dataset.name
      wx.setClipboardData({
        data: url,
        success: () => wx.showToast({ title: '链接已复制', icon: 'none' }),
        fail: () => wx.showModal({ title: name, content: url, showCancel: false }),
      })
    },

    goContact() {
      wx.reLaunch({
        url: '/pages/contact/contact?interest=' + encodeURIComponent('绿色建材 / 投标资料'),
      })
    },

    goFranchise() {
      wx.navigateTo({ url: '/pages/franchise/franchise' })
    },
  },
})
