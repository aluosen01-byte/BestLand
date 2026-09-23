/// <reference path="./types/index.d.ts" />

declare global {
  interface IAppOption {
    globalData: {
      userInfo?: WechatMiniprogram.UserInfo
      site: import('../miniprogram/data/site').SiteInfo
      config: import('../miniprogram/config').AppConfig
      /** 状态栏高度（px），自定义导航栏使用 */
      statusBarHeight?: number
      /** 导航栏内容区高度（px） */
      navBarHeight?: number
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
    initCloud: () => void
    measureSystem: () => void
  }
}

export {}
