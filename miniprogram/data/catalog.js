// catalog.js —— 由 catalog.ts 编译而来（构建产物）
//
// 参数与文案来自《贝之然中英宣传册 v36》，均已核对；不再是我先前编的占位数据。
//
// 【目录结构约定】
//   images/products/<系列id>/1..N.jpg  产品图
//   images/products/<系列id>/cover.jpg 系列封面
//   images/certs/*.jpg                 资质证书
//   images/brand/cover.jpg             品牌图

/** 系列封面图 */
function seriesCover(seriesId) {
  return '/images/products/' + seriesId + '/cover.jpg'
}

/** 系列第 n 张产品图（n 从 1 开始） */
function seriesImage(seriesId, n) {
  return '/images/products/' + seriesId + '/' + n + '.jpg'
}

var SERIES_LIST = [
  {
    id: 'ertongfang',
    code: 'ET',
    name: '儿童房系列',
    nameEn: "Kids' Room Series",
    tagline: '给孩子一面会呼吸的墙',
    desc:
      '食品级零污染、抗菌防霉、耐水可擦洗 ＞10000 次，A1 级防火无烟气，当天刷当天住，给宝宝一面会“呼吸”的安全墙。适用于儿童房、婴儿房。',
    tags: ['食品级零污染', '抗菌防霉', 'A1 级防火', '当天刷当天住'],
    scenes: ['儿童房', '婴儿房', '幼儿园', '亲子空间'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '5kg / 桶' },
      { label: '耐擦洗', value: '＞10000 次' },
      { label: '燃烧性能', value: 'A1 级不燃' },
      { label: '环保', value: 'VOC、甲醛、苯系物未检出' },
      { label: '施工', value: '免腻子、免底漆，两遍喷涂' },
    ],
  },
  {
    id: 'neiqiang-jiazhuang',
    code: 'JZ',
    name: '家装内墙系列',
    nameEn: 'Residential Interior Series',
    tagline: '让家居墙面即刻升级“无机铠甲”',
    desc:
      '适用于家庭、豪宅、别墅、酒店会所等高品质生活场景，随刷随住、负氧离子释放、VOC 未检出，以陶瓷级硬度、可食品接触的安全等级，让家居墙面即刻升级“无机铠甲”，奢华与健康一次到位。',
    tags: ['负氧离子释放', 'VOC 未检出', '陶瓷级硬度', '随刷随住'],
    scenes: ['家庭住宅', '别墅', '酒店', '会所'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '10kg / 桶' },
      { label: '环保', value: 'VOC 未检出，可食品接触等级' },
      { label: '耐擦洗', value: '≥10000 次' },
      { label: '附加功能', value: '释放负氧离子' },
      { label: '施工', value: '免腻子、免底漆，两遍喷涂' },
    ],
  },
  {
    id: 'neiqiang-dazhonghua',
    code: 'GC',
    name: '大众化工程内墙系列',
    nameEn: 'Standard Commercial Interior Series',
    tagline: '极致性价比，花最少的成本',
    desc:
      '适用于公司、厂房等大众化场景，是贝之然推出极致性价比的系列产品，让用户花最少的成本，享受贝之然品牌优质的科技产品。',
    tags: ['极致性价比', '高遮盖', '工程批量', '易施工'],
    scenes: ['办公楼', '厂房', '仓库', '员工宿舍'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '环保', value: 'VOC、甲醛、苯系物未检出' },
      { label: '耐擦洗', value: '≥10000 次' },
      { label: '施工', value: '免腻子、免底漆，两遍喷涂' },
      { label: '定位', value: '工程批量、造价友好' },
    ],
  },
  {
    id: 'neiqiang-zhengfu',
    code: 'ZF',
    name: '政府工程内墙系列',
    nameEn: 'Government Project Interior Series',
    tagline: '符合绿色建材加分项与 A1 级防火规范',
    desc:
      '适用于学校、医院、部队、政府办公楼等高标准公共场景，符合绿色建材加分项与 A1 级防火规范，以食品级环保、抗菌防霉、耐擦洗 ≥10000 次的性能，为公共空间提供零污染、零维护、与建筑同寿命的持久保护。',
    tags: ['绿色建材加分', 'A1 级防火', '抗菌防霉', '食品级环保'],
    scenes: ['学校', '医院', '部队', '政府办公楼'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '燃烧性能', value: 'A1 级不燃' },
      { label: '耐擦洗', value: '≥10000 次' },
      { label: '附加功能', value: '抗菌防霉、食品级环保' },
      { label: '政策适配', value: '符合绿色建材加分项' },
    ],
  },
  {
    id: 'jiemianji',
    code: 'JM',
    name: '界面剂系列',
    nameEn: 'Interface Agent Series',
    tagline: '让旧墙、瓷砖、混凝土“石化一体”',
    desc:
      '纳米硅酸盐渗透液，深入基层 ≥5mm，拉拔强度提升 3 倍，让旧墙、瓷砖、混凝土“石化一体”，杜绝空鼓、起皮、掉砖。',
    tags: ['纳米硅酸盐', '渗透 ≥5mm', '拉拔强度 ×3', '杜绝空鼓'],
    scenes: ['旧墙翻新', '瓷砖翻新', '混凝土基层', '保温基层'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '渗透深度', value: '≥5mm' },
      { label: '拉拔强度', value: '提升 3 倍' },
      { label: '技术', value: '纳米硅酸盐渗透液' },
    ],
  },
  {
    id: 'wuji-digux',
    code: 'DG',
    name: '无机底固系列',
    nameEn: 'Inorganic Undercoat Series',
    tagline: '替代易粉化腻子粉，基层终身不空鼓',
    desc:
      '替代易粉化腻子粉（无机腻子膏），与水泥基面发生石化反应，越老越硬，终身不空鼓、不起皮，一道搞定找平 + 加固，墙面寿命翻倍。',
    tags: ['替代腻子粉', '石化反应', '越老越硬', '找平+加固一道成'],
    scenes: ['旧墙翻新', '砂浆基层', '混凝土基层', '石膏板'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '25kg / 桶' },
      { label: '技术', value: '无机腻子膏，替代腻子粉' },
      { label: '固化机理', value: '与水泥基面石化反应' },
      { label: '工艺', value: '一道完成找平 + 加固' },
    ],
  },
  {
    id: 'dipingqi',
    code: 'DP',
    name: '天冬聚脲地坪漆系列',
    nameEn: 'Floor Paint Series',
    tagline: '厂房车间与车库的“地坪铠甲”',
    desc:
      '天冬纯聚脲配方，零 VOC、耐磨抗划、耐黄变 30 年；无缝一体，防滑静音，家用车库、厂房车间“地坪铠甲”。',
    tags: ['天冬纯聚脲', '零 VOC', '耐磨抗划', '耐黄变 30 年'],
    scenes: ['厂房车间', '家用车库', '仓库', '停车场'],
    imageCount: 8,
    accent: 'accent',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '技术', value: '天冬纯聚脲配方' },
      { label: '环保', value: '零 VOC' },
      { label: '耐黄变', value: '30 年' },
      { label: '性能', value: '耐磨抗划、无缝一体、防滑静音' },
    ],
  },
  {
    id: 'fangshui',
    code: 'FS',
    name: '天冬聚脲防水涂料系列',
    nameEn: 'Waterproof Coating Series',
    tagline: '一次涂刷，30 年不漏',
    desc:
      '天冬纯聚脲技术，断裂伸长率 ≥300%，涂膜 1mm 即可耐 0.5MPa 水压，-30℃ 弯折无裂纹，屋顶、泳池、地下室“一次涂刷，30 年不漏”。',
    tags: ['断裂伸长率 ≥300%', '1mm 耐 0.5MPa', '-30℃ 无裂纹', '30 年不漏'],
    scenes: ['屋顶', '泳池', '地下室', '厨卫'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '技术', value: '天冬纯聚脲' },
      { label: '断裂伸长率', value: '≥300%' },
      { label: '抗渗', value: '1mm 涂膜耐 0.5MPa 水压' },
      { label: '低温柔性', value: '-30℃ 弯折无裂纹' },
    ],
  },
  {
    id: 'kangwu-zhaomian',
    code: 'ZW',
    name: '抗污罩面系列',
    nameEn: 'Anti-Stain Top-Coat Series',
    tagline: '一刷形成“自洁玻璃”膜',
    desc:
      '一刷形成“自洁玻璃”膜，酱油、口红、涂鸦湿巾即净，3000h 日晒不黄变，A1 防火食品级零 VOC，内外墙通用，十年抗污如新。',
    tags: ['自洁玻璃膜', '湿巾即净', '3000h 不黄变', '内外墙通用'],
    scenes: ['走廊', '公共区域', '餐厅', '内外墙罩面'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '耐黄变', value: '3000h 日晒不黄变' },
      { label: '防火', value: 'A1 级' },
      { label: '环保', value: '食品级零 VOC' },
      { label: '适用', value: '内外墙通用' },
    ],
  },
  {
    id: 'waqiang',
    code: 'WQ',
    name: '外墙系列',
    nameEn: 'Exterior-Wall Series',
    tagline: '外墙不用刮腻子，不用刷底漆',
    desc:
      '外墙不用刮腻子，不用刷底漆。涂料直接喷涂在抗裂防水砂浆上渗透饱满即可（两遍）。它与墙体融为一体，越久越坚固，耐老化与楼房同寿命。不但成本更低廉，施工更简单，取代外墙传统的真石漆仿石漆，为新一代理想材料。',
    tags: ['免腻子免底漆', '两遍喷涂', '与墙同寿命', '取代真石漆'],
    scenes: ['住宅外墙', '厂房外墙', '公共建筑', '旧墙改造'],
    imageCount: 8,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg / 桶' },
      { label: '施工', value: '免腻子、免底漆，两遍喷涂' },
      { label: '耐老化', value: '人工老化 3000h' },
      { label: '理论寿命', value: '≥50 年，与楼房同寿命' },
      { label: '成本', value: '比真石漆/仿石漆省 1/3 材料费' },
    ],
  },
  {
    id: 'qiangmianji',
    code: 'QM',
    name: '墙面剂系列',
    nameEn: 'Wall Treatment Series',
    tagline: '一抹平，才有一面净',
    desc:
      '墙面找平与基层处理材料，用于填补基层孔洞、平整墙面，为面漆提供均匀细腻的施工基底。批刮顺滑、干后强度高，打磨后表面平整，能明显提升面漆的最终观感。',
    tags: ['批刮顺滑', '干后强度高', '易打磨', '找平效果好'],
    scenes: ['室内找平', '腻子层', '基层修补', '精装修'],
    imageCount: 5,
    accent: 'brand',
    hasRealModels: false,
    specs: [
      { label: '包装规格', value: '20kg' },
      { label: '类型', value: '水性墙面处理剂' },
      { label: '理论涂布率', value: '约 1.5-2.0 kg/㎡' },
      { label: '可打磨时间', value: '约 24h' },
    ],
  },
]

