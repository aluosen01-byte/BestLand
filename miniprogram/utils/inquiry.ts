/**
 * inquiry.ts —— 在线咨询 / 留言
 *
 * 当前实现为「本地留存 + 可选云端上报」：
 *  1. 用户提交后立即写入本地 Storage，保证弱网与离线也不会丢；
 *  2. 若你在 app.ts 中配置了 CLOUD_ENV 与云函数，会同时上报到云端。
 *
 * 未配置云端时，留言只存在用户手机上 —— 你需要在「我的留言」页面
 * 让用户截图或拨打客服电话，或按 README 接入云开发。
 */

export interface Inquiry {
  id: string
  /** 称呼 */
  name: string
  /** 手机号 */
  phone: string
  /** 公司 / 项目名称（选填） */
  company: string
  /** 所在城市（选填） */
  city: string
  /** 咨询类型 */
  type: string
  /** 感兴趣的产品系列（选填） */
  interest: string
  /** 留言内容 */
  message: string
  /** 提交时间戳 */
  createdAt: number
  /** 是否已上报云端 */
  synced: boolean
}

export const INQUIRY_TYPES = ['工程采购', '经销代理', '家装零售', '技术咨询', '其他'] as const

const STORAGE_KEY = 'bzr_inquiries'

export function listInquiries(): Inquiry[] {
  const raw = wx.getStorageSync(STORAGE_KEY)
  return Array.isArray(raw) ? (raw as Inquiry[]) : []
}

export function saveInquiry(
  data: Omit<Inquiry, 'id' | 'createdAt' | 'synced'>
): Inquiry {
  const item: Inquiry = {
    ...data,
    id: `inq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    createdAt: Date.now(),
    synced: false,
  }
  const all = listInquiries()
  all.unshift(item)
  wx.setStorageSync(STORAGE_KEY, all)
  return item
}

export function removeInquiry(id: string): Inquiry[] {
  const rest = listInquiries().filter((i) => i.id !== id)
  wx.setStorageSync(STORAGE_KEY, rest)
  return rest
}

export function clearInquiries(): void {
  wx.removeStorageSync(STORAGE_KEY)
}

export function markSynced(id: string): void {
  const all = listInquiries().map((i) => (i.id === id ? { ...i, synced: true } : i))
  wx.setStorageSync(STORAGE_KEY, all)
}

/**
 * 上报到微信云开发（可选）。
 * 启用步骤见 README「接入云开发」一节：
 *   1. 在 app.ts 中把 cloudEnv 设为你的云环境 id；
 *   2. 部署名为 submitInquiry 的云函数写入数据库。
 * 返回 true 表示上报成功。
 */
export function reportToCloud(item: Inquiry, cloudEnv: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!cloudEnv) {
      resolve(false)
      return
    }
    const wxAny = wx as unknown as {
      cloud?: { callFunction: (o: Record<string, unknown>) => void }
    }
    if (!wxAny.cloud) {
      resolve(false)
      return
    }
    try {
      wxAny.cloud.callFunction({
        name: 'submitInquiry',
        data: item,
        success: () => resolve(true),
        fail: () => resolve(false),
      })
    } catch (e) {
      resolve(false)
    }
  })
}
