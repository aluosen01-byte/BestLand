// products.js —— 由 products.ts 编译而来（构建产物）｜产品中心
const { SERIES_LIST, productsOfSeries, seriesCover } = require('../../data/catalog')

const GROUPS = [
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

function buildRows() {
  return SERIES_LIST.map(function (s) {
    return Object.assign({}, s, {
      cover: seriesCover(s.id),
      productCount: productsOfSeries(s.id).length,
      haystack: [s.name, s.tagline, s.desc, s.tags.join(' '), s.scenes.join(' ')].join(' '),
    })
  })
}

Component({
  data: {
    groups: GROUPS,
    activeGroup: 'all',
    keyword: '',
    list: [],
    /** 全量行数据，只在筛选时参与计算 */
    rows: [],
  },

  lifetimes: {
    attached() {
      this.setData({ rows: buildRows() }, () => this.apply())
    },
  },

  methods: {
    apply() {
      const activeGroup = this.data.activeGroup
      const kw = this.data.keyword.trim().toLowerCase()
      const group = GROUPS.filter(function (g) {
        return g.key === activeGroup
      })[0]

      let list = this.data.rows
      if (group && group.ids.length) {
        list = list.filter(function (r) {
          return group.ids.indexOf(r.id) >= 0
        })
      }
      if (kw) {
        list = list.filter(function (r) {
          return r.haystack.toLowerCase().indexOf(kw) >= 0
        })
      }
      this.setData({ list: list })
    },

    onGroup(e) {
      const key = e.currentTarget.dataset.key
      if (key === this.data.activeGroup) return
      this.setData({ activeGroup: key }, () => this.apply())
    },

    onSearch(e) {
      this.setData({ keyword: e.detail.value }, () => this.apply())
    },

    clearSearch() {
      this.setData({ keyword: '' }, () => this.apply())
    },

    resetAll() {
      this.setData({ keyword: '', activeGroup: 'all' }, () => this.apply())
    },

    goDetail(e) {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
    },

    goContact() {
      wx.reLaunch({ url: '/pages/contact/contact' })
    },

    goMessages() {
      wx.navigateTo({ url: '/pages/messages/messages' })
    },
  },
})
