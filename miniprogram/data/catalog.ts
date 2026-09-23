/**
 * catalog.ts —— 贝之然产品目录（源码存档，当前未启用编译）
 *
 * ⚠️ 本文件不参与编译，实际生效的是同目录的 catalog.js。改动请改 catalog.js。
 *
 * 【图片现状】素材已实际导入，路径以 catalog.js 为准：
 *   images/products/<系列id>/1..8.jpg   产品图（已压缩为 JPEG）
 *   images/products/<系列id>/cover.jpg  系列封面
 *   images/certs/a1-*.jpg hb-*.jpg yx-*.jpg iso-*.jpg   检测报告与认证
 *   images/brand/cover.jpg              品牌头图
 * 商标注册证（tm-2.jpg / tm-35.jpg）暂时缺图，页面会显示占位块。
 *
 * 【重要】产品型号（如“贝之然无机内墙漆 18kg”）我无法从图片中读取，
 * 因此每个系列先给出「系列名 + 编号」的占位条目。请把 model 字段
 * 替换为真实型号，并把 hasRealModels 改为 true；或把清单发给我批量写入。
 */

/** 产品系列 */
export interface Series {
  /** 系列唯一 id，同时是图片目录名 */
  id: string
  /** 系列名称 */
  name: string
  /** 一句话定位 */
  tagline: string
  /** 详细介绍 */
  desc: string
  /** 核心卖点标签 */
  tags: string[]
  /** 适用场景 */
  scenes: string[]
  /** 示意技术参数（🟡 占位数据，请以实际检测报告 / TDS 为准后替换） */
  specs: Spec[]
  /** 本系列产品图张数，决定 images/products/<id>/1..N.png */
  imageCount: number
  /** 强调色，用于卡片装饰 */
  accent: 'brand' | 'accent'
  /** 型号编码前缀，用于生成占位型号 */
  code: string
  /** 是否已录入真实型号（false 时列表会标注“型号待补充”） */
  hasRealModels: boolean
}

export interface Spec {
  label: string
  value: string
}

/** 单品（型号） */
export interface Product {
  id: string
  /** 所属系列 id */
  seriesId: string
  /** 系列名（冗余，便于列表直接展示） */
  seriesName: string
  /** 🟡 产品型号名 —— 请替换为真实名称 */
  model: string
  /** 🟡 规格 / 净含量 —— 请替换为真实规格 */
  spec: string
  /** 检索用关键词 */
  keywords: string
}

/** 资质证书 */
export interface Cert {
  id: string
  title: string
  issuer: string
  /** 证书编号 / 报告编号 */
  code: string
  /** 结论摘要 */
  conclusion: string
  /** 图片路径（多页证书放同一目录用页码命名） */
  images: string[]
  /** 缩略图 */
  thumb: string
  /** 分类 */
  category: '检测报告' | '体系认证' | '知识产权'
}

/* ------------------------------------------------------------------ */
/* 系列定义                                                            */
/* ------------------------------------------------------------------ */

