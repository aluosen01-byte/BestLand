// app.ts
import { APP_CONFIG } from './config'
import { SITE } from './data/site'

App<IAppOption>({
  globalData: {
    site: SITE,
    config: APP_CONFIG,
  },

  onLaunch() {
    // 启用云开发（配置了 cloudEnv 才会生效）
    this.initCloud()

    // 记录一次启动日志，保留模板的调试能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs.slice(0, 50))

    // 预取系统信息，供自定义导航栏使用
    this.measureSystem()
  },

  initCloud() {
    if (!APP_CONFIG.cloudEnv) return
    const wxAny = wx as unknown as {
      cloud?: { init: (o: Record<string, unknown>) => void }
    }
    if (!wxAny.cloud) {
      console.warn('[贝之然] 当前基础库不支持云开发，或未开启云开发能力')
      return
    }
    try {
      wxAny.cloud.init({ env: APP_CONFIG.cloudEnv, traceUser: true })
    } catch (e) {
      console.error('[贝之然] 云开发初始化失败', e)
    }
  },

  measureSystem() {
    const info = wx.getSystemInfoSync()
    const menu = wx.getMenuButtonBoundingClientRect()
    // 状态栏高度与胶囊按钮位置，供自定义导航栏做对齐
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.navBarHeight = (menu.top - info.statusBarHeight) * 2 + menu.height
  },
})