// tab-bar.js —— 由 tab-bar.ts 编译而来（构建产物）
//
// 为什么不用原生 tabBar：本项目启用了 Skyline 渲染，原生 tabBar 只支持
// PNG 图标（不支持纯文字 tab）。自定义 tabBar 用 SVG 图标，开箱即用。
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    /** 当前激活项：home | products | contact */
    active: {
      type: String,
      value: 'home',
    },
  },
  methods: {
    onTap(e) {
      var ds = e.currentTarget.dataset
      if (ds.key === this.data.active) return
      // 用 reLaunch 避免页面栈堆叠：底部导航等价于切换主页面
      wx.reLaunch({ url: ds.url })
    },
  },
})
