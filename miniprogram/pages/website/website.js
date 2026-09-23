// website.js 官方网站（web-view 内嵌）
const { SITE } = require('../../data/site')

Component({
  data: {
    title: '贝之然官网',
    url: SITE.website,
    failed: false,
  },

  methods: {
    onLoad() {
      // web-view 加载成功；如果之前标过失败，这里复位
      if (this.data.failed) this.setData({ failed: false })
    },

    /**
     * web-view 常见失败原因：
     * 1. 域名未加入「业务域名」（最常见）；
     * 2. 业务域名校验文件未放到网站根目录；
     * 3. 站点跳转到未登记域名。
     * 无论哪种，都给用户可操作的出口，而不是白屏。
     */
    onError(e) {
      console.error('[贝之然] 官网 web-view 加载失败', JSON.stringify(e.detail || {}))
      this.setData({ failed: true })
    },

    copyUrl() {
      wx.setClipboardData({
        data: this.data.url,
        success: () =>
          wx.showToast({
            title: '已复制，可粘贴到浏览器',
            icon: 'none',
            duration: 2200,
          }),
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