/* ---------------- 单品：由系列自动生成占位型号 ---------------- */

var SPEC_CYCLE = ['5kg', '10kg', '20kg', '25kg']
var PER_SERIES = 4

function pad2(n) {
  return n < 10 ? '0' + n : '' + n
}

function buildProducts() {
  var list = []
  SERIES_LIST.forEach(function (s) {
    for (var i = 1; i <= PER_SERIES; i++) {
      list.push({
        id: s.id + '-p' + i,
        seriesId: s.id,
        seriesName: s.name,
        // 🟡 占位型号，请替换为真实型号
        model: s.name.replace('系列', '') + ' ' + s.code + '-' + pad2(i),
        spec: SPEC_CYCLE[(i - 1) % SPEC_CYCLE.length],
        keywords: s.name + ' ' + s.tags.join(' '),
      })
    }
  })
  return list
}

var PRODUCTS = buildProducts()

/* ---------------- 资质证书 ---------------- */

var CERT_DIR = '/images/certs/'

var CERTS = [
  {
    id: 'a1-buran',
    title: '纯无机涂料 A1 级不燃性检测报告',
    issuer: '上海华慧检测技术有限公司',
    code: '2022070388',
    conclusion: '燃烧性能达到 A1 级（最高不燃等级）',
    images: [CERT_DIR + 'a1-1.jpg', CERT_DIR + 'a1-2.jpg', CERT_DIR + 'a1-3.jpg'],
    thumb: CERT_DIR + 'a1-1.jpg',
    category: '检测报告',
  },
  {
    id: 'huanbao-naiyong',
    title: '纯无机涂料环保性能与耐久性能综合检测报告',
    issuer: '深圳市计量质量检测研究院',
    code: 'WT20103221065631WT1',
    conclusion: '环保性能与耐久性能检测合格',
    images: [
      CERT_DIR + 'hb-1.jpg',
      CERT_DIR + 'hb-2.jpg',
      CERT_DIR + 'hb-3.jpg',
      CERT_DIR + 'hb-4.jpg',
      CERT_DIR + 'hb-5.jpg',
    ],
    thumb: CERT_DIR + 'hb-1.jpg',
    category: '检测报告',
  },
  {
    id: 'youhai-xianliang',
    title: '建筑用墙面涂料中有害物质限量检测报告',
    issuer: '化学工业合成材料老化质量监督检验中心',
    code: 'FX26010300',
    conclusion: 'VOC、甲醛、苯系物均未检出',
    images: [
      CERT_DIR + 'yx-1.jpg',
      CERT_DIR + 'yx-2.jpg',
      CERT_DIR + 'yx-3.jpg',
      CERT_DIR + 'yx-4.jpg',
    ],
    thumb: CERT_DIR + 'yx-1.jpg',
    category: '检测报告',
  },
  {
    id: 'iso',
    title: 'ISO 三体系认证',
    issuer: '第三方认证机构',
    code: '',
    conclusion: '质量、环境、职业健康安全管理体系认证',
    images: [CERT_DIR + 'iso-1.jpg', CERT_DIR + 'iso-2.jpg', CERT_DIR + 'iso-3.jpg'],
    thumb: CERT_DIR + 'iso-1.jpg',
    category: '体系认证',
  },
  {
    id: 'tm-2',
    title: '“贝之然”商标注册证（第 2 类）',
    issuer: '国家知识产权局',
    code: '67583611',
    conclusion: '第 2 类：颜料、清漆、漆等',
    // 素材里只有 PDF，没有可展示的图片；hasImages=false 时页面不提供「查看原件」
    hasImages: false,
    images: [CERT_DIR + 'tm-2.jpg'],
    thumb: CERT_DIR + 'tm-2.jpg',
    category: '知识产权',
  },
  {
    id: 'tm-35',
    title: '“贝之然”商标注册证（第 35 类）',
    issuer: '国家知识产权局',
    code: '67586855',
    conclusion: '第 35 类：广告、商业经营等',
    // 素材里只有 PDF，没有可展示的图片
    hasImages: false,
    images: [CERT_DIR + 'tm-35.jpg'],
    thumb: CERT_DIR + 'tm-35.jpg',
    category: '知识产权',
  },
]

