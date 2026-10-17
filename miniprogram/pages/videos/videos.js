// videos.js 视频中心
//
// 【设计说明】小程序**不提供任何视频播放能力**。
//
// 原因：只要有「点击就能播放」的路径（无论是小程序 <video> 组件，
// 还是 web-view 内嵌网页播放器），微信审核都会认定为
// 「小程序提供视频播放服务」，要求提供《信息网络传播视听节目许可证》。
// 公司无法获取该证，因此彻底改为**只做视频链接的快捷复制**：
// 用户拿到链接后自行粘贴到浏览器观看。
//
// 所以本页面：
//   · 没有 <video> 组件
//   · 没有 wx.previewMedia
//   · 没有 web-view 播放页
//   · 点击卡片 = 复制该条视频的地址
const { videoList } = require('../../data/video')
const { shareApp, shareTimeline } = require('../../utils/share')

Component({
  data: {
    videos: [],
    current: null,
  },

  lifetimes: {
    attached() {
      const list = videoList()
      this.setData({ videos: list, current: list.length ? list[0] : null })
    },
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      return shareApp('videos', { title: '贝之然产品短视频 · 30 秒看懂一个系列' })
    },

    onShareTimeline() {
      return shareTimeline('videos', { title: '贝之然产品短视频 · 30 秒看懂一个系列' })
    },

    /** 点卡片：选中并把该条链接复制到剪贴板（一键复制，不做播放） */
    copyItem(e) {
      const index = Number(e.currentTarget.dataset.index)
      const id = e.currentTarget.dataset.id
      const list = this.data.videos
      const v = (typeof index === 'number' && !isNaN(index) && list[index]) || null
      const target =
        v ||
        list.filter(function (x) {
          return x.id === id
        })[0]
      if (!target) return
      this.setData({ current: target })
      this.copyUrl(target.url)
    },

    /** 复制当前选中视频的地址 */
    copyCurrent() {
      const cur = this.data.current
      if (!cur || !cur.url) return
      this.copyUrl(cur.url)
    },

    copyUrl(url) {
      if (!url) return
      wx.setClipboardData({
        data: url,
        success: () => {
          wx.showToast({
            title: '视频链接已复制，粘贴到浏览器观看',
            icon: 'none',
            duration: 2600,
          })
        },
        fail: () => {
          // 复制失败时把地址展示出来，便于手动记录
          wx.showModal({
            title: '视频地址',
            content: url,
            showCancel: false,
            confirmText: '知道了',
          })
        },
      })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },
  },
})
