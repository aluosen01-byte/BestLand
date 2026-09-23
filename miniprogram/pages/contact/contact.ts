// contact.ts 咨询与留言
import { SITE } from '../../data/site'
import { SERIES_LIST } from '../../data/catalog'
import { APP_CONFIG } from '../../config'
import {
  INQUIRY_TYPES,
  saveInquiry,
  reportToCloud,
  markSynced,
  type Inquiry,
} from '../../utils/inquiry'
import { isPhone, trim } from '../../utils/util'

interface FormState {
  name: string
  phone: string
  company: string
  city: string
  type: string
  message: string
}

interface Faq {
  q: string
  a: string
  open: boolean
}

/** 感兴趣的产品选项：第一项为未选择 */
const INTEREST_NONE = '暂不指定 / 需要推荐'

function buildInterestOptions(): string[] {
  return [INTEREST_NONE].concat(SERIES_LIST.map((s) => s.name))
}

const FAQS: Faq[] = [
  {
    q: '纯无机涂料和普通乳胶漆有什么区别？',
    a: '主要差别在成膜物质。普通乳胶漆以有机乳液成膜，而无机涂料以无机矿物成膜，因此燃烧性能可达 A1 级、不含有机挥发物来源，且与水泥基基层结合更牢固，耐久性更好。',
  },
  {
    q: '可以直接刷在旧墙或旧漆面上吗？',
    a: '需要先判断基层状态。起砂、掉粉、空鼓的旧墙要先做加固与找平，建议搭配无机底固系列与界面剂使用；如果旧漆膜牢固、无粉化，通常清理后即可施工。把现场照片发我们，可以给出具体处理建议。',
  },
  {
    q: '工程采购有起订量或价格优惠吗？',
    a: '工程批量按项目面积与型号组合报价，量大价格更优。请把项目地点、涂装面积、基层情况与工期留言给我们，会安排对应的工程顾问对接。',
  },
  {
    q: '能提供样品或现场打样吗？',
    a: '可以。常规型号提供小样与样板，重点工程可安排技术人员配合现场打样与施工指导。',
  },
  {
    q: '检测报告可以用于投标吗？',
    a: '可以。我们可提供 A1 级不燃性、有害物质限量与环保耐久性能等第三方检测报告，工程投标如需盖章件请提前说明。',
  },
]

Component({
  data: {
    site: SITE,
    types: INQUIRY_TYPES as unknown as string[],
    interestOptions: buildInterestOptions(),
    interestIndex: 0,
    form: {
      name: '',
      phone: '',
      company: '',
      city: '',
      type: INQUIRY_TYPES[0],
      message: '',
    } as FormState,
    agreed: false,
    submitting: false,
    showLocalNotice: !APP_CONFIG.cloudEnv,
    faqs: FAQS,
  },

  methods: {
    onLoad(query: Record<string, string | undefined>) {
      // 从产品页跳转过来时，预填「感兴趣的产品」
      const interest = query.interest ? decodeURIComponent(query.interest) : ''
      if (!interest) return

      const options = this.data.interestOptions
      // 命中系列名则选中，否则原样填进需求说明
      const matched = options.findIndex((o) => interest.indexOf(o) >= 0 && o !== INTEREST_NONE)
      if (matched >= 0) {
        this.setData({ interestIndex: matched })
      } else {
        this.setData({ 'form.message': `我想咨询：${interest}\n` })
      }
    },

    onInput(e: WechatMiniprogram.Input) {
      const { key } = e.currentTarget.dataset as { key: keyof FormState }
      this.setData({ [`form.${key}`]: e.detail.value })
    },

    selectType(e: WechatMiniprogram.TouchEvent) {
      const { type } = e.currentTarget.dataset as { type: string }
      this.setData({ 'form.type': type })
    },

    onInterest(e: WechatMiniprogram.PickerChange) {
      this.setData({ interestIndex: Number(e.detail.value) })
    },

    toggleAgree() {
      this.setData({ agreed: !this.data.agreed })
    },

    toggleFaq(e: WechatMiniprogram.TouchEvent) {
      const index = Number(e.currentTarget.dataset.index)
      const faqs = this.data.faqs.map((f, i) => ({ ...f, open: i === index ? !f.open : f.open }))
      this.setData({ faqs })
    },

    goAgreement() {
      wx.navigateTo({ url: '/pages/agreement/agreement' })
    },

    goMessages() {
      wx.navigateTo({ url: '/pages/messages/messages' })
    },

    async submit() {
      if (this.data.submitting) return

      const name = trim(this.data.form.name)
      const phone = trim(this.data.form.phone)

      if (!name) {
        wx.showToast({ title: '请填写称呼', icon: 'none' })
        return
      }
      if (!isPhone(phone)) {
        wx.showToast({ title: '请填写正确的手机号', icon: 'none' })
        return
      }
      if (!this.data.agreed) {
        wx.showToast({ title: '请先阅读并同意说明', icon: 'none' })
        return
      }

      this.setData({ submitting: true })

      const interest = this.data.interestIndex > 0 ? this.data.interestOptions[this.data.interestIndex] : ''

      const saved: Inquiry = saveInquiry({
        name,
        phone,
        company: trim(this.data.form.company),
        city: trim(this.data.form.city),
        type: this.data.form.type,
        interest,
        message: trim(this.data.form.message),
      })

      // 配置了云环境则尝试上报（失败也不影响本地留存）
      let synced = false
      if (APP_CONFIG.cloudEnv) {
        synced = await reportToCloud(saved, APP_CONFIG.cloudEnv)
        if (synced) markSynced(saved.id)
      }

      this.setData({ submitting: false })

      wx.showModal({
        title: '留言已提交',
        content: synced
          ? '我们已收到你的需求，会尽快安排对应顾问与你联系。'
          : `当前未接入云端接收，留言已保存在你的手机里。建议直接拨打 ${SITE.phoneText} 联系我们，沟通更快。`,
        confirmText: '查看留言',
        cancelText: '继续浏览',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/messages/messages' })
          }
        },
      })

      // 清空表单，保留咨询类型与产品选择，便于再次提交
      this.setData({
        form: {
          name: '',
          phone: '',
          company: '',
          city: '',
          type: this.data.form.type,
          message: '',
        },
        agreed: false,
      })
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

    copyEmail() {
      if (!SITE.email) return
      wx.setClipboardData({
        data: SITE.email,
        success: () => wx.showToast({ title: '邮箱已复制', icon: 'none' }),
      })
    },

    copyAddress() {
      wx.setClipboardData({
        data: SITE.address,
        success: () => wx.showToast({ title: '地址已复制', icon: 'none' }),
      })
    },
  },
})
