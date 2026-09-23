// policy.ts 政策背书（源码存档，当前未启用编译；生效的是 policy.js）
import { INTRO, POLICIES_A, POLICIES_B, REFERENCES, TAKEAWAYS } from '../../data/policy'

Component({
  data: {
    intro: INTRO,
    takeaways: TAKEAWAYS,
    policiesA: POLICIES_A,
    policiesB: POLICIES_B,
    references: REFERENCES,
  },

  methods: {
    copyRef(e: WechatMiniprogram.TouchEvent) {
      const { url, name } = e.currentTarget.dataset as { url: string; name: string }
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
