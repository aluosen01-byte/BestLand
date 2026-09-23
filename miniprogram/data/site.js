// site.js —— 由 site.ts 编译而来（构建产物）
//
// ⚠️ 请重点核对本文件中的联系方式与公司信息，确保与营业执照一致。
// 修改后保存即可，全站（首页 / 关于 / 咨询 / 协议）会自动同步。

var SITE = {
  brand: '贝之然',
  slogan: '纯无机 · 更耐火 · 更耐久',
  positioning: '专注纯无机建筑涂料，服务工程与家装全场景',
  company: '东莞市贝歌科技有限公司',
  companyShort: '贝歌科技',
  /** 对接人（「咨询与留言」页展示） */
  contactName: '罗荣忠',
  phone: '13602629536',
  phoneText: '136 0262 9536',
  // 暂无邮箱：留空则全站自动隐藏邮箱相关条目
  email: '',
  // 暂无官网：留空即可
  website: '',
  address: '广东省东莞市大岭山镇莞长路杨屋段731号越秀大厦3楼',
  workTime: '周一至周六 09:00 - 18:00',
  mpName: '贝之然',
  icp: '',
  sinceYear: new Date().getFullYear(),
}

/** 品牌核心卖点（首页金刚区展示，可自由增删） */
var FEATURES = [
  { no: 'A1', title: 'A1 级不燃', desc: '无机矿物成膜，遇火不燃、不释放有毒烟气' },
  { no: '0', title: '零甲醛添加', desc: '水性无机体系，有害物质限量检测合格' },
  { no: '30', title: '30 年耐久', desc: '与墙体同寿命，抗老化、不粉化' },
  { no: '10', title: '十大系列', desc: '内墙、外墙、防水、地坪、底固全覆盖' },
]

/** 服务对象 */
var SCENES = ['政府工程', '学校医院', '商业空间', '工业厂房', '住宅家装', '儿童房']

module.exports = { SITE, FEATURES, SCENES }
