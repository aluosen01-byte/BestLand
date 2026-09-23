// franchise.js 招商加盟
const { SITE } = require('../../data/site')
const { TIERS, BENEFITS, THRESHOLDS, SUPPORT, OVERSEAS_STEPS, FAQ } = require('../../data/franchise')

/** 为什么现在做（把政策与产品优势翻译成加盟理由） */
const REASONS = [
  {
    title: '政策强制 A 级不燃',
    desc: '《建筑防火通用规范》GB 55037-2022 全文强制，学校、医院、地铁、机场等场所墙面必须达到 A 级不燃，无机涂料被强制采用。',
  },
  {
    title: '绿色建材有量化目标',
    desc: '国家要求 2026 年新建建筑无机涂料使用比例 ≥30%，绿色建材应用比例超 70%，市场空间被政策明确打开。',
  },
  {
    title: '地方有补贴与容积率奖励',
    desc: '北京、上海、广东等地对使用无机涂料的项目给予 3%–5% 容积率奖励与财政资金补贴。',
  },
  {
    title: '替代传统材料，成本更低',
    desc: '免腻子、免底漆，两遍喷涂成型，综合成本减少 30%；比真石漆仿石漆每平方米直接材料成本省三分之一。',
  },
]

function buildFaq() {
  return FAQ.map(function (f) {
    return Object.assign({}, f, { open: false })
  })
}

Component({
  data: {
    site: SITE,
    tiers: TIERS,
    reasons: REASONS,
    benefits: BENEFITS,
    thresholds: THRESHOLDS,
    support: SUPPORT,
    steps: OVERSEAS_STEPS,
    faq: buildFaq(),
  },

  methods: {
    toggleFaq(e) {
      const index = Number(e.currentTarget.dataset.index)
      const faq = this.data.faq.map(function (f, i) {
        return Object.assign({}, f, { open: i === index ? !f.open : f.open })
      })
      this.setData({ faq: faq })
    },

    /** 申请代理：把意向带进咨询表单，预填咨询类型 */
    apply() {
      wx.reLaunch({
        url: '/pages/contact/contact?interest=' + encodeURIComponent('经销代理'),
      })
    },

    goPolicy() {
      wx.navigateTo({ url: '/pages/policy/policy' })
    },

    callPhone() {
      wx.makePhoneCall({
        phoneNumber: SITE.phone,
        fail: () => this.copyPhone(),
      })
    },

    copyPhone() {
      wx.setClipboardData({
        data: SITE.phone,
        success: () => wx.showToast({ title: '号码已复制', icon: 'none' }),
      })
    },
  },
})
