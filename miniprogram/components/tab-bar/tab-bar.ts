/**
 * tab-bar —— 自定义底部导航
 *
 * 为什么不用原生 tabBar：本项目启用了 Skyline 渲染，原生 tabBar 只支持
 * PNG 图标（不支持纯文字 tab），而我们无法把素材图拷进项目。
 * 自定义 tabBar 用 SVG 图标，开箱即用，也更好控制样式。
 *
 * 页面要做的只有两件事：
 *   1. json 里注册 "tab-bar": "/components/tab-bar/tab-bar"
 *   2. 页面底部放 <tab-bar active="home" /> ，并在 less 里 @import 其样式
 */
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
    onTap(e: WechatMiniprogram.TouchEvent) {
      const { key, url } = e.currentTarget.dataset as { key: string; url: string }
      if (key === this.data.active) return
      // 用 reLaunch 避免页面栈堆叠：底部导航等价于切换主页面
      wx.reLaunch({ url })
    },
  },
})