/* ---------------- 品牌故事与优势 ---------------- */

var BRAND_VALUES = [
  {
    title: '纯无机体系',
    desc: '以天然矿物和海洋贝壳为原料，通过生物活化工艺合成，取代传统涂料中的丙烯酸树脂。',
  },
  {
    title: '国家级研发背景',
    desc: '由品牌创始人罗博荣、北京中科国科国际纳米研究院张华教授、东莞理工大学化工学院李超教授领衔研发。',
  },
  {
    title: '替代传统腻子粉',
    desc: '以《无机腻子膏》（无机底固）取代不耐老化、易粉化松散的腻子粉，形成内外墙独立体系。',
  },
  {
    title: '国际互认报告',
    desc: '可提供国际互认检验报告，并协助海外合作方完成当地备案与第三方检验。',
  },
]

var BRAND_STORY = [
  '贝之然纯无机涂料是由贝之然品牌创始人罗博荣、北京中科国科国际纳米研究院张华教授、东莞理工大学化工学院李超教授领衔研发，是国家战略新兴产业的新一代内外墙涂料解决方案。',
  '贝之然纯无机涂料颠覆取代了传统内外墙涂料中的丙烯酸树脂（纯丙、苯丙乳液）。它以天然矿物和海洋贝壳为原料，通过生物活化工艺合成为新一代拥有独立系列知识产权的《纯无机涂料》。',
  '同时，以取代不耐老化并且易粉化松散的《腻子粉》的《无机腻子膏》（无机底固），成为内外墙独立体系的新产品。',
  '品牌使命：让建筑回归自然，做建筑与环境共生的缔造者。价值观：诚信 · 创新 · 务实 · 求精。经营理念：以人民健康为第一要义，不断突破、和谐共赢。',
]

