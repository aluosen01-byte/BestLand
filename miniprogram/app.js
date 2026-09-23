// app.js —— 由 app.ts 编译而来（构建产物）
// 本项目已改为「免构建」：同时提供 .js/.wxss，因此不依赖 typescript / less 编译器。
// 如果你更想改 .ts 源文件，请看 README「关于 .ts 与 .js」一节。
const { APP_CONFIG } = require('./config')
const { SITE } = require('./data/site')

App({
  globalData: {
    site: SITE,
    config: APP_CONFIG,
  },

  onLaunch() {
    // 启用云开发（配置了 cloudEnv 才会生效）
    this.initCloud()

    // 记录一次启动日志，保留模板的调试能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs.slice(0, 50))

    // 预取系统信息，供自定义导航栏使用
    this.measureSystem()
  },

  initCloud() {
    if (!APP_CONFIG.cloudEnv) return
    if (!wx.cloud) {
      console.warn('[贝之然] 当前基础库不支持云开发，或未开启云开发能力')
      return
    }
    try {
      wx.cloud.init({ env: APP_CONFIG.cloudEnv, traceUser: true })
    } catch (e) {
      console.error('[贝之然] 云开发初始化失败', e)
    }
  },

  measureSystem() {
    var info = wx.getSystemInfoSync()
    var menu = wx.getMenuButtonBoundingClientRect()
    // 状态栏高度与胶囊按钮位置，供自定义导航栏做对齐
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.navBarHeight = (menu.top - info.statusBarHeight) * 2 + menu.height
  },
})
