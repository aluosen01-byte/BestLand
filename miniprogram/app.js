// app.js 应用入口
//
// 【重要】启动阶段的任何异常都会导致整个小程序白屏，
// 所以 onLaunch 内部全部加了容错：拿不到系统信息 / 胶囊按钮信息时
// 使用安全默认值，绝不抛错。
const { APP_CONFIG } = require('./config')
const { SITE } = require('./data/site')

/** 默认导航栏高度（rpx→px 前的 px 值），拿不到真实值时使用 */
const DEFAULT_NAV_BAR_HEIGHT = 44

App({
  globalData: {
    site: SITE,
    config: APP_CONFIG,
    statusBarHeight: 20,
    navBarHeight: DEFAULT_NAV_BAR_HEIGHT,
  },

  onLaunch() {
    // 逐项 try，任何一步失败都不能影响启动
    try {
      this.initCloud()
    } catch (e) {
      console.error('[贝之然] 云开发初始化异常', e)
    }

    try {
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs.slice(0, 50))
    } catch (e) {
      // 存储异常忽略
    }

    try {
      this.measureSystem()
    } catch (e) {
      console.error('[贝之然] 系统信息读取失败，使用默认值', e)
    }
  },

  onError(err) {
    // 兜底记录，便于在开发者工具里定位
    console.error('[贝之然] 运行异常', err)
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

  /**
   * 读取状态栏高度与胶囊按钮位置，供自定义导航栏对齐。
   * 注意：wx.getMenuButtonBoundingClientRect() 在窗口未就绪或旧基础库上
   * 可能不存在、也可能返回 undefined —— 必须容错，否则白屏。
   */
  measureSystem() {
    var info = {}
    try {
      info = wx.getSystemInfoSync() || {}
    } catch (e) {
      info = {}
    }

    var statusBarHeight =
      typeof info.statusBarHeight === 'number' && info.statusBarHeight >= 0
        ? info.statusBarHeight
        : 20
    this.globalData.statusBarHeight = statusBarHeight

    var navBarHeight = DEFAULT_NAV_BAR_HEIGHT
    try {
      var menu =
        typeof wx.getMenuButtonBoundingClientRect === 'function'
          ? wx.getMenuButtonBoundingClientRect()
          : null
      if (menu && typeof menu.top === 'number' && typeof menu.height === 'number') {
        var h = (menu.top - statusBarHeight) * 2 + menu.height
        if (h > 0 && h < 200) navBarHeight = h
      }
    } catch (e) {
      // 忽略，用默认值
    }
    this.globalData.navBarHeight = navBarHeight
  },
})
