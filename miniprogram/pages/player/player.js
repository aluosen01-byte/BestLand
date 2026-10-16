// player.js 视频播放页（web-view 内嵌网页播放器）
//
// 目的：让用户「点一下就直接看」，不需要复制链接到浏览器。
// 小程序里不能用代码直接打开外部网址（wx.openUrl 不适用于外站），
// 唯一可行的方式是用 web-view 内嵌一个网页，网页里放 HTML5 <video>。
//
// 需要先在微信公众平台把 senluoflow.com 加入「业务域名」，
// 否则 web-view 无法加载（页面底部会显示兜底提示）。
//
// 【注意】内嵌的是网页播放器，不是小程序的 <video> 组件，
// 因此不会触发「小程序提供视频播放服务」的资质要求。
const { VIDEO_BASE } = require('../../data/video')

/** 网页播放器地址：服务端返回一段带 <video> 的最小 HTML */
function buildPlayerUrl(file) {
  return VIDEO_BASE + 'play.html?f=' + encodeURIComponent(file)
}

Component({
  data: {
    title: '视频播放',
    file: '',
    playerUrl: '',
    failed: false,
  },

  methods: {
    // 页面生命周期：Component 构造页面时 onLoad 放在 methods 内
    onLoad(query) {
      const file = (query && query.file) || ''
      const title = query && query.title ? decodeURIComponent(query.title) : '视频播放'
      if (!file) {
        this.setData({ failed: true, title: title })
        return
      }
      this.setData({
        file: file,
        title: title,
        playerUrl: buildPlayerUrl(file),
        failed: false,
      })
    },

    /* ===== 转发 / 朋友圈 ===== */
    onShareAppMessage() {
      return {
        title: this.data.title || '贝之然产品视频',
        path: '/pages/player/player?file=' + encodeURIComponent(this.data.file) +
          '&title=' + encodeURIComponent(this.data.title || ''),
      }
    },

    onShareTimeline() {
      return { title: this.data.title || '贝之然产品视频' }
    },

    /* ===== web-view 事件（与页面 onLoad 区分开）===== */
    onViewLoad() {
      if (this.data.failed) this.setData({ failed: false })
    },

    onViewError(e) {
      console.error('[贝之然] 内嵌播放器加载失败', JSON.stringify((e && e.detail) || {}))
      this.setData({ failed: true })
    },

    /** 重新加载内嵌页面 */
    play() {
      if (!this.data.file) return
      this.setData({ playerUrl: buildPlayerUrl(this.data.file), failed: false })
    },

    copyUrl() {
      const url = VIDEO_BASE + this.data.file
      wx.setClipboardData({
        data: url,
        success: () =>
          wx.showToast({ title: '链接已复制，去浏览器打开', icon: 'none', duration: 2400 }),
        fail: () =>
          wx.showModal({ title: '视频地址', content: url, showCancel: false, confirmText: '知道了' }),
      })
    },
  },
})
