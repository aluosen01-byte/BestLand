// site.js —— 公司信息、品牌卖点、案例、推广矩阵
//
// 内容来源：《贝之然中英宣传册 v47（2026-10-28）》
// 与 v36 相比，v47 的变化：
//   · 封面改为「2026 宣传简介」，并拆出品牌标识页
//   · 产品优势由 4 条扩为 6 条，全部带量化指标
//   · 应用案例改为 5 个真实项目（含肇庆、梅州、厦门、深圳、安溪）
//   · 新增「推广矩阵」30 个渠道
//   · 联系页给出邮箱与创始人姓名

var SITE = {
  brand: '贝之然',
  brandEn: 'BEST LAND',
  deckYear: '2026',
  slogan: '纯无机 · 更耐火 · 更耐久',
  /** 品牌对外口号（宣传册原文） */
  motto: '一次接触 永不分离',
  // 宣传册原文拼作 SEPERATE，此处用正确拼写 SEPARATE
  mottoEn: 'ONCE CONTACT, NEVER SEPARATE',
  /** 封面三条支撑语（宣传册第 1 页） */
  coverTags: ['天然矿物 · 海洋贝壳', '生物活化工艺', '无机健康涂料领导品牌'],
  /** 封面特性行（宣传册第 1 页） */
  coverLine: '天然环保｜即刷即住｜耐水耐擦｜A1 级防火｜抗菌防霉',
  /** 品牌定位（宣传册第 3 页） */
  positioning: '外墙定制服务商',
  /** 品牌标识说明（宣传册第 3 页） */
  brandIdentity: '羽形标识由三色弧线组成，与「贝之然」中文标准字、「BEST LAND」英文标准字固定组合使用。标识与标准字不得拉伸、变形或改色；深色底使用反白版本。',
  company: '东莞市贝歌科技有限公司',
  companyEn: 'Dongguan BEIGE Technology Co., Ltd.',
  companyShort: '贝歌科技',
  /** 对接人（宣传册第 43 页） */
  contactName: '罗博荣',
  contactTitle: '品牌创始人',
  contactNameEn: 'Luo BoRong',
  phone: '13602629536',
  phoneText: '136 0262 9536',
  phoneIntl: '+86 136 0262 9536',
  /** 宣传册第 43 页公开的邮箱 */
  email: '954405791@qq.com',
  website: 'https://bestlandpaint.com/',
  websiteText: 'bestlandpaint.com',
  shop1688: 'https://bestlandpaint.1688.com/',
  address: '广东省东莞市大岭山镇莞长路杨屋段731号越秀大厦3楼',
  addressShort: '东莞市大岭山镇杨屋越秀大厦',
  workTime: '周一至周六 09:00 - 18:00',
  mpName: '贝之然',
  icp: '',
  sinceYear: new Date().getFullYear(),
  /** 品牌头图（关于我们页顶部，走服务器托管） */
  brandCover: 'https://senluoflow.com/video/cover/brand-cover.jpg',
  /** 品牌使命 */
  mission: '让建筑回归自然，做建筑与环境共生的缔造者',
  /** 品牌价值观 */
  valuesText: '诚信 · 创新 · 务实 · 求精',
  /** 经营理念 */
  philosophy: '以人民健康为第一要义，不断突破、和谐共赢',
}

/**
 * 产品六大优势（宣传册第 4 页，全部带量化指标）
 * no 用宣传册的橙色两位编号
 */
var FEATURES = [
  { no: '01', title: '环保零污染', desc: 'VOC、甲醛、苯系物未检出，达食品级安全标准' },
  { no: '02', title: '耐洗耐刷像陶瓷', desc: '耐擦洗 ≥10,000 次，泡水 168h 无软化' },
  { no: '03', title: 'A1 级防火', desc: '最高不燃等级，高温无有毒烟气' },
  { no: '04', title: '外墙耐老化', desc: '人工老化 3,000h，理论寿命 ≥50 年，与楼房同寿命' },
  { no: '05', title: '施工简单省钱', desc: '免腻子、免底漆，两遍喷涂成型，综合成本减少 30%' },
  { no: '06', title: '材料成本更低', desc: '比真石漆、仿石漆省 1/3，比水包砂省 1/2' },
]

/** 服务对象 / 适用场景 */
var SCENES = [
  '政府工程',
  '学校医院',
  '工业厂房',
  '商业空间',
  '住宅家装',
  '儿童房',
  '外墙定制',
  '旧墙翻新',
  '地坪',
  '防水',
]

/** 品牌资质亮点 */
var CREDENTIALS = [
  { value: '7', label: '项发明专利', desc: '含无机钙矾石涂料、无机隧道防火涂料、真石漆增强添加剂等' },
  { value: '3', label: '份检测报告', desc: 'CMA / CNAS 资质，A1 级不燃、有害物质限量、环保与耐久' },
  { value: 'ISO', label: '三体系认证', desc: '质量、环境、职业健康安全管理体系' },
  { value: '2', label: '项商标注册', desc: '第 2 类、第 35 类商标注册证' },
]

/** 国家发明专利（宣传册发明专利证书页） */
var PATENTS = [
  '一种复式无机钙矾石内外墙涂料',
  '一种无机隧道防火涂料',
  '一种户外专用水性环保防火木器漆及其制备方法',
  '一种船舶水线区专用水性防腐蚀涂料及其制备方法',
  '无机贝壳粉末涂料涂层增强稳定促进剂',
  '一种无机真石漆涂层增强稳定添加剂及制备方法',
  '一种速溶环保腻子胶粉',
]

