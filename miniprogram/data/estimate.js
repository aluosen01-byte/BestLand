// estimate.js —— 选型与用量估算数据
//
// 用途：客户最常问「我这多少平方，要买几桶」。
// 本文件把各系列的理论涂布率与包装规格数值化，供「用量计算」页做估算。
//
// ⚠️ 涂布率来自产品说明的理论值（理想基层、标准施工）。
// 实际用量会因基层吸水率、施工方式、损耗而不同，页面必须提示「仅供估算」。

/** 各系列的单遍涂布率（㎡/kg）与包装规格（kg/桶） */
var RATES = {
  'neiqiang-jiazhuang': { coverage: 9, packSize: 10 },
  'neiqiang-dazhonghua': { coverage: 9, packSize: 20 },
  'neiqiang-zhengfu': { coverage: 9, packSize: 20 },
  ertongfang: { coverage: 9, packSize: 5 },
  waqiang: { coverage: 7, packSize: 20 },
  fangshui: { coverage: 0.57, packSize: 20 }, // 约 1.75 kg/㎡
  dipingqi: { coverage: 2.5, packSize: 20 }, // 约 0.4 kg/㎡·遍
  'kangwu-zhaomian': { coverage: 11, packSize: 20 },
  'wuji-digux': { coverage: 11, packSize: 25 },
  jiemianji: { coverage: 9, packSize: 20 },
  qiangmianji: { coverage: 0.57, packSize: 20 }, // 约 1.75 kg/㎡
}

/**
 * 施工场景
 * base / prime 为建议的配套底涂（可选）
 * top 为面漆系列
 */
var SCENARIOS = [
  {
    key: 'jiazhuang',
    allowTopcoat: true,
    name: '家装内墙',
    desc: '卧室 · 客厅 · 书房',
    top: 'neiqiang-jiazhuang',
    topCoats: 2,
    primer: 'wuji-digux',
    primerCoats: 1,
    note: '新墙可直接施工；旧墙起砂建议先做界面剂处理。',
  },
  {
    key: 'ertong',
    allowTopcoat: true,
    name: '儿童房',
    desc: '儿童房 · 幼儿园',
    top: 'ertongfang',
    topCoats: 2,
    primer: 'wuji-digux',
    primerCoats: 1,
    note: '食品级环保，当天刷当天住；建议搭配底固提升附着力。',
  },
  {
    key: 'gongcheng',
    allowTopcoat: true,
    name: '工程内墙',
    desc: '厂房 · 办公 · 宿舍',
    top: 'neiqiang-dazhonghua',
    topCoats: 2,
    primer: 'wuji-digux',
    primerCoats: 1,
    note: '大面积批量施工，性价比优先。',
  },
  {
    key: 'gongjian',
    allowTopcoat: true,
    name: '公共建筑内墙',
    desc: '学校 · 医院 · 政务',
    top: 'neiqiang-zhengfu',
    topCoats: 2,
    primer: 'wuji-digux',
    primerCoats: 1,
    note: 'A1 级不燃，符合人员密集场所墙面强制要求。',
  },
  {
    key: 'waiqiang',
    allowTopcoat: true,
    name: '外墙',
    desc: '住宅 · 厂房 · 公建立面',
    top: 'waqiang',
    topCoats: 2,
    primer: 'wuji-digux',
    primerCoats: 1,
    note: '免腻子、免底漆，直接喷涂在抗裂防水砂浆上，两遍成型。',
  },
  {
    key: 'fangshui',
    allowTopcoat: false,
    name: '防水',
    desc: '屋面 · 厨卫 · 地下室',
    top: 'fangshui',
    topCoats: 2,
    primer: '',
    primerCoats: 0,
    note: '潮湿基面可施工；建议两遍交叉涂刷。',
  },
  {
    key: 'diping',
    allowTopcoat: false,
    name: '地坪',
    desc: '车间 · 车库 · 仓库',
    top: 'dipingqi',
    topCoats: 2,
    primer: '',
    primerCoats: 0,
    note: '基层需干燥、无油污；建议两遍成活。',
  },
  {
    key: 'jiuqiang',
    allowTopcoat: true,
    name: '旧墙翻新',
    desc: '起砂 · 空鼓 · 旧漆面',
    top: 'neiqiang-jiazhuang',
    topCoats: 2,
    primer: 'jiemianji',
    primerCoats: 1,
    note: '旧墙需先做界面剂增强粘结，起砂严重再补无机底固。',
  },
]

/** 可选的抗污罩面（公共区域、易脏位置建议加） */
var TOPCOAT = 'kangwu-zhaomian'

module.exports = {
  RATES: RATES,
  SCENARIOS: SCENARIOS,
  TOPCOAT: TOPCOAT,
}
