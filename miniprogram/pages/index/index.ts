// index.ts 首页
import { SITE, FEATURES, SCENES } from '../../data/site'
import {
  SERIES_LIST,
  CERTS,
  BRAND_VALUES,
  seriesCover,
  type Series,
  type Cert,
} from '../../data/catalog'

/** 首页系列卡片：系列 + 封面路径 */
interface SeriesCard extends Series {
  cover: string
}

/** 首页证书卡片：缩短标题，避免折行 */
interface CertCard extends Cert {
  shortTitle: string
}

Component({
  data: {
    site: SITE,
    features: FEATURES,
    scenes: SCENES,
    values: BRAND_VALUES,
    series: [] as SeriesCard[],
    certs: [] as CertCard[],
    scrolled: false,
    showNavTitle: false,
    year: SITE.sinceYear,
  },

  lifetimes: {
    attached() {
      this.setData({
        series: SERIES_LIST.map((s) => ({ ...s, cover: seriesCover(s.id) })),
        certs: CERTS.map((c) => ({
          ...c,
          shortTitle: c.title.replace('检测报告', '').replace('纯无机涂料', '').trim(),
        })),
      })
    },
  },

  pageLifetimes: {
    show() {
      // 跨年后页脚年份自动更新
      const year = new Date().getFullYear()
      if (year !== this.data.year) this.setData({ year })
    },
  },

  methods: {
    /** 页面滚动：自定义导航栏由透明渐变为白底 */
    onPageScroll(e: WechatMiniprogram.Page.IPageScrollOption) {
      const scrolled = e.scrollTop > 120
      if (scrolled !== this.data.scrolled) {
        this.setData({ scrolled, showNavTitle: e.scrollTop > 200 })
      }
    },

    goProducts() {
      wx.reLaunch({ url: '/pages/products/products' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goDetail(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset as { id: string }
      wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
    },

    goQualification() {
      wx.navigateTo({ url: '/pages/qualification/qualification' })
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
