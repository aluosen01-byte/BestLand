// share.js —— 转发 / 分享到朋友圈的统一配置
//
// 【为什么必须有这个文件】
// 微信官方规定：**只有页面定义了 onShareAppMessage，右上角菜单才会出现「转发」按钮**；
// onShareTimeline 同理，决定是否出现「分享到朋友圈」。
// 本项目所有页面都是用 Component() 构造的，因此这两个回调
// **必须写在 methods 里**（写在顶层不生效）。
//
// 【分享图片】imageUrl 支持网络图片，这里统一用服务器上的图，不占小程序包体积。
// 转发卡片显示比例 5:4，朋友圈显示 1:1。

/** 品牌通用图（朋友圈 1:1 与转发 5:4 都能用） */
var SHARE_BRAND = 'https://senluoflow.com/video/cover/brand-cover.jpg'

/** 朋友圈专用方图（1:1） */
var SHARE_TIMELINE = 'https://senluoflow.com/video/cover/brand-cover.jpg'

/** 各页面默认分享图 */
var IMG = {
  index: SHARE_BRAND,
  products: 'https://senluoflow.com/video/product/neiqiang-jiazhuang/cover.jpg',
  qualification: 'https://senluoflow.com/video/cert/a1-1.jpg',
  franchise: SHARE_BRAND,
  policy: SHARE_BRAND,
  about: SHARE_BRAND,
  contact: SHARE_BRAND,
  agreement: SHARE_BRAND,
  detail: SHARE_BRAND,
}

var APP_NAME = '贝之然纯无机涂料'

/**
 * 生成转发（右上角菜单 / button open-type="share"）配置
 * @param {string} key   页面标识
 * @param {object} opt   { title, path }
 */
function shareApp(key, opt) {
  opt = opt || {}
  var route = (opt.path || '/' + key).split('?')[0]
  return {
    title: opt.title || (APP_NAME + ' · 纯无机 · A1 级不燃'),
    path: opt.path || route,
    imageUrl: IMG[key] || SHARE_BRAND,
  }
}

/**
 * 生成分享到朋友圈配置
 * 注意：朋友圈不支持自定义 path，只能带 query
 * @param {string} key
 * @param {object} opt   { title, query }
 */
function shareTimeline(key, opt) {
  opt = opt || {}
  return {
    title: opt.title || (APP_NAME + ' · 纯无机 · A1 级不燃'),
    query: opt.query || '',
    imageUrl: SHARE_TIMELINE,
  }
}

module.exports = {
  APP_NAME: APP_NAME,
  SHARE_BRAND: SHARE_BRAND,
  SHARE_TIMELINE: SHARE_TIMELINE,
  IMG: IMG,
  shareApp: shareApp,
  shareTimeline: shareTimeline,
}
