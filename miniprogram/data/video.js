// video.js —— 视频数据（短视频 · 竖屏 9:16）
//
// 【重要】微信小程序不允许用 IP 地址做资源域名，且必须 HTTPS + 受信任证书。
// 所以下面的 baseUrl 需要换成你自己的域名，并在微信公众平台把它加入
// 「开发管理 → 开发设置 → 服务器域名 → downloadFile 合法域名」。
//
// 当前的 47.107.190.235 存在两个硬性问题（见 README 视频一节）：
//   1. 是纯 IP，微信不接受；
//   2. 证书是自签的，微信校验证书链会失败。
// 换成域名 + Let's Encrypt 证书后，把 baseUrl 改掉即可全量生效。

var VIDEO_BASE = 'https://example.com/video/'

/** 视频清单：id 与压缩后的文件名一一对应 */
var VIDEOS = [
  {
    id: 'bzr-01',
    file: 'bzr-01.mp4',
    title: '把森林搬进家',
    sub: '品牌形象 · 纯无机涂料',
    series: [],
    cover: '/images/video/bzr-01.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-02',
    file: 'bzr-02.mp4',
    title: '硬核陶瓷甲',
    sub: '陶瓷级硬度 · 耐擦洗',
    series: ['neiqiang-jiazhuang', 'neiqiang-zhengfu'],
    cover: '/images/video/bzr-02.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-03',
    file: 'bzr-03.mp4',
    title: '刷新即享安心家',
    sub: '随刷随住 · 零污染',
    series: ['neiqiang-jiazhuang'],
    cover: '/images/video/bzr-03.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-04',
    file: 'bzr-04.mp4',
    title: '0 甲醛儿童房宝贝房专用',
    sub: '儿童房系列 · 食品级',
    series: ['ertongfang'],
    cover: '/images/video/bzr-04.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-05',
    file: 'bzr-05.mp4',
    title: '腻子膏修复底固专家',
    sub: '无机底固系列',
    series: ['wuji-digux', 'jiemianji'],
    cover: '/images/video/bzr-05.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-06',
    file: 'bzr-06.mp4',
    title: '抗污罩面隐形防弹衣',
    sub: '抗污罩面系列',
    series: ['kangwu-zhaomian'],
    cover: '/images/video/bzr-06.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-07',
    file: 'bzr-07.mp4',
    title: '仿石漆外墙神器',
    sub: '外墙系列 · 仿石漆',
    series: ['waqiang'],
    cover: '/images/video/bzr-07.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-08',
    file: 'bzr-08.mp4',
    title: '天冬聚脲地坪耐划甲',
    sub: '地坪漆系列',
    series: ['dipingqi'],
    cover: '/images/video/bzr-08.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-09',
    file: 'bzr-09.mp4',
    title: '天冬聚脲防水隐形盾',
    sub: '防水涂料系列',
    series: ['fangshui'],
    cover: '/images/video/bzr-09.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-10',
    file: 'bzr-10.mp4',
    title: '给家一口会呼吸的墙',
    sub: '家装内墙系列 · 负氧离子',
    series: ['neiqiang-jiazhuang'],
    cover: '/images/video/bzr-10.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-11',
    file: 'bzr-11.mp4',
    title: '仿石漆石材质感历久弥新',
    sub: '外墙系列 · 石材质感',
    series: ['waqiang'],
    cover: '/images/video/bzr-11.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-12',
    file: 'bzr-12.mp4',
    title: '真石漆一刷成石 30 年不褪色',
    sub: '真石漆',
    series: ['waqiang'],
    cover: '/images/video/bzr-12.jpg',
    seconds: 30,
  },
  {
    id: 'bzr-13',
    file: 'bzr-13.mp4',
    title: '旧墙改造极致性价比',
    sub: '旧墙翻新 · 综合成本省 30%',
    series: ['wuji-digux', 'jiemianji', 'waqiang'],
    cover: '/images/video/bzr-13.jpg',
    seconds: 30,
  },
]

/** 拼出可播放地址 */
function videoUrl(v) {
  return VIDEO_BASE + v.file
}

/** 某系列相关的视频（详情页用） */
function videosOfSeries(seriesId) {
  return VIDEOS.filter(function (v) {
    return v.series.indexOf(seriesId) >= 0
  })
}

/** 列表页用的数据：附带 url */
function videoList() {
  return VIDEOS.map(function (v) {
    return Object.assign({}, v, { url: videoUrl(v) })
  })
}

module.exports = {
  VIDEO_BASE: VIDEO_BASE,
  VIDEOS: VIDEOS,
  videoUrl: videoUrl,
  videosOfSeries: videosOfSeries,
  videoList: videoList,
}
