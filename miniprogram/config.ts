/**
 * config.ts —— 运行配置
 *
 * 这里集中放置需要你确认的开关，避免散落在各页面里。
 */

export interface AppConfig {
  /**
   * 微信云开发环境 id。
   * 留空 = 不启用云开发（本项目改用自有服务器接口接收留言，见 inquiryApi）。
   */
  cloudEnv: string
  /**
   * 留言接收接口。提交后会 POST 到这里，企业后台即可收到。
   * 留空 = 只保存在用户本机（不推荐，会被审核判为无闭环）。
   */
  inquiryApi: string
  /**
   * 是否需要用户授权后才可提交留言。
   * false = 任何人都能提交（转化率更高，推荐）。
   */
  requireLogin: boolean
  /** 首页轮播自动播放间隔（毫秒），0 表示不自动播放 */
  bannerInterval: number
  /** 是否开启「长按图片保存到相册」 */
  enableLongPressSave: boolean
}

export const APP_CONFIG: AppConfig = {
  cloudEnv: '',
  inquiryApi: 'https://senluoflow.com/mp/inquiry',
  requireLogin: false,
  bannerInterval: 4000,
  enableLongPressSave: true,
}

/** 缺图时的占位图 */
export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'
