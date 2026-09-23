// qualification.ts 资质证书
import { CERTS, type Cert } from '../../data/catalog'

interface Tab {
  key: string
  label: string
  /** 对应证书分类，'' 表示全部 */
  category: string
}

const TABS: Tab[] = [
  { key: 'all', label: '全部', category: '' },
  { key: 'report', label: '检测报告', category: '检测报告' },
  { key: 'system', label: '体系认证', category: '体系认证' },
  { key: 'ip', label: '知识产权', category: '知识产权' },
]

Component({
  data: {
    tabs: TABS,
    active: 'all',
    list: [] as Cert[],
    total: CERTS.length,
    reportCount: CERTS.filter((c) => c.category === '检测报告').length,
    certCount: CERTS.filter((c) => c.category !== '检测报告').length,
  },

  lifetimes: {
    attached() {
      this.setData({ list: CERTS })
    },
  },

  methods: {
    onTab(e: WechatMiniprogram.TouchEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      const tab = TABS.filter((t) => t.key === key)[0]
      const list = tab && tab.category ? CERTS.filter((c) => c.category === tab.category) : CERTS
      this.setData({ active: key, list })
    },

    preview(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset as { id: string }
      const cert = CERTS.filter((c) => c.id === id)[0]
      if (!cert) return
      wx.previewImage({
        current: cert.images[0],
        urls: cert.images,
        fail: () => wx.showToast({ title: '证书图片尚未上传', icon: 'none' }),
      })
    },

    ask(e: WechatMiniprogram.TouchEvent) {
      const { title } = e.currentTarget.dataset as { title: string }
      wx.navigateTo({
        url: `/pages/contact/contact?interest=${encodeURIComponent(`索取资质：${title}`)}`,
      })
    },

    goContact() {
      wx.navigateTo({
        url: `/pages/contact/contact?interest=${encodeURIComponent('索取资质文件包')}`,
      })
    },
  },
})
