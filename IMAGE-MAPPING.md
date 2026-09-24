# 图片存放与替换（贝之然小程序）

## 结论先说

**图片不放在小程序包里，全部托管在服务器上。**

原因：微信小程序主包上限 **2 MB**，而 125 张图共 17.15 MB。
把图打进包会让整包变成 17.46 MB，上传直接报错：

```
错误码 80051, source size 17746KB exceed max limit 2MB
```

压缩也救不回来 —— 就算把证书压到只能看清标题（600px），产品+证书仍要 5～6 MB。

**迁移后主包只有 315 KB**（上限 2048 KB），余量 1.7 MB。

---

## 一、图片现在在哪

### 服务器（对外可访问）

基地址：`https://senluoflow.com/video/`
物理路径：`/opt/video/`（由 nginx 的 `location ^~ /video/` 直接提供静态文件）

```
/opt/video/
├── product/<系列id>/
│   ├── cover.jpg      系列封面（首页、产品列表用）
│   └── 1.jpg ~ 8.jpg  产品图（详情页轮播）
├── cert/              资质证书
│   ├── a1-1.jpg ~ a1-3.jpg      A1 级不燃性检测报告
│   ├── hb-1.jpg ~ hb-5.jpg      环保性能与耐久性能报告
│   ├── yx-1.jpg ~ yx-4.jpg      有害物质限量报告
│   └── iso-1.jpg ~ iso-3.jpg    ISO 三体系认证
└── cover/             视频封面与品牌图
    ├── bzr-01.jpg ~ bzr-13.jpg  13 张视频封面
    └── brand-cover.jpg          关于我们页品牌头图
```

### 小程序包内（只剩图标）

```
miniprogram/images/
├── placeholder.svg    占位水印（备用）
└── tab/*.svg          底部导航图标 8 个（勿删）
```

`<系列id>` 对应关系：

| 系列 | id |
|---|---|
| 家装内墙系列 | `neiqiang-jiazhuang` |
| 大众化工程内墙系列 | `neiqiang-dazhonghua` |
| 政府工程内墙系列 | `neiqiang-zhengfu` |
| 儿童房系列 | `ertongfang` |
| 外墙系列 | `waqiang` |
| 防水涂料系列 | `fangshui` |
| 地坪漆系列 | `dipingqi` |
| 抗污罩面系列 | `kangwu-zhaomian` |
| 无机底固系列 | `wuji-digux` |
| 界面剂系列 | `jiemianji` |
| 墙面剂系列 | `qiangmianji` |

---

## 二、换一张图（不用重新发版）

这是托管到服务器最大的好处：**改图不需要重新提交审核**，用户端立刻生效
（微信会缓存图片，`Cache-Control` 设的是 1 天）。

```bash
# 例如替换地坪漆系列第 3 张产品图
pscp -batch -pw <密码> 新图.jpg root@47.107.190.235:/opt/video/product/dipingqi/3.jpg
```

**注意**：文件名必须与原来完全一致，否则页面找不到。

改完记得确认权限：

```bash
ssh root@47.107.190.235
chmod 644 /opt/video/product/dipingqi/3.jpg
```

验证：

```bash
curl -I https://senluoflow.com/video/product/dipingqi/3.jpg    # 期望 200 + image/jpeg
```

---

## 三、想加一个新系列

1. 上传图片到新目录，例如 `/opt/video/product/xinfang/`（`1.jpg` ~ `8.jpg` + `cover.jpg`）
2. 在 `miniprogram/data/catalog.js` 的 `SERIES_LIST` 里加一条，`id` 用 `xinfang`
3. 重新编译上传小程序

`id` 会自动拼成图片地址，不需要额外配置。

---

## 四、换服务器 / 换对象存储

图片地址集中在两个常量，改完即可：

```js
// miniprogram/data/catalog.js
var IMG_BASE = 'https://senluoflow.com/video/'

// miniprogram/data/video.js
var VIDEO_BASE = 'https://senluoflow.com/video/'
var COVER_BASE = VIDEO_BASE + 'cover/'
```

`miniprogram/data/site.js` 里的 `brandCover` 也指向服务器。

改完记得把新域名加入微信公众平台的 **downloadFile 合法域名**。

---

## 五、还缺 2 张图（需要你补）

**「贝之然」商标注册证没有图片**，素材里只有 PDF：

```
贝歌证书电子版和纸质版\贝之然商标注册证\贝之然2类商标注册证67583611(2).pdf
贝歌证书电子版和纸质版\贝之然商标注册证\贝之然35类商标注册证67586855(2).pdf
```

代码已做降级：这两张卡照常显示标题、编号、机构、结论，但**不显示缩略图和「查看原件」按钮**，
改为提示「该证书仅有 PDF 原件，如需查看请点击『索取副本』联系我们」。

想补的话：

1. 用 PDF 阅读器打开，截图第一页
2. 存成 `tm-2.jpg` / `tm-35.jpg`，传到 `/opt/video/cert/`
3. 编辑 `data/catalog.js`，把这两条里的 `hasImages: false` 删掉，
   并填上 `images: [CERT_DIR + 'tm-2.jpg']` 与 `thumb: CERT_DIR + 'tm-2.jpg'`

---

## 六、压缩参数（需要重新生成时用）

当前的图片是我从原始素材压缩来的：

| 类型 | 处理 | 结果 |
|---|---|---|
| 产品图 | 最长边 800px，JPEG | 单张约 130–180 KB |
| 系列封面 | 最长边 900px，JPEG | 单张约 100–160 KB |
| 品牌头图 | 最长边 1200px，JPEG | 86 KB |
| 资质证书 | 最长边 1500px，JPEG（要看清文字，压得轻） | 单张 115–490 KB |
| 视频封面 | 540×960，JPEG | 单张 61–104 KB |

透明 PNG 转 JPEG 时统一铺了白底，不会发黑。

> 现在图在服务器上，**不受 2 MB 包限制**，所以以后可以放心用更高清的图。

---

## 七、原始素材位置（本机）

```
D:\跨境电商\A贝歌\素材\贝歌白底图\              产品图（白底）
D:\跨境电商\A贝歌\素材\贝歌证书电子版和纸质版\    检测报告、ISO、商标
D:\跨境电商\A贝歌\贝之然涂料视频\                13 支 4K 原始视频
```
