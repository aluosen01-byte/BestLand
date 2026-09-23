// about.ts 关于我们
import { SITE } from '../../data/site'
import { BRAND_STORY, BRAND_VALUES } from '../../data/catalog'

/** 涂装链路：让「完整产品体系」这件事可视化 */
const CHAIN = [
  { name: '基层加固', desc: '无机底固 · 界面剂 · 墙面剂' },
  { name: '功能防护', desc: '防水涂料 · 抗污罩面' },
  { name: '面层涂装', desc: '内墙 · 外墙 · 儿童房 · 地坪' },
]

Component({
  data: {
    site: SITE,
    story: BRAND_STORY,
    values: BRAND_VALUES,
    chain: CHAIN,
    year: new Date().getFullYear(),
  },

  methods: {
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

    goProducts() {
      wx.reLaunch({ url: '/pages/products/products' })
    },

    goQualification() {
      wx.navigateTo({ url: '/pages/qualification/qualification' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goAgreement() {
      wx.navigateTo({ url: '/pages/agreement/agreement' })
    },
  },
})
