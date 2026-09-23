Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    /** 图片地址 */
    src: {
      type: String,
      value: '',
      observer() {
        // 换图时重置状态，避免沿用上一张的失败标记
        this.setData({ failed: false, ready: false })
      },
    },
    /** 裁剪模式：aspectFill | aspectFit | widthFix | scaleToFill */
    mode: {
      type: String,
      value: 'aspectFill',
    },
    /** 形状：plain 直角 | rounded 圆角 | circle 圆形 */
    shape: {
      type: String,
      value: 'plain',
    },
    /** 占位水印文字 */
    phText: {
      type: String,
      value: '贝之然',
    },
    /** 长按可保存到相册 */
    longpress: {
      type: Boolean,
      value: false,
    },
    /** 外层自定义样式 */
    style: {
      type: String,
      value: '',
    },
  },
  data: {
    ready: false,
    failed: false,
  },
  methods: {
    onLoad() {
      if (!this.data.ready) this.setData({ ready: true })
    },
    onError() {
      // 图片不存在 / 加载失败：展示占位块
      this.setData({ failed: true, ready: false })
    },
  },
})
