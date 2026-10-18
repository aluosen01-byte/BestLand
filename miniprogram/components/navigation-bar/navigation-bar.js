// navigation-bar.js 自定义导航栏
//
// 【重要】自定义导航栏在所有页面顶部使用，一旦 attached 抛错，
// 页面顶部乃至整页都可能显示异常。因此所有系统信息读取都做了容错。
const DEFAULT_NAV_BAR_HEIGHT = 44

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    extClass: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    background: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
    back: {
      type: Boolean,
      value: true,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true,
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange',
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1,
    },
  },
  data: {
    displayStyle: '',
    ios: false,
    innerPaddingRight: '',
    leftWidth: '',
    safeAreaTop: '',
  },
  lifetimes: {
    attached() {
      var that = this

      // 胶囊按钮位置：可能返回 undefined（窗口未就绪）或 API 不存在
      var rect = null
      try {
        rect =
          typeof wx.getMenuButtonBoundingClientRect === 'function'
            ? wx.getMenuButtonBoundingClientRect()
            : null
      } catch (e) {
        rect = null
      }

      var apply = function (res) {
        try {
          res = res || {}
          var windowWidth = typeof res.windowWidth === 'number' ? res.windowWidth : 375
          var platform = res.platform || 'devtools'
          var isAndroid = platform === 'android'
          var isDevtools = platform === 'devtools'

          var left = rect && typeof rect.left === 'number' ? rect.left : windowWidth - 96
          var rightWidth = windowWidth - left
          if (!(rightWidth > 0) || rightWidth > windowWidth) rightWidth = 96

          var patch = {
            ios: !isAndroid,
            innerPaddingRight: 'padding-right: ' + rightWidth + 'px',
            leftWidth: 'width: ' + rightWidth + 'px',
          }

          // safeArea 在极少数环境下缺失，缺了就退化为状态栏高度
          var safeTop =
            res.safeArea && typeof res.safeArea.top === 'number'
              ? res.safeArea.top
              : typeof res.statusBarHeight === 'number'
              ? res.statusBarHeight
              : 20

          patch.safeAreaTop =
            isDevtools || isAndroid
              ? 'height: calc(var(--height) + ' + safeTop + 'px); padding-top: ' + safeTop + 'px'
              : ''

          that.setData(patch)
        } catch (e) {
          console.error('[贝之然] 导航栏布局计算失败', e)
        }
      }

      // 优先用同步接口（更可靠），失败再退回异步
      var info = null
      try {
        if (typeof wx.getWindowInfo === 'function') info = wx.getWindowInfo()
        if (!info && typeof wx.getSystemInfoSync === 'function') info = wx.getSystemInfoSync()
      } catch (e) {
        info = null
      }
      if (info) {
        apply(info)
        return
      }
      try {
        wx.getSystemInfo({ success: apply, fail: function () { apply(null) } })
      } catch (e) {
        apply(null)
      }
    },
  },
  methods: {
    _showChange(show) {
      var animated = this.data.animated
      var displayStyle = ''
      if (animated) {
        displayStyle = 'opacity: ' + (show ? '1' : '0') + ';transition:opacity 0.5s;'
      } else {
        displayStyle = 'display: ' + (show ? '' : 'none')
      }
      this.setData({
        displayStyle: displayStyle,
      })
    },
    back() {
      var data = this.data
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta,
        })
      }
      this.triggerEvent('back', { delta: data.delta }, {})
    },
    /** 返回首页（homeButton 为 true 时可用） */
    home() {
      wx.reLaunch({ url: '/pages/index/index' })
      this.triggerEvent('home', {}, {})
    },
  },
})
