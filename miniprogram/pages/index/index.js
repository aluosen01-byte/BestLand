// index.js —— 由 index.ts 编译而来（构建产物）｜首页
const { SITE, FEATURES, SCENES } = require('../../data/site')
const { SERIES_LIST, CERTS, BRAND_VALUES, seriesCover } = require('../../data/catalog')
const { videoList } = require('../../data/video')
const { shareApp, shareTimeline } = require('../../utils/share')

Component({
  data: {
    site: SITE,
    features: FEATURES,
    scenes: SCENES,
    values: BRAND_VALUES,
    series: [],
    certs: [],
    videos: [],
    scrolled: false,
    showNavTitle: false,
    year: SITE.sinceYear,
  },

  lifetimes: {
    attached() {
      this.setData({
        series: SERIES_LIST.map(function (s) {
          return Object.assign({}, s, { cover: seriesCover(s.id) })
        }),
        certs: CERTS.map(function (c) {
          return Object.assign({}, c, {
            shortTitle: c.title.replace('检测报告', '').replace('纯无机涂料', '').trim(),
          })
        }),
        // 首页只放前 6 支，完整列表在「视频」页
        videos: videoList().slice(0, 6),
      })
    },
  },

  pageLifetimes: {
    show() {
      // 跨年后页脚年份自动更新
      var year = new Date().getFullYear()
      if (year !== this.data.year) this.setData({ year: year })
    },
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      return shareApp('index', { title: '贝之然纯无机涂料 · 纯无机 · A1 级不燃 · 与楼房同寿命' })
    },

    onShareTimeline() {
      return shareTimeline('index', { title: '贝之然纯无机涂料 · 纯无机 · A1 级不燃 · 与楼房同寿命' })
    },

    /** 页面滚动：自定义导航栏由透明渐变为白底 */
    onPageScroll(e) {
      var scrolled = e.scrollTop > 120
      if (scrolled !== this.data.scrolled) {
        this.setData({ scrolled: scrolled, showNavTitle: e.scrollTop > 200 })
      }
    },

    goProducts() {
      wx.reLaunch({ url: '/pages/products/products' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goDetail(e) {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
    },

    goQualification() {
      wx.navigateTo({ url: '/pages/qualification/qualification' })
    },

    goVideos() {
      wx.reLaunch({ url: '/pages/videos/videos' })
    },

    goPolicy() {
      wx.navigateTo({ url: '/pages/policy/policy' })
    },

    goFranchise() {
      wx.navigateTo({ url: '/pages/franchise/franchise' })
    },

    /**
     * 首页视频卡片：只复制链接，不做任何播放。
     * 详见 data/video.js 顶部说明（审核要求视听节目许可证）。
     */
    copyVideo(e) {
      const index = Number(e.currentTarget.dataset.index)
      const v = this.data.videos[index]
      if (!v || !v.url) return
      wx.setClipboardData({
        data: v.url,
        success: () => {
          wx.showToast({
            title: '视频链接已复制，粘贴到浏览器观看',
            icon: 'none',
            duration: 2600,
          })
        },
        fail: () => {
          wx.showModal({ title: '视频地址', content: v.url, showCancel: false, confirmText: '知道了' })
        },
      })
    },

    goWebsite() {
      wx.navigateTo({ url: '/pages/website/website' })
    },

    goAbout() {
      wx.navigateTo({ url: '/pages/about/about' })
    },

    goAgreement() {
      wx.navigateTo({ url: '/pages/agreement/agreement' })
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
