// config.js —— 由 config.ts 编译而来（构建产物）
var APP_CONFIG = {
  /**
   * 微信云开发环境 id。
   * 留空 = 不启用云开发（本项目改用自有服务器接口接收留言，见下方 inquiryApi）
   */
  cloudEnv: '',
  /**
   * 留言接收接口。提交后会 POST 到这里，企业后台即可收到。
   * 留空 = 只保存在用户本机（不推荐，会被审核判为无闭环）
   */
  inquiryApi: 'https://senluoflow.com/mp/inquiry',
  /** 是否需要用户授权后才可提交留言 */
  requireLogin: false,
  /** 首页轮播自动播放间隔（毫秒），0 表示不自动播放 */
  bannerInterval: 4000,
  /** 是否开启「长按图片保存到相册」 */
  enableLongPressSave: true,
}

/** 缺图时的占位图 */
var PLACEHOLDER_IMAGE = '/images/placeholder.svg'

module.exports = { APP_CONFIG, PLACEHOLDER_IMAGE }
