// qualification.js —— 由 qualification.ts 编译而来（构建产物）｜资质证书
const { CERTS } = require('../../data/catalog')

const TABS = [
  { key: 'all', label: '全部', category: '' },
  { key: 'report', label: '检测报告', category: '检测报告' },
  { key: 'system', label: '体系认证', category: '体系认证' },
  { key: 'ip', label: '知识产权', category: '知识产权' },
]

function countBy(category) {
  return CERTS.filter(function (c) {
    return c.category === category
  }).length
}

Component({
  data: {
    tabs: TABS,
    active: 'all',
    list: [],
    total: CERTS.length,
    reportCount: countBy('检测报告'),
    certCount: CERTS.length - countBy('检测报告'),
  },

  lifetimes: {
    attached() {
      this.setData({ list: CERTS })
    },
  },

  methods: {
    onTab(e) {
      const key = e.currentTarget.dataset.key
      const tab = TABS.filter(function (t) {
        return t.key === key
      })[0]
      const list =
        tab && tab.category
          ? CERTS.filter(function (c) {
              return c.category === tab.category
            })
          : CERTS
      this.setData({ active: key, list: list })
    },

    preview(e) {
      const id = e.currentTarget.dataset.id
      const cert = CERTS.filter(function (c) {
        return c.id === id
      })[0]
      if (!cert) return
      wx.previewImage({
        current: cert.images[0],
        urls: cert.images,
        fail: () => wx.showToast({ title: '证书图片尚未上传', icon: 'none' }),
      })
    },

    ask(e) {
      const title = e.currentTarget.dataset.title
      wx.navigateTo({
        url: '/pages/contact/contact?interest=' + encodeURIComponent('索取资质：' + title),
      })
    },

    goContact() {
      wx.navigateTo({
        url: '/pages/contact/contact?interest=' + encodeURIComponent('索取资质文件包'),
      })
    },
  },
})
