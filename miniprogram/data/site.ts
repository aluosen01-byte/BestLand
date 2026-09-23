/**
 * site.ts —— 站点与品牌基础信息
 *
 * ⚠️ 请重点核对本文件中的联系方式与公司信息，确保与营业执照一致。
 * 修改后保存即可，全站（首页 / 关于 / 咨询 / 协议）会自动同步。
 */

export interface SiteInfo {
  /** 品牌名 */
  brand: string
  /** 品牌标语 */
  slogan: string
  /** 一句话定位 */
  positioning: string
  /** 企业全称 */
  company: string
  /** 企业简称 */
  companyShort: string
  /** 客服电话（用于拨号） */
  phone: string
  /** 客服电话展示文案 */
  phoneText: string
  /** 邮箱 */
  email: string
  /** 官网 */
  website: string
  /** 公司地址 */
  address: string
  /** 办公时间 */
  workTime: string
  /** 公众号 / 视频号名称（占位，可改） */
  mpName: string
  /** 备案号（占位，请替换为真实备案号） */
  icp: string
  /** 版权起始年 */
  sinceYear: number
}

export const SITE: SiteInfo = {
  brand: '贝之然',
  slogan: '纯无机 · 更耐火 · 更耐久',
  positioning: '专注纯无机建筑涂料，服务工程与家装全场景',
  company: '东莞市贝歌科技有限公司',
  companyShort: '贝歌科技',
  // TODO 请替换为真实客服电话
  phone: '0769-00000000',
  phoneText: '0769-0000 0000',
  // TODO 请替换为真实邮箱
  email: 'service@example.com',
  // TODO 请替换为真实官网
  website: '',
  // TODO 请替换为真实地址
  address: '广东省东莞市',
  workTime: '周一至周六 09:00 - 18:00',
  mpName: '贝之然',
  icp: '',
  sinceYear: new Date().getFullYear(),
}

/** 品牌核心卖点（首页金刚区展示，可自由增删） */
export interface Feature {
  /** 序号，也用作图标内的文字 */
  no: string
  title: string
  desc: string
}

export const FEATURES: Feature[] = [
  { no: 'A1', title: 'A1 级不燃', desc: '无机矿物成膜，遇火不燃、不释放有毒烟气' },
  { no: '0', title: '零甲醛添加', desc: '水性无机体系，有害物质限量检测合格' },
  { no: '30', title: '30 年耐久', desc: '与墙体同寿命，抗老化、不粉化' },
  { no: '10', title: '十大系列', desc: '内墙、外墙、防水、地坪、底固全覆盖' },
]

/** 服务对象 */
export const SCENES: string[] = [
  '政府工程',
  '学校医院',
  '商业空间',
  '工业厂房',
  '住宅家装',
  '儿童房',
]

/** 底部导航兜底说明（当 tabBar 图标缺失时提示） */
export const TABBAR_HINT = '如需底部图标，请将 PNG 图标放入 miniprogram/images/tab/'
