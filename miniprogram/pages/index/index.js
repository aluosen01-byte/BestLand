// index.js —— 首页
//
// 说明：本小程序定位为「品牌与产品资料库 + 在线咨询」，所有核心内容
// 都在小程序内完成浏览（产品目录、技术参数、资质原件、政策依据、招商政策），
// 不依赖跳转外部渠道，避免被判为「纯导流小程序」。
const { SITE, FEATURES, SCENES } = require('../../data/site')
const { SERIES_LIST, CERTS, BRAND_VALUES, seriesCover } = require('../../data/catalog')
const { shareApp, shareTimeline } = require('../../utils/share')

Component({
  data: {
    site: SITE,
    features: FEATURES,
    scenes: SCENES,
    values: BRAND_VALUES,
    series: [],
    certs: [],
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

    goPolicy() {
      wx.navigateTo({ url: '/pages/policy/policy' })
    },

    goFranchise() {
      wx.navigateTo({ url: '/pages/franchise/franchise' })
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
