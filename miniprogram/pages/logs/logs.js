// logs.js —— 由 logs.ts 编译而来（构建产物）｜启动日志
const { formatTime } = require('../../utils/util')
const { shareApp, shareTimeline } = require('../../utils/share')

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map(function (log) {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log,
          }
        }),
      })
    },
  },

  methods: {
    /* ===== 转发 / 朋友圈：必须定义才能让右上角菜单出现「转发」 ===== */
    onShareAppMessage() {
      return shareApp('logs', { title: '贝之然 · 启动日志' })
    },

    onShareTimeline() {
      return shareTimeline('logs', { title: '贝之然 · 启动日志' })
    },
  },
})
