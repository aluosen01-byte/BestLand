// detail.js —— 由 detail.ts 编译而来（构建产物）｜系列详情
const { SITE } = require('../../data/site')
const {
  getSeries,
  productsOfSeries,
  seriesCover,
  seriesImage,
  CERTS,
} = require('../../data/catalog')

Component({
  data: {
    series: null,
    products: [],
    images: [],
    certs: [],
    current: 0,
  },

  methods: {
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
