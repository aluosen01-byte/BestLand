// videos.js 视频中心
//
// 【设计说明】视频不在小程序内播放。
// 原因：小程序内嵌入 <video> 播放，审核会要求提供
// 《信息网络传播视听节目许可证》等资质，本项目不具备。
// 因此改为「外链播放」：小程序只展示封面与标题，用户点按钮把视频地址
// 复制到剪贴板，再粘贴到浏览器观看。页面内不再出现 <video> 组件。
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

    /** 点封面：选中该条，供下方「复制链接」使用 */
    select(e) {
      const id = e.currentTarget.dataset.id
      if (this.data.current && this.data.current.id === id) return
      const target = this.data.videos.filter(function (v) {
        return v.id === id
      })[0]
      if (!target) return
      this.setData({ current: target })
    },

    /** 复制当前选中视频的地址 */
    copyCurrent() {
      const cur = this.data.current
      if (!cur || !cur.url) return
      this.copyUrl(cur.url)
    },

    /** 长按某条卡片，直接复制它的地址 */
    copyItem(e) {
      const url = e.currentTarget.dataset.url
      if (!url) return
      this.copyUrl(url)
    },

    copyUrl(url) {
      wx.setClipboardData({
        data: url,
        success: () => {
          wx.showToast({
            title: '链接已复制，去浏览器粘贴打开',
            icon: 'none',
            duration: 2600,
          })
        },
        fail: () => {
          // 复制失败时至少把地址展示出来，便于用户手动记下
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