export const SERIES_LIST: Series[] = [
  {
    id: 'neiqiang-jiazhuang',
    code: 'JZ',
    name: '家装内墙系列',
    tagline: '把森林的呼吸，搬回家里的墙',
    desc:
      '面向家庭装修的纯无机内墙涂料。以无机矿物为成膜物质，水性体系，不添加甲醛、苯系物与可挥发性有机化合物，涂装后气味清新、可快速入住。涂层呈微孔透气结构，可调节室内湿度，抑制霉斑滋生。',
    tags: ['零甲醛添加', '透气调湿', '防霉抗碱', '耐擦洗'],
    scenes: ['卧室', '客厅', '书房', '旧房翻新'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '成膜物质', value: '无机矿物' },
      { label: '光泽', value: '哑光' },
      { label: '理论涂布率', value: '约 8-10 ㎡/kg（单遍）' },
      { label: '包装规格', value: '5kg / 18kg' },
      { label: '执行标准', value: 'GB 18582-2020' },
    ],
  },
  {
    id: 'neiqiang-dazhonghua',
    code: 'GC',
    name: '大众化工程内墙系列',
    tagline: '工程批量的稳定选择',
    desc:
      '为批量工程涂装开发的经济型无机内墙涂料。遮盖力强、施工宽容度高，支持辊涂、刷涂与喷涂，适配大面积流水施工。在保证环保指标的同时控制综合造价，适合保障房、办公楼、厂房宿舍等大体量项目。',
    tags: ['高遮盖', '易施工', '造价友好', '批次稳定'],
    scenes: ['办公楼', '厂房宿舍', '保障房', '学校'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '成膜物质', value: '无机矿物复合' },
      { label: '光泽', value: '哑光' },
      { label: '理论涂布率', value: '约 8-10 ㎡/kg（单遍）' },
      { label: '包装规格', value: '18kg / 25kg' },
      { label: '执行标准', value: 'GB 18582-2020' },
    ],
  },
  {
    id: 'neiqiang-zhengfu',
    code: 'ZF',
    name: '政府工程内墙系列',
    tagline: '公建项目的合规之选',
    desc:
      '面向政府投资工程、公共建筑的内墙涂装方案。全套检测报告齐备，可提供 A1 级不燃性、有害物质限量与环保耐久性能报告，满足公建项目对防火等级、环保指标与资料完整性的严格要求。',
    tags: ['A1 级不燃', '报告齐备', '低 VOC', '防火阻燃'],
    scenes: ['政务大厅', '学校', '医院', '文体场馆'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '燃烧性能', value: 'A1 级（GB 8624）' },
      { label: '光泽', value: '哑光' },
      { label: '理论涂布率', value: '约 8-10 ㎡/kg（单遍）' },
      { label: '包装规格', value: '18kg / 25kg' },
      { label: '执行标准', value: 'GB 18582-2020' },
    ],
  },
  {
    id: 'ertongfang',
    code: 'ET',
    name: '儿童房系列',
    tagline: '给孩子一面会呼吸的墙',
    desc:
      '针对儿童房与幼儿园场景优化的无机内墙涂料。原料端严控重金属与有害物，通过有害物质限量检测；涂层耐污易擦洗，可反复清洁涂鸦痕迹而不损伤漆膜，兼顾安全性与日常打理的便利。',
    tags: ['重金属未检出', '耐污易擦洗', '防霉', '无刺激性气味'],
    scenes: ['儿童房', '幼儿园', '亲子空间', '月子中心'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '成膜物质', value: '无机矿物' },
      { label: '光泽', value: '哑光' },
      { label: '耐污性', value: '可湿布擦洗' },
      { label: '包装规格', value: '5kg / 18kg' },
      { label: '执行标准', value: 'GB 18582-2020' },
    ],
  },
  {
    id: 'waqiang',
    code: 'WQ',
    name: '外墙系列',
    tagline: '经得住日晒雨淋的矿物面',
    desc:
      '用于建筑外墙的无机涂料。无机成膜体系对紫外线与酸碱侵蚀耐受性优异，不因日照而粉化、不因雨水而泛白，与水泥基基层结合牢固，适合长期暴露于户外的建筑立面。',
    tags: ['抗紫外', '耐候耐久', '抗泛白', '附着力强'],
    scenes: ['住宅外墙', '厂房外墙', '公共建筑', '旧墙翻新'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '成膜物质', value: '无机矿物' },
      { label: '耐候性', value: '优（不粉化）' },
      { label: '理论涂布率', value: '约 6-8 ㎡/kg（单遍）' },
      { label: '包装规格', value: '18kg / 25kg' },
      { label: '执行标准', value: 'GB/T 9755-2014' },
    ],
  },
  {
    id: 'fangshui',
    code: 'FS',
    name: '防水涂料系列',
    tagline: '先堵住水，再谈好看',
    desc:
      '用于屋面、厨卫、地下空间的水性防水涂料。固化后形成连续致密的防水膜，与混凝土基层粘结牢固，可在潮湿基面施工，减少工期等待；同时具备一定柔韧性，可覆盖基层细微裂缝。',
    tags: ['水性环保', '潮湿基面可施工', '柔韧抗裂', '粘结牢固'],
    scenes: ['屋面', '卫生间', '厨房', '地下室'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '水性防水涂料' },
      { label: '参考用量', value: '约 1.5-2.0 kg/㎡' },
      { label: '干燥时间', value: '表干 ≤ 4h' },
      { label: '包装规格', value: '10kg / 20kg' },
      { label: '执行标准', value: 'GB/T 23445-2009' },
    ],
  },
  {
    id: 'dipingqi',
    code: 'DP',
    name: '地坪漆系列',
    tagline: '让地面扛住推车与时间',
    desc:
      '面向工业与商业地面的地坪涂装材料。涂膜致密、耐磨抗压，可承受叉车与推车反复碾压；表面易清洁，不易起尘起砂，适合对洁净度与耐用性同时有要求的场所。',
    tags: ['耐磨抗压', '易清洁', '不起尘', '附着力强'],
    scenes: ['车间', '仓库', '停车场', '商场'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '水性 / 溶剂型' },
      { label: '耐磨性', value: '≤ 0.03 g（750g/500r）' },
      { label: '参考用量', value: '约 0.3-0.5 kg/㎡·遍' },
      { label: '包装规格', value: '20kg' },
      { label: '执行标准', value: 'GB/T 22374-2018' },
    ],
  },
  {
    id: 'kangwu-zhaomian',
    code: 'ZW',
    name: '抗污罩面系列',
    tagline: '一层透明的保护层',
    desc:
      '用于涂料面层的透明保护材料。罩面后显著降低墙面吸水率，酱油、咖啡、笔迹等污渍不易渗入漆膜，擦拭即可清除；同时提升面层耐水与耐沾污性能，延长整体涂装寿命。',
    tags: ['抗污易洁', '透明不影响色泽', '耐水', '延长寿命'],
    scenes: ['走廊', '公共区域', '餐厅', '墙面保护'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '水性透明罩面' },
      { label: '光泽', value: '哑光 / 半光' },
      { label: '理论涂布率', value: '约 10-12 ㎡/kg' },
      { label: '包装规格', value: '5kg / 18kg' },
      { label: '执行标准', value: 'GB/T 9756-2018' },
    ],
  },
  {
    id: 'wuji-digux',
    code: 'DG',
    name: '无机底固系列',
    tagline: '好面子，先有好底子',
    desc:
      '墙面处理的基层加固与封闭材料。深入渗透疏松基层，将起砂、掉粉的墙面重新固结；封闭基层毛细孔，减少面层涂料被基层过度吸收，从而提升面漆遮盖力与整体附着力。',
    tags: ['深层渗透', '加固起砂基层', '封闭抗碱', '提升附着力'],
    scenes: ['旧墙翻新', '砂浆基层', '混凝土基层', '石膏板'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '无机底涂 / 加固剂' },
      { label: '理论涂布率', value: '约 10-12 ㎡/kg' },
      { label: '干燥时间', value: '表干 ≤ 2h' },
      { label: '包装规格', value: '5kg / 18kg' },
      { label: '执行标准', value: 'JG/T 210-2018' },
    ],
  },
  {
    id: 'jiemianji',
    code: 'JM',
    name: '界面剂系列',
    tagline: '让新旧基层牢牢咬合',
    desc:
      '用于不同基层之间的界面处理，改善新旧材料之间的粘结性能。涂刷后形成均匀的粘结桥接层，有效降低腻子、砂浆或涂料空鼓、脱层的风险。',
    tags: ['增强粘结', '防止空鼓', '施工便捷', '水性无味'],
    scenes: ['腻子施工前', '瓷砖翻新', '旧墙改造', '保温基层'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '水性界面处理剂' },
      { label: '理论涂布率', value: '约 8-10 ㎡/kg' },
      { label: '干燥时间', value: '表干 ≤ 2h' },
      { label: '包装规格', value: '5kg / 18kg' },
      { label: '执行标准', value: 'JG/T 468-2015' },
    ],
  },
  {
    id: 'qiangmianji',
    code: 'QM',
    name: '墙面剂系列',
    tagline: '一抹平，才有一面净',
    desc:
      '墙面找平与基层处理材料，用于填补基层孔洞、平整墙面，为面漆提供均匀细腻的施工基底。批刮顺滑、干后强度高，打磨后表面平整，能明显提升面漆的最终观感。',
    tags: ['批刮顺滑', '干后强度高', '易打磨', '找平效果好'],
    scenes: ['室内找平', '腻子层', '基层修补', '精装修'],
    // 素材里这一系列只有 5 张图
    imageCount: 5,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '类型', value: '水性墙面处理剂' },
      { label: '理论涂布率', value: '约 1.5-2.0 kg/㎡' },
      { label: '可打磨时间', value: '约 24h' },
      { label: '包装规格', value: '20kg' },
      { label: '执行标准', value: 'JG/T 298-2010' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* 单品：由系列自动生成占位型号                                        */
/* ------------------------------------------------------------------ */

const SPEC_CYCLE = ['5kg', '18kg', '20kg', '25kg']

/** 每个系列展示的占位单品数量 */
const PER_SERIES = 4

function buildProducts(): Product[] {
  const list: Product[] = []
  SERIES_LIST.forEach((s) => {
    for (let i = 1; i <= PER_SERIES; i++) {
      list.push({
        id: `${s.id}-p${i}`,
        seriesId: s.id,
        seriesName: s.name,
        // 🟡 占位型号，请替换为真实型号
        model: `${s.name.replace('系列', '')} ${s.code}-${String(i).padStart(2, '0')}`,
        spec: SPEC_CYCLE[(i - 1) % SPEC_CYCLE.length],
        keywords: `${s.name} ${s.tags.join(' ')}`,
      })
    }
  })
  return list
}

export const PRODUCTS: Product[] = buildProducts()

/* ------------------------------------------------------------------ */
/* 资质证书                                                            */
/* ------------------------------------------------------------------ */

const CERT_DIR = '/images/certs/'

export const CERTS: Cert[] = [
  {
    id: 'a1-buran',
    title: '纯无机涂料 A1 级不燃性检测报告',
    issuer: '上海华慧检测技术有限公司',
    code: '2022070388',
    conclusion: '燃烧性能达到 A1 级',
    images: [`${CERT_DIR}a1-1.png`, `${CERT_DIR}a1-2.png`, `${CERT_DIR}a1-3.png`],
    thumb: `${CERT_DIR}a1-1.png`,
    category: '检测报告',
  },
  {
    id: 'huanbao-naiyong',
    title: '纯无机涂料环保性能与耐久性能综合检测报告',
    issuer: '深圳市计量质量检测研究院',
    code: 'WT20103221065631WT1',
    conclusion: '环保性能与耐久性能检测合格',
    images: [
      `${CERT_DIR}hb-1.png`,
      `${CERT_DIR}hb-2.png`,
      `${CERT_DIR}hb-3.png`,
      `${CERT_DIR}hb-4.png`,
      `${CERT_DIR}hb-5.png`,
    ],
    thumb: `${CERT_DIR}hb-1.png`,
    category: '检测报告',
  },
  {
    id: 'youhai-xianliang',
    title: '建筑用墙面涂料中有害物质限量检测报告',
    issuer: '化学工业合成材料老化质量监督检验中心',
    code: 'FX26010300',
    conclusion: '有害物质限量符合标准要求',
    images: [
      `${CERT_DIR}yx-1.png`,
      `${CERT_DIR}yx-2.png`,
      `${CERT_DIR}yx-3.png`,
      `${CERT_DIR}yx-4.png`,
    ],
    thumb: `${CERT_DIR}yx-1.png`,
    category: '检测报告',
  },
  {
    id: 'iso',
    title: 'ISO 三体系认证',
    issuer: '第三方认证机构',
    code: '',
    conclusion: '质量、环境、职业健康安全管理体系认证',
    images: [`${CERT_DIR}iso-1.png`, `${CERT_DIR}iso-2.png`, `${CERT_DIR}iso-3.png`],
    thumb: `${CERT_DIR}iso-1.png`,
    category: '体系认证',
  },
  {
    id: 'tm-2',
    title: '“贝之然”商标注册证（第 2 类）',
    issuer: '国家知识产权局',
    code: '67583611',
    conclusion: '第 2 类：颜料、清漆、漆等',
    images: [`${CERT_DIR}tm-2.png`],
    thumb: `${CERT_DIR}tm-2.png`,
    category: '知识产权',
  },
  {
    id: 'tm-35',
    title: '“贝之然”商标注册证（第 35 类）',
    issuer: '国家知识产权局',
    code: '67586855',
    conclusion: '第 35 类：广告、商业经营等',
    images: [`${CERT_DIR}tm-35.png`],
    thumb: `${CERT_DIR}tm-35.png`,
    category: '知识产权',
  },
]

/* ------------------------------------------------------------------ */
/* 品牌故事与优势                                                      */
/* ------------------------------------------------------------------ */

export const BRAND_VALUES: { title: string; desc: string }[] = [
  {
    title: '纯无机体系',
    desc: '以无机矿物为成膜物质，从原料端避开有机挥发物的主要来源。',
  },
  {
    title: 'A1 级不燃',
    desc: '无机涂层遇火不燃、不助燃，高温下不释放大量有毒烟气。',
  },
  {
    title: '与墙同寿',
    desc: '无机材料与水泥基基层化学结合，耐候抗老化，不易粉化剥落。',
  },
  {
    title: '报告可查',
    desc: 'A1 级不燃、有害物质限量、环保耐久性能均有第三方检测报告。',
  },
]

export const BRAND_STORY: string[] = [
  '东莞市贝歌科技有限公司专注纯无机建筑涂料的研发、生产与应用，旗下品牌「贝之然」以无机矿物技术为核心，为建筑工程与家庭装修提供更安全、更耐久的墙面解决方案。',
  '无机涂料的价值不只在环保，更在于“与建筑同寿命”。当涂层不再是需要频繁翻新的消耗品，建筑的长期维护成本才能真正降下来。围绕这一判断，贝之然建立了从基层处理到面层保护的完整产品体系。',
  '从无机底固、界面剂、墙面剂，到内墙、外墙、防水、地坪与抗污罩面，贝之然覆盖涂装全链路，让每一个环节的材料都来自同一套技术逻辑，彼此匹配、互为支撑。',
]

/* ------------------------------------------------------------------ */
/* 查询辅助函数                                                        */
/* ------------------------------------------------------------------ */

export function getSeries(id: string): Series | undefined {
  return SERIES_LIST.filter((s) => s.id === id)[0]
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.filter((p) => p.id === id)[0]
}

export function productsOfSeries(seriesId: string): Product[] {
  return PRODUCTS.filter((p) => p.seriesId === seriesId)
}

/** 系列封面图 */
export function seriesCover(seriesId: string): string {
  return `/images/products/${seriesId}/cover.jpg`
}

/** 系列第 n 张产品图（n 从 1 开始） */
export function seriesImage(seriesId: string, n: number): string {
  return `/images/products/${seriesId}/${n}.jpg`
}

/** 系列的全部图片路径（封面 + 产品图） */
export function seriesImages(s: Series): string[] {
  const arr: string[] = [seriesCover(s.id)]
  for (let i = 1; i <= s.imageCount; i++) {
    arr.push(seriesImage(s.id, i))
  }
  return arr
}

export function certsByCategory(category: Cert['category']): Cert[] {
  return CERTS.filter((c) => c.category === category)
}
