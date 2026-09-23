// videos.ts 视频中心（源码存档，当前未启用编译；生效的是 videos.js）
import { videoList } from '../../data/video'

Component({
  data: {
    videos: [] as ReturnType<typeof videoList>,
    current: null as ReturnType<typeof videoList>[number] | null,
    errorMsg: '',
  },

  lifetimes: {
    attached() {
      const list = videoList()
      this.setData({ videos: list, current: list.length ? list[0] : null })
    },
  },

  methods: {
    play(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset as { id: string }
      if (this.data.current && this.data.current.id === id) return
      const target = this.data.videos.filter((v) => v.id === id)[0]
      if (!target) return
      this.setData({ current: target, errorMsg: '' })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    onVideoError(e: WechatMiniprogram.CustomEvent) {
      console.error('[贝之然] 视频播放失败', JSON.stringify(e.detail || {}))
      this.setData({
        errorMsg:
          '视频暂时无法播放。可能是视频域名尚未加入微信公众平台的「downloadFile 合法域名」，或证书不受信任。请稍后再试，或直接联系我们索取视频。',
      })
    },
  },
})
