// share.js —— 转发 / 分享到朋友圈的统一配置
//
// 【为什么必须有这个文件】
// 微信官方规定：**只有页面定义了 onShareAppMessage，右上角菜单才会出现「转发」按钮**；
// onShareTimeline 同理，决定是否出现「分享到朋友圈」。
// 本项目所有页面都是用 Component() 构造的，因此这两个回调
// **必须写在 methods 里**（写在顶层不生效）。
//
// 【分享图片规格】—— 这是这次优化的重点
// 转发给朋友的卡片是 **5:4**（微信会按 5:4 裁切），朋友圈是 **1:1**。
// 之前用的是 1:1 的商品图和竖版资质图，被裁切后主体缺失、也没有品牌信息，
// 所以在服务器上放了两张专门的分享图（均由 v47 品牌资产生成）：
//   share-app.jpg      800×640（5:4）  转发给朋友
//   share-timeline.jpg 800×800（1:1）  分享到朋友圈
// 两张都是「白底 + 橙色斜线 + logo + 口号」的统一构图，缩到聊天列表里也能看清。

/** 转发给朋友专用图（5:4） */
var SHARE_APP = 'https://senluoflow.com/video/cover/share-app.jpg'

/** 分享到朋友圈专用图（1:1） */
var SHARE_TIMELINE = 'https://senluoflow.com/video/cover/share-timeline.jpg'

/**
 * 各页面默认分享图
 * 统一用品牌图，避免商品图 / 竖版资质图被 5:4 裁切后主体缺失。
 * 详情页会按系列单独传 imageUrl（见 detail.js）。
 */
var IMG = {
  index: SHARE_APP,
  products: SHARE_APP,
  calculator: SHARE_APP,
  qualification: SHARE_APP,
  franchise: SHARE_APP,
  policy: SHARE_APP,
  about: SHARE_APP,
  contact: SHARE_APP,
  agreement: SHARE_APP,
  detail: SHARE_APP,
  messages: SHARE_APP,
  logs: SHARE_APP,
}

var APP_NAME = '贝之然纯无机涂料'

/** 默认转发标题：控制在 30 字内，微信卡片不会截断 */
var DEFAULT_TITLE = '贝之然纯无机涂料 · A1 级不燃 · 与楼房同寿命'

/**
 * 生成转发（右上角菜单 / button open-type="share"）配置
 * @param {string} key   页面标识
 * @param {object} opt   { title, path, imageUrl }
 */
function shareApp(key, opt) {
  opt = opt || {}
  var route = (opt.path || '/' + key).split('?')[0]
  return {
    title: opt.title || DEFAULT_TITLE,
    path: opt.path || route,
    imageUrl: opt.imageUrl || IMG[key] || SHARE_APP,
  }
}

/**
 * 生成分享到朋友圈配置
 * 注意：朋友圈不支持自定义 path，只能带 query
 * @param {string} key
 * @param {object} opt   { title, query, imageUrl }
 */
function shareTimeline(key, opt) {
  opt = opt || {}
  return {
    title: opt.title || DEFAULT_TITLE,
    query: opt.query || '',
    imageUrl: opt.imageUrl || SHARE_TIMELINE,
  }
}

module.exports = {
  APP_NAME: APP_NAME,
  SHARE_APP: SHARE_APP,
  SHARE_BRAND: SHARE_APP,
  SHARE_TIMELINE: SHARE_TIMELINE,
  IMG: IMG,
  shareApp: shareApp,
  shareTimeline: shareTimeline,
}
