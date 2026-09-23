// detail.ts 系列详情
import { SITE } from '../../data/site'
import {
  getSeries,
  productsOfSeries,
  seriesCover,
  seriesImage,
  CERTS,
  type Series,
  type Product,
} from '../../data/catalog'

interface CertBrief {
  id: string
  shortTitle: string
  issuer: string
}

Component({
  data: {
    series: null as Series | null,
    products: [] as Product[],
    images: [] as string[],
    certs: [] as CertBrief[],
    current: 0,
  },

  methods: {
    onLoad(query: Record<string, string | undefined>) {
      const id = query.id || ''
      const series = getSeries(id)
      if (!series) {
        return
      }

      // 封面 + 产品图；封面缺失时 mkimg 会自动降级为占位块
      const images: string[] = [seriesCover(series.id)]
      for (let i = 1; i <= series.imageCount; i++) {
        images.push(seriesImage(series.id, i))
      }

      this.setData({
        series,
        products: productsOfSeries(series.id),
        images,
        certs: CERTS.map((c) => ({
          id: c.id,
          issuer: c.issuer,
          shortTitle: c.title.replace('检测报告', '').replace('纯无机涂料', '').trim(),
        })),
      })
    },

    onSwiperChange(e: WechatMiniprogram.SwiperChange) {
      this.setData({ current: e.detail.current })
    },

    preview(e: WechatMiniprogram.TouchEvent) {
      const { src } = e.currentTarget.dataset as { src: string }
      // 只预览真实存在的图片：加载失败时不弹空预览
      wx.previewImage({
        current: src,
        urls: this.data.images,
        fail: () => wx.showToast({ title: '图片尚未上传', icon: 'none' }),
      })
    },

    askModel(e: WechatMiniprogram.TouchEvent) {
      const { model } = e.currentTarget.dataset as { model: string }
      const s = this.data.series
      // 咨询页是主导航页，用 reLaunch 避免页面栈里堆出多个咨询页
      wx.reLaunch({
        url: `/pages/contact/contact?interest=${encodeURIComponent(
          `${s ? s.name : ''} ${model}`
        )}`,
      })
    },

    goContact() {
      const s = this.data.series
      wx.reLaunch({
        url: `/pages/contact/contact?interest=${encodeURIComponent(s ? s.name : '')}`,
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
