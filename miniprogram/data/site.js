// site.js —— 由 site.ts 编译而来（构建产物）
//
// 内容来自《贝之然中英宣传册 v36》与用户确认，已核对。

var SITE = {
  brand: '贝之然',
  brandEn: 'BEST LAND',
  slogan: '纯无机 · 更耐火 · 更耐久',
  /** 品牌对外口号（宣传册原文） */
  motto: '一次接触 永不分离',
  mottoEn: 'ONCE CONTACT, NEVER SEPARATE',
  positioning: '专注纯无机建筑涂料，服务工程与家装全场景',
  company: '东莞市贝歌科技有限公司',
  companyEn: 'Dongguan BEIGE Technology Co., Ltd.',
  companyShort: '贝歌科技',
  /** 对接人 */
  contactName: '罗博荣',
  /** 对接人身份 */
  contactTitle: '品牌创始人',
  phone: '13602629536',
  phoneText: '136 0262 9536',
  // 宣传册里是个人 QQ 邮箱，未放上小程序；如需公开展示请填写企业邮箱
  email: '',
  website: 'https://bestlandpaint.com/',
  websiteText: 'bestlandpaint.com',
  shop1688: 'https://bestlandpaint.1688.com/',
  address: '广东省东莞市大岭山镇莞长路杨屋段731号越秀大厦3楼',
  workTime: '周一至周六 09:00 - 18:00',
  mpName: '贝之然',
  icp: '',
  sinceYear: new Date().getFullYear(),
  /** 品牌使命 */
  mission: '让建筑回归自然，做建筑与环境共生的缔造者',
  /** 品牌价值观 */
  valuesText: '诚信 · 创新 · 务实 · 求精',
  /** 经营理念 */
  philosophy: '以人民健康为第一要义，不断突破、和谐共赢',
}

/**
 * 品牌核心卖点（首页展示）
 * 数据来自宣传册第 4 页「产品优势」，均有检测依据
 */
var FEATURES = [
  { no: 'A1', title: 'A1 级不燃', desc: '最高不燃等级，高温下不释放有毒烟气' },
  { no: '0', title: 'VOC 未检出', desc: '国家建材检测中心未检出 VOC、甲醛、苯系物' },
  { no: '1万', title: '耐擦洗 1 万次', desc: '泡水 168h 不软化，陶瓷级硬度' },
  { no: '50', title: '寿命 ≥50 年', desc: '人工老化 3000h，与楼房同寿命' },
]

/** 服务对象 */
var SCENES = [
  '政府工程',
  '学校医院',
  '商业空间',
  '工业厂房',
  '住宅家装',
  '儿童房',
  '旧墙改造',
  '外墙定制',
]

/** 品牌资质亮点（首页 / 关于页） */
var CREDENTIALS = [
  { value: '7', label: '项发明专利', desc: '含无机钙矾石涂料、无机隧道防火涂料、真石漆增强添加剂等' },
  { value: '3', label: '份检测报告', desc: 'A1 级不燃、有害物质限量、环保与耐久' },
  { value: 'ISO', label: '三体系认证', desc: '质量、环境、职业健康安全管理体系' },
  { value: '2', label: '项商标注册', desc: '第 2 类、第 35 类商标注册证' },
]

/** 国家发明专利（宣传册第 8 页原文） */
var PATENTS = [
  '一种复式无机钙矾石内外墙涂料',
  '一种无机隧道防火涂料',
  '一种户外专用水性环保防火木器漆及其制备方法',
  '一种船舶水线区专用水性防腐蚀涂料及其制备方法',
  '无机贝壳粉末涂料涂层增强稳定促进剂',
  '一种无机真石漆涂层增强稳定添加剂及制备方法',
  '一种速溶环保腻子胶粉',
]

/** 外墙应用案例（宣传册第 13-15 页） */
var CASES_OUTER = [
  '梅州市大埔县茶阳镇茅坪文富村',
  '广东省肇庆市端州区城西街道办波海蓝湾会所',
  '厦门市集美区侨英街道项目',
  '深圳市宝安区溪头工业园外墙',
]

/** 内墙应用案例（宣传册第 16 页） */
var CASES_INNER = ['广州市越秀区广州宾馆内墙']

module.exports = {
  SITE: SITE,
  FEATURES: FEATURES,
  SCENES: SCENES,
  CREDENTIALS: CREDENTIALS,
  PATENTS: PATENTS,
  CASES_OUTER: CASES_OUTER,
  CASES_INNER: CASES_INNER,
}