/**
 * 外墙应用案例（宣传册第 11-16 页，均为现场实拍）
 * 括号内为做法说明
 */
var CASES_OUTER = [
  '肇庆市端州区波海蓝湾会所（会所外墙整体翻新，米白色无机饰面）',
  '梅州市大埔县茶阳镇茅坪文富村（村居外墙改造，旧墙直接喷涂两遍）',
  '厦门市集美区侨英街道项目（街道沿线立面，整体色调统一）',
  '深圳市宝安区溪头工业园（样板墙 + 外墙，旧墙直接喷涂）',
  '福建省安溪官岭（旧墙直接喷涂，不做整面铲除）',
]

/** 内墙应用案例（宣传册第 17 页） */
var CASES_INNER = ['广州市越秀区广州宾馆（客房与走廊内墙翻新，边施工边营业）']

/**
 * 厂房与产量（首页数据条）
 *
 * 数值与「永耐」小程序首页保持一致（同一自有厂房与产线口径）：
 *   自有厂房 4,000 ㎡ / 生产设备 10 台+ / 年产量 10,000 吨+ / 日产量 30 吨+
 * pending 为 false 时页面不显示占位提示。
 */
var PRODUCTION = [
  { value: '4,000', unit: '㎡', label: '自有厂房', en: 'Own plant' },
  { value: '10', unit: '台+', label: '生产设备', en: 'Equipment' },
  { value: '10,000', unit: '吨+', label: '年产量', en: 'Annual output' },
  { value: '30', unit: '吨+', label: '日产量', en: 'Daily output' },
]

/**
 * 首页快捷入口（对应「选品助手 / 免费寄样 / 关于贝之然」）
 * key 决定跳转目标，见 index.js goQuick
 */
var QUICK = [
  { no: '01', key: 'products', text: '全部产品', en: 'Products' },
  { no: '02', key: 'calculator', text: '选品助手', en: 'Selector' },
  { no: '03', key: 'sample', text: '免费寄样', en: 'Free sample' },
  { no: '04', key: 'about', text: '关于贝之然', en: 'About' },
]

/** 寄样说明（首页免费寄样入口下方） */
var SAMPLE_NOTE = '提交寄样申请后，由业务人员确认适配型号与寄送方式；样品与试刷不收费。'

/** 外墙标准做法（宣传册第 11 页「同一面墙的三个阶段」） */
var OUTER_STEPS = [
  { no: '01', title: '原始水泥砂浆墙面', desc: '抗裂防水砂浆找平，不刮腻子、不刷底漆' },
  { no: '02', title: '两遍喷涂施工', desc: '第一遍渗透封闭，第二遍成型' },
  { no: '03', title: '成品墙面', desc: '与墙体石化一体，越久越坚固' },
]

/**
 * 推广矩阵（宣传册第 37 页，共 30 个渠道）
 * 宣传册按左右两栏排版；此处按「国内 / 跨境」重新归类，便于阅读
 */
var PROMOTION = {
  domestic: [
    { no: '01', name: '企业官网', type: 'bestlandpaint.com' },
    { no: '02', name: '百度', type: '搜索引擎' },
    { no: '03', name: '1688', type: '电商平台' },
    { no: '04', name: '淘宝', type: '电商平台' },
    { no: '05', name: '京东', type: '电商平台' },
    { no: '06', name: '拼多多', type: '电商平台' },
    { no: '07', name: '今日头条', type: '社媒' },
    { no: '08', name: '百家号', type: '社媒' },
    { no: '09', name: '微信公众号', type: '社媒' },
    { no: '10', name: '哔哩哔哩', type: '视频平台' },
    { no: '11', name: '知乎', type: '社媒' },
    { no: '12', name: '大鱼号', type: '社媒' },
    { no: '13', name: '简书', type: '社媒' },
    { no: '14', name: '小红书', type: '社媒' },
    { no: '15', name: '微博', type: '社媒' },
    { no: '16', name: '百度百科', type: '百科' },
    { no: '17', name: '快手', type: '视频平台' },
    { no: '18', name: '抖音', type: '视频平台' },
    { no: '19', name: '买化塑', type: '电商平台' },
  ],
  overseas: [
    { no: '20', name: 'Google', type: '搜索引擎' },
    { no: '21', name: 'Amazon', type: '电商平台' },
    { no: '22', name: '全球速卖通', type: '电商平台' },
    { no: '23', name: 'Temu', type: '电商平台' },
    { no: '24', name: 'Facebook', type: '社媒' },
    { no: '25', name: 'Instagram', type: '社媒' },
    { no: '26', name: 'Twitter', type: '社媒' },
    { no: '27', name: 'YouTube', type: '视频平台' },
    { no: '28', name: 'LinkedIn', type: '社媒' },
    { no: '29', name: 'TikTok Shop', type: '电商平台' },
    { no: '30', name: 'Mercado', type: '电商平台' },
  ],
  account: '贝之然纯无机涂料',
  note: '图文与视频双线发布，2026 年完成矩阵搭建。',
}

module.exports = {
  SITE: SITE,
  FEATURES: FEATURES,
  SCENES: SCENES,
  CREDENTIALS: CREDENTIALS,
  PATENTS: PATENTS,
  CASES_OUTER: CASES_OUTER,
  CASES_INNER: CASES_INNER,
  OUTER_STEPS: OUTER_STEPS,
  PROMOTION: PROMOTION,
  PRODUCTION: PRODUCTION,
  QUICK: QUICK,
  SAMPLE_NOTE: SAMPLE_NOTE,
}
