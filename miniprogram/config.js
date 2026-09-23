// config.js —— 由 config.ts 编译而来（构建产物）
var APP_CONFIG = {
  /**
   * 微信云开发环境 id。
   * 留空 = 不启用云开发，留言只保存在用户本机（见 utils/inquiry.js）。
   * 填入后即可把留言上报到云数据库，例如 'beige-prod-1a2b3c'。
   */
  cloudEnv: '',
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
