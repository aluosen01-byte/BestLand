// messages.ts 我的留言
import { SITE } from '../../data/site'
import { APP_CONFIG } from '../../config'
import { listInquiries, removeInquiry, clearInquiries, type Inquiry } from '../../utils/inquiry'
import { fromNow } from '../../utils/util'

interface InquiryRow extends Inquiry {
  timeText: string
}

function decorate(list: Inquiry[]): InquiryRow[] {
  return list.map((i) => ({ ...i, timeText: fromNow(i.createdAt) }))
}

Component({
  data: {
    site: SITE,
    list: [] as InquiryRow[],
    localOnly: !APP_CONFIG.cloudEnv,
  },

  pageLifetimes: {
    show() {
      this.refresh()
    },
  },

  methods: {
    refresh() {
      this.setData({ list: decorate(listInquiries()) })
    },

    removeItem(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset as { id: string }
      wx.showModal({
        title: '删除这条留言？',
        content: '删除后无法恢复，但你仍然可以直接拨打电话联系我们。',
        confirmText: '删除',
        confirmColor: '#C0453B',
        success: (res) => {
          if (!res.confirm) return
          this.setData({ list: decorate(removeInquiry(id)) })
          wx.showToast({ title: '已删除', icon: 'none' })
        },
      })
    },

    clearAll() {
      wx.showModal({
        title: '清空全部留言？',
        content: '将删除本机保存的所有留言记录。',
        confirmText: '清空',
        confirmColor: '#C0453B',
        success: (res) => {
          if (!res.confirm) return
          clearInquiries()
          this.setData({ list: [] })
          wx.showToast({ title: '已清空', icon: 'none' })
        },
      })
    },

    callItem(e: WechatMiniprogram.TouchEvent) {
      const { phone } = e.currentTarget.dataset as { phone: string }
      wx.makePhoneCall({
        phoneNumber: phone,
        fail: () => wx.showToast({ title: '已取消', icon: 'none' }),
      })
    },

    copyItem(e: WechatMiniprogram.TouchEvent) {
      const { phone } = e.currentTarget.dataset as { phone: string }
      wx.setClipboardData({
        data: phone,
        success: () => wx.showToast({ title: '号码已复制', icon: 'none' }),
      })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },
  },
})
