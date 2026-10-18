// detail.js —— 系列详情
const { SITE } = require('../../data/site')
const {
  getSeries,
  productsOfSeries,
  seriesCover,
  seriesImage,
  CERTS,
} = require('../../data/catalog')
const { shareApp, shareTimeline } = require('../../utils/share')

Component({
  data: {
    series: null,
    products: [],
    images: [],
    certs: [],
    current: 0,
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      var s = this.data.series
      return shareApp('detail', {
        title: s ? ('贝之然 · ' + s.name + ' · ' + s.tagline) : '贝之然纯无机涂料 · 系列详情与技术参数',
        path: s ? ('/pages/detail/detail?id=' + s.id) : '/pages/detail/detail',
      })
    },

    onShareTimeline() {
      var s = this.data.series
      return shareTimeline('detail', {
        title: s ? ('贝之然 · ' + s.name) : '贝之然纯无机涂料 · 系列详情与技术参数',
        query: s ? ('id=' + s.id) : '',
      })
    },

    onLoad(query) {
      const id = (query && query.id) || ''
      const series = getSeries(id)
      if (!series) return

      // 封面 + 产品图；封面缺失时 mkimg 会自动降级为占位块
      const images = [seriesCover(series.id)]
      for (let i = 1; i <= series.imageCount; i++) {
        images.push(seriesImage(series.id, i))
      }

      this.setData({
        series: series,
        products: productsOfSeries(series.id),
        images: images,
        certs: CERTS.map(function (c) {
          return {
            id: c.id,
            issuer: c.issuer,
            shortTitle: c.title.replace('检测报告', '').replace('纯无机涂料', '').trim(),
          }
        }),
      })
    },

    onSwiperChange(e) {
      this.setData({ current: e.detail.current })
    },

    preview(e) {
      const src = e.currentTarget.dataset.src
      wx.previewImage({
        current: src,
        urls: this.data.images,
        fail: () => wx.showToast({ title: '图片尚未上传', icon: 'none' }),
      })
    },

    askModel(e) {
      const model = e.currentTarget.dataset.model
      const s = this.data.series
      // 咨询页是主导航页，用 reLaunch 避免页面栈里堆出多个咨询页
      wx.reLaunch({
        url: '/pages/contact/contact?interest=' + encodeURIComponent((s ? s.name : '') + ' ' + model),
      })
    },

    goContact() {
      const s = this.data.series
      wx.reLaunch({
        url: '/pages/contact/contact?interest=' + encodeURIComponent(s ? s.name : ''),
      })
    },

    goCalculator() {
      wx.navigateTo({ url: '/pages/calculator/calculator' })
    },

    goQualification() {
      wx.navigateTo({ url: '/pages/qualification/qualification' })
    },

    goProducts() {
      wx.reLaunch({ url: '/pages/products/products' })
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
