// about.js —— 由 about.ts 编译而来（构建产物）｜关于我们
const { SITE, PATENTS, CREDENTIALS, CASES_OUTER, CASES_INNER, PROMOTION } = require('../../data/site')
const { BRAND_STORY, BRAND_VALUES } = require('../../data/catalog')
const { shareApp, shareTimeline } = require('../../utils/share')

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
    patents: PATENTS,
    credentials: CREDENTIALS,
    casesOuter: CASES_OUTER,
    casesInner: CASES_INNER,
    promotion: PROMOTION,
    year: new Date().getFullYear(),
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      return shareApp('about', { title: '关于贝之然 · 纯无机建筑涂料' })
    },

    onShareTimeline() {
      return shareTimeline('about', { title: '关于贝之然 · 纯无机建筑涂料' })
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

    goProducts() {
      wx.reLaunch({ url: '/pages/products/products' })
    },

    goQualification() {
      wx.navigateTo({ url: '/pages/qualification/qualification' })
    },

    goFranchise() {
      wx.navigateTo({ url: '/pages/franchise/franchise' })
    },

    goPolicy() {
      wx.navigateTo({ url: '/pages/policy/policy' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goAgreement() {
      wx.navigateTo({ url: '/pages/agreement/agreement' })
    },
  },
})