/* ---------------- 查询辅助函数 ---------------- */

function getSeries(id) {
  return SERIES_LIST.filter(function (s) {
    return s.id === id
  })[0]
}

function getProduct(id) {
  return PRODUCTS.filter(function (p) {
    return p.id === id
  })[0]
}

function productsOfSeries(seriesId) {
  return PRODUCTS.filter(function (p) {
    return p.seriesId === seriesId
  })
}

/** 系列的全部图片路径（封面 + 产品图） */
function seriesImages(s) {
  var arr = [seriesCover(s.id)]
  for (var i = 1; i <= s.imageCount; i++) {
    arr.push(seriesImage(s.id, i))
  }
  return arr
}

function certsByCategory(category) {
  return CERTS.filter(function (c) {
    return c.category === category
  })
}

module.exports = {
  SERIES_LIST: SERIES_LIST,
  PRODUCTS: PRODUCTS,
  CERTS: CERTS,
  BRAND_VALUES: BRAND_VALUES,
  BRAND_STORY: BRAND_STORY,
  getSeries: getSeries,
  getProduct: getProduct,
  productsOfSeries: productsOfSeries,
  seriesCover: seriesCover,
  seriesImage: seriesImage,
  seriesImages: seriesImages,
  certsByCategory: certsByCategory,
}
