// calculator.js 选型与用量计算
//
// 这是一个完全在小程序内闭环的实用工具：
//   选场景 → 填面积 → 得到建议系列与桶数 → 一键把结果带进咨询
// 不依赖任何外部跳转，用来支撑「有实质功能」而不是「纯导流」。
const { SCENARIOS, RATES, TOPCOAT } = require('../../data/estimate')
const { getSeries } = require('../../data/catalog')
const { shareApp, shareTimeline } = require('../../utils/share')

/** 按面积、遍数、系列估算用漆量与桶数 */
function estimate(area, coats, seriesId) {
  var rate = RATES[seriesId]
  var series = getSeries(seriesId)
  if (!rate || !series || !coats) return null
  var kg = (area * coats) / rate.coverage
  var buckets = Math.ceil(kg / rate.packSize)
  return {
    label: '',
    name: series.name,
    detail:
      coats + ' 遍 · 约 ' + (Math.round(kg * 10) / 10) + ' kg（' + rate.packSize + 'kg/桶）',
    buckets: buckets,
    kg: Math.round(kg * 10) / 10,
    packSize: rate.packSize,
    seriesId: seriesId,
  }
}

Component({
  data: {
    scenarios: SCENARIOS,
    scenario: 'jiazhuang',
    current: null,
    area: '',
    useTopcoat: false,
    result: null,
  },

  lifetimes: {
    attached() {
      this.setData({ current: this.findScenario('jiazhuang') })
    },
  },

  methods: {
    /* ===== 转发 / 朋友圈 ===== */
    onShareAppMessage() {
      return shareApp('calculator', { title: '贝之然 · 涂料用量计算器，算算你要几桶' })
    },

    onShareTimeline() {
      return shareTimeline('calculator', { title: '贝之然 · 涂料用量计算器，算算你要几桶' })
    },

    onLoad(query) {
      // 支持从产品详情页带场景进来
      var key = (query && query.scenario) || ''
      if (key) {
        var s = this.findScenario(key)
        if (s) this.setData({ scenario: key, current: s })
      }
    },

    findScenario(key) {
      return (
        SCENARIOS.filter(function (s) {
          return s.key === key
        })[0] || null
      )
    },

    pickScenario(e) {
      var key = e.currentTarget.dataset.key
      var s = this.findScenario(key)
      if (!s) return
      this.setData({ scenario: key, current: s, result: null })
    },

    onArea(e) {
      this.setData({ area: e.detail.value, result: null })
    },

    toggleTopcoat() {
      this.setData({ useTopcoat: !this.data.useTopcoat, result: null })
    },

    calculate() {
      var area = parseFloat(this.data.area)
      var s = this.data.current
      if (!s) return
      if (!area || area <= 0) {
        wx.showToast({ title: '请填写涂装面积', icon: 'none' })
        return
      }
      if (area > 1000000) {
        wx.showToast({ title: '面积数值过大，请核对', icon: 'none' })
        return
      }

      var items = []

      var top = estimate(area, s.topCoats, s.top)
      if (top) {
        top.label = '面漆'
        items.push(top)
      }
      if (s.primer && s.primerCoats) {
        var primer = estimate(area, s.primerCoats, s.primer)
        if (primer) {
          primer.label = '底涂'
          items.push(primer)
        }
      }
      if (this.data.useTopcoat && s.allowTopcoat) {
        var tc = estimate(area, 1, TOPCOAT)
        if (tc) {
          tc.label = '罩面'
          items.push(tc)
        }
      }

      var total = items.reduce(function (a, x) {
        return a + x.buckets
      }, 0)

      this.setData({
        result: {
          area: area,
          scenarioName: s.name,
          items: items,
          totalBuckets: total,
        },
      })

      wx.pageScrollTo({ selector: '.result', duration: 260 })
    },

    /** 把估算结果带进咨询表单 */
    ask() {
      var r = this.data.result
      var s = this.data.current
      if (!r || !s) return
      var lines = r.items.map(function (x) {
        return x.label + '：' + x.name + '，' + x.buckets + ' 桶（' + x.detail + '）'
      })
      var msg =
        '【用量计算】\n场景：' + r.scenarioName + '\n面积：' + r.area + ' ㎡\n' +
        lines.join('\n') +
        '\n合计建议：' + r.totalBuckets + ' 桶'
      wx.navigateTo({
        url:
          '/pages/contact/contact?interest=' + encodeURIComponent(r.scenarioName) +
          '&msg=' + encodeURIComponent(msg),
      })
    },

    goSeries(e) {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
    },
  },
})
