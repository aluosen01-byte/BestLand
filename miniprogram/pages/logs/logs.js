// logs.js —— 由 logs.ts 编译而来（构建产物）｜启动日志
const { formatTime } = require('../../utils/util')

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
})
