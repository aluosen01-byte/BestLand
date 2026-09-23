// products.ts 产品中心
import { SERIES_LIST, productsOfSeries, seriesCover, type Series } from '../../data/catalog'

interface SeriesRow extends Series {
  cover: string
  productCount: number
  /** 供搜索使用的合并文本 */
  haystack: string
}

/** 顶部分组筛选 */
interface Group {
  key: string
  label: string
  /** 命中的系列 id；空数组表示“全部” */
  ids: string[]
}

const GROUPS: Group[] = [
  { key: 'all', label: '全部', ids: [] },
  {
    key: 'inner',
    label: '内墙涂料',
    ids: ['neiqiang-jiazhuang', 'neiqiang-dazhonghua', 'neiqiang-zhengfu', 'ertongfang'],
  },
  { key: 'outer', label: '外墙与防水', ids: ['waqiang', 'fangshui'] },
  { key: 'base', label: '基层处理', ids: ['wuji-digux', 'jiemianji', 'qiangmianji'] },
  { key: 'special', label: '功能与地面', ids: ['dipingqi', 'kangwu-zhaomian'] },
  {
    key: 'project',
    label: '工程采购',
    ids: ['neiqiang-zhengfu', 'neiqiang-dazhonghua', 'waqiang', 'dipingqi'],
  },
]

function buildRows(): SeriesRow[] {
  return SERIES_LIST.map((s) => ({
    ...s,
    cover: seriesCover(s.id),
    productCount: productsOfSeries(s.id).length,
    haystack: [s.name, s.tagline, s.desc, s.tags.join(' '), s.scenes.join(' ')].join(' '),
  }))
}

Component({
  data: {
    groups: GROUPS,
    activeGroup: 'all',
    keyword: '',
    list: [] as SeriesRow[],
    /** 全量行数据，只在首次筛选时参与计算 */
    rows: [] as SeriesRow[],
  },

  lifetimes: {
    attached() {
      this.setData({ rows: buildRows() }, () => this.apply())
    },
  },

  methods: {
    apply() {
      const { activeGroup, keyword, rows } = this.data
      const group = GROUPS.filter((g) => g.key === activeGroup)[0]
      const kw = keyword.trim().toLowerCase()

      let list = rows
      if (group && group.ids.length) {
        list = list.filter((r) => group.ids.indexOf(r.id) >= 0)
      }
      if (kw) {
        list = list.filter((r) => r.haystack.toLowerCase().indexOf(kw) >= 0)
      }
      this.setData({ list })
    },

    onGroup(e: WechatMiniprogram.TouchEvent) {
      const { key } = e.currentTarget.dataset as { key: string }
      if (key === this.data.activeGroup) return
      this.setData({ activeGroup: key }, () => this.apply())
    },

    onSearch(e: WechatMiniprogram.Input) {
      this.setData({ keyword: e.detail.value }, () => this.apply())
    },

    clearSearch() {
      this.setData({ keyword: '' }, () => this.apply())
    },

    resetAll() {
      this.setData({ keyword: '', activeGroup: 'all' }, () => this.apply())
    },

    goDetail(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset as { id: string }
      wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goMessages() {
      wx.navigateTo({ url: '/pages/messages/messages' })
    },
  },
})
