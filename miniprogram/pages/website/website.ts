// website.ts 官方网站（源码存档，当前未启用编译；生效的是 website.js）
import { SITE } from '../../data/site'

Component({
  data: {
    title: '贝之然官网',
    url: SITE.website,
    failed: false,
  },

  methods: {
    onLoad() {
      if (this.data.failed) this.setData({ failed: false })
    },

    onError(e: WechatMiniprogram.CustomEvent) {
      console.error('[贝之然] 官网 web-view 加载失败', JSON.stringify(e.detail || {}))
      this.setData({ failed: true })
    },

    copyUrl() {
      wx.setClipboardData({
        data: this.data.url,
        success: () =>
          wx.showToast({ title: '已复制，可粘贴到浏览器', icon: 'none', duration: 2200 }),
      })
    },

    callPhone() {
      wx.makePhoneCall({
        phoneNumber: SITE.phone,
        fail: () => {
          wx.setClipboardData({
            data: SITE.phone,
            success: () => wx.showToast({ title: '号码已复制', icon: 'none' }),
          })
        },
      })
    },
  },
})
