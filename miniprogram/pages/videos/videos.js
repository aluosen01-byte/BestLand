// videos.js 视频中心
const { videoList } = require('../../data/video')

Component({
  data: {
    videos: [],
    current: null,
    errorMsg: '',
  },

  lifetimes: {
    attached() {
      const list = videoList()
      this.setData({ videos: list, current: list.length ? list[0] : null })
    },
  },

  methods: {
    play(e) {
      const id = e.currentTarget.dataset.id
      if (this.data.current && this.data.current.id === id) return
      const target = this.data.videos.filter(function (v) {
        return v.id === id
      })[0]
      if (!target) return
      this.setData({ current: target, errorMsg: '' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    /**
     * 视频加载失败通常是这两个原因，给出可操作的提示而不是静默失败：
     * 1. 域名未加入 downloadFile 合法域名；
     * 2. 证书不受信任或用了 IP。
     */
    onVideoError(e) {
      console.error('[贝之然] 视频播放失败', JSON.stringify(e.detail || {}))
      this.setData({
        errorMsg:
          '视频暂时无法播放。可能是视频域名尚未加入微信公众平台的「downloadFile 合法域名」，或证书不受信任。请稍后再试，或直接联系我们索取视频。',
      })
    },
  },
})
