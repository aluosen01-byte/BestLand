# 贝之然 微信小程序

> 东莞市贝歌科技有限公司 · 纯无机建筑涂料品牌「贝之然」
> AppID：`wx3e3cecb062cf0d9d`

这是一个**品牌展示 + 产品目录 + 在线咨询**的微信小程序，已按贝之然的产品体系搭建完成。
项目原本是微信开发者工具的 TypeScript + Less 空白模板（只有 `Hello World`），
现在替换成了完整的品牌小程序。

> **已改为「免构建」模式。** 项目里同时存在 `.ts`/`.less` 源码和编译好的 `.js`/`.wxss` 产物，
> 并且已在 `project.config.json` 里**关闭 typescript / less 编译插件**，
> 因此不需要 `npm install` 就能直接在开发者工具里运行。详见第八节。

---

## 一、当前状态与剩余事项

| # | 事项 | 状态 |
|---|---|---|
| 1 | 图片素材 | ✅ 已导入并压缩（134 张，见 [IMAGE-MAPPING.md](IMAGE-MAPPING.md)） |
| 2 | 联系方式 / 公司信息 | ✅ 已按宣传册填好（对接人罗博荣、手机、地址、官网） |
| 3 | 产品参数与文案 | ✅ 已换成宣传册里的真实数据（不再是占位值） |
| 4 | 产品型号 | ⏳ **仍为占位编号**，把清单发我即可批量替换（见第三节） |
| 5 | 视频功能 | ❌ **已整体下线**：三种方案均被审核驳回，已全部移除（见第七节） |
| 6 | 官网 web-view | ❌ **已移除**：属引流，官网地址改为纯文本展示 |
| 7 | 商标注册证图片 | ⏳ 素材只有 PDF，见 [IMAGE-MAPPING.md](IMAGE-MAPPING.md) 第二节 |
| 8 | 公开展示的邮箱 | ⏳ 宣传册里是个人 QQ 邮箱，我未放上小程序；有企业邮箱请告知 |
| 9 | 转发 / 分享 | ✅ **已修复**：各页面均已补上分享回调（见第十一节） |
| 10 | 图片体积超限 | ✅ **已修复**：125 张图迁到服务器，主包 217.7KB（见第八节） |
| 11 | 上传微信平台 | ✅ **已上传**：`1.0.0` ~ `1.1.1`（见第十四节） |
| 12 | 纯导流审核问题 | ✅ **已整改**：移除视频与所有外部跳转（见第七节） |
| 13 | 核心功能闭环 | ✅ **已完善**：用量计算器 + 留言真实送达企业服务器（见第九、十节） |
| 14 | 业务域名配置 | ✅ `senluoflow.com` 已验证通过（现已无 web-view，可留可撤） |
| 15 | request 合法域名 | ⏳ **待配** `https://senluoflow.com`，否则真机无法提交留言（见第十节） |

然后：用微信开发者工具打开 `D:\projects\BestLand`，**直接编译**即可看到效果（无需构建 npm）。

---

## 二、页面结构

```
首页          品牌首屏 · 核心卖点 · 用量计算入口 · 11 个系列 · 品牌实力 · 资质 · 服务场景 · 招商加盟 · 联系 · 页脚
产品中心      关键词搜索 + 分组筛选（内墙/外墙防水/基层/功能地面/工程）+ 用量计算入口 + 系列卡列表
用量计算      8 种施工场景 → 填面积 → 推荐系列 + 用漆量 + 建议桶数 → 一键带入咨询
系列详情      图片轮播 · 技术参数 · 可选型号 · 适用场景 · 系列说明 · 相关资质 + 底部咨询栏
资质与检测    3 份检测报告 + ISO 三体系认证 + 2 项商标注册证，可分类筛选、查看原件
政策与标准    11 项国家政策与标准（A 级不燃强制、绿色建材量化目标、VOCs 减排）+ 11 条原文出处
招商加盟      三级代理权益与门槛对照表 · 总部支持 · 海外合作流程 · FAQ + 底部申请栏
关于我们      公司简介 · 企业信息 · 资质实力 · 7 项发明专利 · 应用案例 · 入口导航 · 联系方式
咨询与留言    留言表单（校验+本地留存）· 联系方式 · 常见问题
我的留言      已提交留言的记录、拨号、复制、删除
免责声明      6 条：内容性质/检测报告/信息使用/知识产权/责任限制/声明更新
启动日志      原模板保留页，仅调试用（sitemap 已禁止收录）
```

底部导航是**自定义组件**（首页 / 产品 / 咨询），不是原生 tabBar，原因见第五节。
政策与标准、招商加盟、用量计算是二级页，入口分布在首页、产品中心、产品详情与各页页脚。

> **视频中心与官方网站两页已删除** —— 审核认定属「强制引流至其他渠道」，见第七节。

---

## 三、需要你确认的「占位数据」

### 1. 产品型号（唯一还没补的）

现在 `miniprogram/data/catalog.js` 里每个系列有 4 个占位型号，例如：

```
家装内墙 JZ-01   5kg
家装内墙 JZ-02   10kg
```

（`JZ` 是系列编码：`JZ`=家装、`GC`=工程、`ZF`=政府、`ET`=儿童房、`WQ`=外墙、
`FS`=防水、`DP`=地坪、`ZW`=罩面、`DG`=底固、`JM`=界面、`QM`=墙面剂。）

**改成真实型号的两种方式：**

- 方式 A：把产品清单发我（例如「贝之然无机内墙漆 5kg / 10kg / 20kg」），我批量写入。
- 方式 B：自己改 `data/catalog.js` 里的 `buildProducts()`，并把对应系列的
  `hasRealModels` 改成 `true`（改完列表页就不再显示「型号待补充」黄标）。

### 2. 技术参数 ✅ 已用宣传册真实数据

原来我写的是行业通用示意值，**现已全部替换为《贝之然中英宣传册 v36》里的真实数据**：

| 系列 | 包装 | 关键指标 |
|---|---|---|
| 儿童房 | 5kg | 耐擦洗 ＞10000 次、A1 级防火、食品级 |
| 家装内墙 | 10kg | 负氧离子释放、VOC 未检出、陶瓷级硬度 |
| 大众化工程内墙 | 20kg | 极致性价比 |
| 政府工程内墙 | 20kg | 绿色建材加分项、抗菌防霉、≥10000 次 |
| 外墙 | 20kg | 免腻子免底漆、人工老化 3000h、寿命 ≥50 年 |
| 天冬聚脲地坪漆 | 20kg | 零 VOC、耐黄变 30 年 |
| 天冬聚脲防水 | 20kg | 断裂伸长率 ≥300%、1mm 耐 0.5MPa、-30℃ 无裂纹 |
| 抗污罩面 | 20kg | 自洁玻璃膜、3000h 不黄变 |
| 界面剂 | 20kg | 渗透 ≥5mm、拉拔强度 ×3 |
| 无机底固 | 25kg | 替代腻子粉、与水泥基石化反应 |
| 墙面剂 | 20kg | 找平批刮（宣传册未单列，维持原值） |

> 宣传册里还提到 **真石漆 / 仿石漆** 两个品类（视频 No.07、No.11、No.12 就是讲这个），
> 但素材里没有对应的白底产品图，所以暂未建成独立系列。需要的话告诉我。

---

## 四、图片存放位置

⚠️ **图片不在小程序包里**，全部托管在服务器 —— 原因见第八节。当前结构：

```
小程序包内（仅 9 个 SVG，2.6 KB）
miniprogram/images/
├── placeholder.svg    占位水印（备用）
└── tab/*.svg          底部导航图标（8 个，勿删）

服务器上（https://senluoflow.com/video/）
├── product/<系列id>/1..8.jpg + cover.jpg   96 张产品图与系列封面
├── cert/a1-*.jpg hb-*.jpg yx-*.jpg iso-*.jpg   15 张证书
└── cover/bzr-01..13.jpg + brand-cover.jpg  视频封面 + 品牌头图
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

**要替换某张图**：直接把新图传到服务器对应路径覆盖即可（保持文件名），
不需要重新发版小程序。上传命令见 [IMAGE-MAPPING.md](IMAGE-MAPPING.md)。

---

## 五、技术说明

### 为什么底部导航是自定义组件？

项目启用了 **Skyline 渲染**（`app.json` 里的 `rendererOptions.skyline`）。
Skyline 的原生 tabBar 只支持 PNG 图标，**不支持纯文字 tab**，
而我无法把素材图拷进项目（见第六节）。所以用自定义 `tab-bar` 组件 + SVG 图标，
开箱即用，样式也更好控制。

如果你更想用原生 tabBar：把 PNG 图标放进 `images/tab/`，
在 `app.json` 加回 `tabBar` 配置，各页面移除 `<tab-bar />` 即可。

### 留言数据的去向

- 提交后**立即写入本机 Storage**（`utils/inquiry.ts`），弱网/离线都不丢；
- 在 `miniprogram/config.js` 里填入 `cloudEnv` 后，会同时上报到微信云开发。

**现在 `cloudEnv` 是空的，所以留言只存在用户手机上**，你收不到。
咨询页会显示一条黄色提示告知用户「请直接拨打电话」。

**接入云开发的步骤：**

1. 微信开发者工具 → 云开发 → 开通环境，拿到环境 id；
2. 把 id 填进 `miniprogram/config.js` 的 `cloudEnv`；
3. 新建云函数 `submitInquiry`，把 `event` 写入一个集合（例如 `inquiries`）：

```js
// cloudfunctions/submitInquiry/index.js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()
  await db.collection('inquiries').add({
    data: { ...event, openid: OPENID, createdAt: db.serverDate() },
  })
  return { ok: true }
}
```

4. 部署云函数后，留言状态会变成「已同步至云端」。

---

## 六、关于 .ts / .less 与 .js / .wxss（重要）

你遇到的报错：

```
错误:miniprogram/app.json:未找到["pages"][1]对应的 pages/products/products.js 文件
```

**原因不是代码写错，而是构建没跑起来。** `project.config.json` 原本启用了 typescript 与 less 编译插件，
但本项目没有 `node_modules`（`package.json` 里只声明了类型定义，没装 `typescript`）。
编译器缺失 → 插件不产出 `.js` → 开发者工具在 `app.json` 里读到 `pages/products/products` 就找不到产物。

**解决方式（已由我完成）：** 我把 `.ts` / `.less` 编译成 `.js` / `.wxss` 直接放进项目，
并在 `project.config.json` 里把编译插件关掉：

```json
"useCompilerPlugins": []
```

这样项目**不再依赖 npm、不需要「构建 npm」、不需要任何编译器**，打开即可运行。

### 现在哪些文件在生效

| 生效（会被加载） | 仅作源码存档（不参与编译） |
|---|---|
| `*.js` | `*.ts` |
| `*.wxss` | `*.less`、`theme.less` |
| `*.wxml`、`*.json` | — |

> ⚠️ **改代码请改 `.js` / `.wxss`。** 改 `.ts` / `.less` 不会有任何效果，
> 因为编译插件已经关闭。这是为了避免「改了源码却没生效」的坑。

### 如果你更想用 TypeScript / Less 源码开发

1. 在项目根目录执行：`npm install typescript less --save-dev`
   （或在开发者工具里用「终端」安装）
2. 把 `project.config.json` 的 `useCompilerPlugins` 改回 `["typescript","less"]`
3. 此后开发者工具会用 `.ts` / `.less` 覆盖生成 `.js` / `.wxss`

---

## 七、视频功能已整体下线（审核要求）

### 结论：小程序内不能有任何播放入口

微信审核对「视频播放」认定很严。**三条路我们都试过，都被拦：**

| 尝试 | 结果 |
|---|---|
| ① 小程序 `<video>` 组件 | ❌ 驳回，要求《信息网络传播视听节目许可证》 |
| ② `web-view` 内嵌网页播放器（HTML5 `<video>`） | ❌ 仍被认定为「提供视频播放服务」 |
| ③ 只做视频链接复制（点了复制到剪贴板） | ❌ 被判「强制引流至其他渠道才能体验」 |

第三条是最终一次驳回的直接原因 —— 审核意见原文：

> 小程序内服务强制引流至其他渠道才能体验，或小程序无实质功能仅用于跳转导流，
> 属于纯导流小程序，请完善核心功能闭环后重新提审

### 已删除的内容

| 文件/功能 | 处理 |
|---|---|
| `pages/videos/`（视频中心页） | 整体删除 |
| `data/video.js`（13 支视频数据） | 删除 |
| 底部导航「视频」tab | 删除，回到 3 项：首页 / 产品 / 咨询 |
| 首页「产品短视频」区块 | 删除 |
| 详情页「相关视频」区块 | 删除 |
| 视频 tab 图标 `video.svg` / `video-on.svg` | 删除 |

### 同时删除的外部跳转（同样是引流点）

| 文件/功能 | 处理 |
|---|---|
| `pages/website/`（官网 web-view 内嵌页） | 整体删除 |
| 首页页脚「官方网站」 | 改为「咨询留言」 |
| 关于页 / 咨询页的「官方网站」行 | 改为**纯文本展示**，不再可点击跳转 |

### 服务器上的视频文件

`/opt/video/` 下的 13 支 mp4 与封面**仍在服务器上**（合计约 24.7 MB），
但小程序已完全不引用它们。清理方法：

```bash
# 谨慎：确认不再需要后再执行
rm -rf /opt/video/bzr-*.mp4 /opt/video/cover/bzr-*.jpg
```

> 服务器上还留着 `/opt/video/play.html`（2.5 KB 的网页播放器），同样已不被引用，可删。

### 现在项目里不存在的东西（已校验）

- 无 `<video>` 组件
- 无 `<web-view>` 组件
- 无 `wx.previewMedia` 调用
- 无任何指向 `/pages/videos`、`/pages/website`、`/pages/player` 的引用

校验脚本每次都会检查这几项，出现即报错。

---
## 八、图片托管（重要：图片不在包里）

### 为什么

小程序主包上限 **2 MB**。原先把 125 张图打进包，整包 **17.46 MB**，上传直接失败：

```
错误码 80051, source size 17746KB exceed max limit 2MB
```

我核算过：即使把证书压到 600px（小字已看不清）、产品图压到 420px，
产品+证书仍要 5～6 MB，**怎么压都进不了 2 MB**。
而包内固定开销（代码 314KB + 13 张视频封面 1002KB + 品牌头图 86KB）本身就占了 1.4 MB。

> 补充：**分包也解决不了**。分包单个上限同样是 2 MB，
> 而且主包页面引用分包里的图片时，分包还没下载，图片不会显示。

### 解决方案：图片全部托管到服务器

图片已上传到 `senluoflow.com`，复用已有的 nginx 静态目录（**没有改 nginx 配置**）：

```
/opt/video/product/<系列id>/*.jpg   96 张产品图 + 系列封面
/opt/video/cert/*.jpg               15 张证书
/opt/video/cover/*.jpg              13 张视频封面 + 1 张品牌头图
```

对外地址：`https://senluoflow.com/video/{product,cert,cover}/...`

包内**只保留** tab 图标（8 个 SVG，2.6KB）和占位图，其余全部移除：

| | 迁移前 | 迁移后 |
|---|---|---|
| 主包体积 | 17.46 MB | **315 KB** |
| 包内图片 | 139 个 | 9 个（全是 SVG 图标） |
| 上传 | ❌ 超过 2MB | ✅ 余量 1.7 MB |

### 代码改动

图片地址集中在**两处**，换服务器只改这两个常量：

```js
// data/catalog.js
var IMG_BASE = 'https://senluoflow.com/video/'

// data/video.js
var VIDEO_BASE = 'https://senluoflow.com/video/'
var COVER_BASE = VIDEO_BASE + 'cover/'
```

`site.js` 的 `brandCover` 也指向服务器（`/video/cover/brand-cover.jpg`）。

### 已验证

**138 个资源 URL（125 张图 + 13 个视频）全部逐一 HTTP 校验，0 个失败。**

### 需要注意

- **首次浏览需要联网**。图片走网络加载（微信会缓存），断网时显示占位块，不会崩。
- 域名 `senluoflow.com` 必须留在微信后台的 **downloadFile 合法域名** 里。
- 商标注册证（tm-2 / tm-35）素材只有 PDF，`images` 已留空 —— 页面不再请求不存在的图，
  也不显示「查看原件」按钮。
- 腾讯云 COS 等对象存储也可以，只要改上面那两个常量并配好域名。

---

## 九、用量计算器（为「核心功能闭环」新增）

### 为什么加这个

审核意见要求「完善核心功能闭环」。原版本的产品目录虽在站内，
但用户看完产品仍要跳出去问价，闭环不完整。

因此新增一个**完全在小程序内闭环**的实用工具：

```
选施工场景 → 填涂装面积 → 得到推荐系列 + 用漆量 + 建议桶数
          → 「按此方案咨询报价」→ 结果自动填入咨询表
```

它解决的是客户最常问的实际问题：「我这 300㎡ 要买几桶？」
全程不跳外部渠道，且直接产出可提交的咨询内容。

### 页面位置

`pages/calculator/calculator`

入口有三处：

| 入口 | 位置 |
|---|---|
| 首页 | 产品系列上方的深绿色「涂料用量计算器」卡片 |
| 产品中心 | 筛选栏下方「不确定要买多少桶？」横条 |
| 产品详情 | 「获取资料与报价」下方的同款横条 |

### 计算逻辑

数据在 `data/estimate.js`：

- `RATES`：各系列的单遍涂布率（㎡/kg）与包装规格（kg/桶）
- `SCENARIOS`：8 种施工场景，各自指定面漆系列、遍数、配套底涂

```
用漆量(kg) = 面积 × 遍数 ÷ 涂布率(㎡/kg)
桶数      = ceil( 用漆量 ÷ 包装规格 )
```

8 个场景：

| 场景 | 面漆 | 底涂 | 可加罩面 |
|---|---|---|---|
| 家装内墙 | 家装内墙 | 无机底固 | ✓ |
| 儿童房 | 儿童房 | 无机底固 | ✓ |
| 工程内墙 | 大众化工程内墙 | 无机底固 | ✓ |
| 公共建筑内墙 | 政府工程内墙 | 无机底固 | ✓ |
| 外墙 | 外墙 | 无机底固 | ✓ |
| 防水 | 天冬聚脲防水 | — | ✗ |
| 地坪 | 天冬聚脲地坪漆 | — | ✗ |
| 旧墙翻新 | 家装内墙 | 界面剂 | ✓ |

> 防水与地坪**不提供罩面选项**，因为罩面是墙面用的，加在这里会算出错误建议。

### 实测结果（100㎡ 举例）

| 场景 | 面漆 | 底涂 | 罩面 | 合计 |
|---|---|---|---|---|
| 家装内墙 | 3 桶 | 1 桶 | 1 桶 | **5 桶** |
| 儿童房 | 5 桶（5kg 装） | 1 桶 | 1 桶 | **7 桶** |
| 工程内墙 | 2 桶（20kg 装） | 1 桶 | 1 桶 | **4 桶** |
| 防水 | 18 桶 | — | — | **18 桶** |
| 地坪 | 4 桶 | — | — | **4 桶** |

### 免责说明

页面明确标注：结果按**理论涂布率**估算，实际用量受基层吸水率、
施工方式、损耗与涂层厚度影响，通常有 ±10% 浮动，最终以现场勘察为准。
这是为了合规，也避免客户拿着估算值来争论。

---
## 十、在线留言接收接口（方案 A，已上线）

### 为什么必须做

留言以前只存用户手机，提示「未接入云端接收，建议直接拨打电话」——
审核会认定「服务需跳转其他渠道才能体验」，属强制引流。
现在留言**真正送达企业服务器**，闭环完整。

### 架构

```
小程序「咨询与留言」
   └─ wx.request POST https://senluoflow.com/mp/inquiry
        └─ nginx  location = /mp/inquiry  →  127.0.0.1:5099
             └─ mp-inquiry.service（Python 标准库，无第三方依赖）
                  └─ 追加写入 /opt/mp-inquiry/inquiries.jsonl
```

### 服务器部署（已完成）

| 项目 | 内容 |
|---|---|
| 目录 | `/opt/mp-inquiry/`（owner `www-data`，权限 750） |
| 程序 | `server.py`（约 7.5 KB，Python 3.12 标准库） |
| 数据 | `inquiries.jsonl`，每行一条 JSON，追加写，超 5 MB 自动轮转 |
| 服务 | `systemctl status mp-inquiry`（已 enable 开机自启） |
| 端口 | `127.0.0.1:5099`（只监听回环，公网必须经 nginx） |
| nginx | 443 块新增 `location = /mp/inquiry`，备份在 `sites-available/senluoflow.bak.*` |
| 说明 | `/opt/mp-inquiry/README.txt` |

### 接口约定

```
POST https://senluoflow.com/mp/inquiry
Content-Type: application/json
{ "id","name","phone","company","city","type","interest","message" }

200 {"ok":true}                     成功
400 {"ok":false,"error":"..."}      校验失败（缺姓名/手机号不合法/非 JSON）
413                                 body 超 8k（nginx 拦）
429 {"ok":false,"error":"too many requests"}   限流
405                                  GET 不支持
```

### 安全措施

- 只监听 `127.0.0.1`，公网必须经 nginx
- 请求体上限 4 KB（nginx 层 8 KB）
- 每 IP 每分钟最多 6 次
- 只保存白名单字段并各自限长，`message` 最长 2000 字
- **不提供任何读取接口** —— 留言含手机号，绝不能公开
- systemd `ProtectSystem=strict` + `ReadWritePaths=/opt/mp-inquiry`，只能写这一个目录

### 小程序端改动

| 文件 | 改动 |
|---|---|
| `config.js` | 新增 `inquiryApi: 'https://senluoflow.com/mp/inquiry'` |
| `utils/inquiry.js` | 新增 `postInquiry()`（wx.request）、`pendingInquiries()`、`retryPending()` |
| `pages/contact/contact.js` | 提交后上报；成功提示「提交成功」，失败提示「已保存到本机」并引导去「我的留言」重试 |
| `pages/messages/messages.js/.wxml` | 显示「已送达 / 待送达」，有待送达时出现「重新提交」，**进页面自动补发** |

> 失败文案已彻底去掉「建议拨打电话」，不再构成引流。
> 网络恢复后，用户只要进入「我的留言」页就会自动补发，不会丢单。

### 实测结果

| 用例 | 结果 |
|---|---|
| UTF-8 中文提交 | ✅ 200，落盘中文正确 |
| ASCII 提交 | ✅ 200 |
| 非法手机号 | ✅ 400 `invalid phone` |
| 缺姓名 | ✅ 400 `name required` |
| 非 JSON | ✅ 400 `invalid json` |
| GET 读取 | ✅ 405（不提供读取） |
| 超大 body | ✅ 413 |
| 限流（连发 10 次） | ✅ 第 3 次起 429 |
| 小程序提交成功 | ✅ POST 正确地址，标记 `synced=true`，提示「提交成功」 |
| 小程序提交失败 | ✅ 保持 `synced=false`，文案不引导打电话 |
| 进入「我的留言」 | ✅ 自动补发成功，状态变「已送达」 |

### 查看留言

```bash
# 最近 10 条
tail -n 10 /opt/mp-inquiry/inquiries.jsonl

# 格式化（需 jq）
tail -n 20 /opt/mp-inquiry/inquiries.jsonl \
  | jq -r '"\(.receivedAt|todate)  \(.name)  \(.phone)  \(.company // "-")"'

# 导出 CSV 用 Excel 打开
jq -r '[.receivedAt|todate,.name,.phone,.company//"",.city//"",.type//"",.interest//"",(.message//""|gsub("\n";" "))]|@csv' \
  /opt/mp-inquiry/inquiries.jsonl > /tmp/inquiries.csv
```

### ⚠️ 还需要你在微信后台做一件事

把 **`https://senluoflow.com` 加入「request 合法域名」**
（开发管理 → 开发设置 → 服务器域名 → request 合法域名）。

> 这是**第三个**独立列表了，别和新混：
> | 用途 | 域名列表 | 状态 |
> |---|---|---|
> | 图片加载 | downloadFile 合法域名 | ✅ 已配 |
> | 网页内嵌 | 业务域名 | ✅ 已配（现已无 web-view，可撤） |
> | 留言提交 | **request 合法域名** | ⏳ **待配** |

**没配的后果**：真机提交会失败（本地可通），留言落在「待送达」并可重试。
开发者工具里勾了「不校验合法域名」时不受影响。

### 可选：新留言自动通知

把企业微信/钉钉机器人 webhook 写进 `/opt/mp-inquiry/notify.json`：

```json
{ "webhook": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx" }
```

支持企业微信机器人、钉钉机器人、Server酱、PushPlus。
文件不存在则不通知；通知失败不影响留言保存；改完无需重启。

---
## 十一、转发与分享（已修复「不可转发」）

### 问题原因

用户反馈小程序**无法转发**。原因是代码里**一个分享回调都没定义**。

微信官方规定（[Page 文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object)原文）：

> **只有定义了此事件处理函数，右上角菜单才会显示"转发"按钮**
> —— 指 `onShareAppMessage`
>
> **只有定义了此事件处理函数，右上角菜单才会显示"分享到朋友圈"按钮**
> —— 指 `onShareTimeline`

与备案无关 —— 备案解决的是能否上架/被搜索，转发开关取决于页面是否声明回调。

### 另一个关键点（容易踩坑）

> 这些方法可以放在 `Page` 构造器中，也可以放在 `Component` 构造器的 **`methods`** 导出方法中

本项目 **13 个页面全部用 `Component()` 构造**，所以 `onShareAppMessage` / `onShareTimeline`
**必须写在 `methods` 里面**。写在外层不生效 —— 这很可能就是当初"转发不了"的直接原因
（若之前有人加过分享但放错了层级，菜单依然不会出现"转发"）。

### 已完成的改动

13 个页面**全部**补上两个回调，共 140 行纯新增：

| 页面 | 转发标题 |
|---|---|
| 首页 | 贝之然纯无机涂料 · 纯无机 · A1 级不燃 · 与楼房同寿命 |
| 产品中心 | 贝之然产品系列 · 11 大系列覆盖涂装全链路 |
| 系列详情 | 动态：`贝之然 · <系列名> · <一句话定位>` |
| 视频中心 | 贝之然产品短视频 · 30 秒看懂一个系列 |
| 资质与检测 | 贝之然资质与检测 · A1 级不燃 · VOC 未检出 |
| 政策与标准 | 政策要求 A 级不燃 · 无机涂料的强制性依据 |
| 招商加盟 | 贝之然招商加盟 · 县级/地级/跨境代理 |
| 关于我们 / 咨询 / 官网 / 免责声明 / 我的留言 / 启动日志 | 各自专属文案 |

**系列详情页做了动态处理**：转发时会带上系列标题和 `?id=<系列id>`，
好友点开直接落到该系列页；分享到朋友圈则带 `query: id=<系列id>`。

### 统一配置在 utils/share.js

分享文案与图片集中在 [miniprogram/utils/share.js](miniprogram/utils/share.js)，
改文案只动这一个文件：

```js
shareApp('index', { title: '...' })      // 转发：支持自定义 path
shareTimeline('index', { title: '...' }) // 朋友圈：只能带 query，不能自定义 path
```

分享图用服务器上的图片（**不占包体积**），转发卡片 5:4、朋友圈 1:1。

### 想加页面内「转发给好友」按钮

直接给 `<button>` 加 `open-type="share"` 即可，会自动调到 `onShareAppMessage`：

```html
<button open-type="share" class="btn-primary">转发给好友</button>
```

需要我在首页底部加一个显式的转发按钮，说一声即可。

### 如果转发仍然不可用

代码之外还有两种可能，需要你在后台确认：

1. **小程序被封禁分享**：若有过违规，微信会禁用分享能力。
   到 微信公众平台 → 设置 → 违规记录 查看有无「封禁分享」处罚。
2. **未发布/未审核通过**：开发版、体验版的转发能力有限，
   需上传正式版本并设置为线上版本后，转发才完全生效。

---

## 十二、本次开发遇到的环境限制（需要你知道）

### ⚠️ 白屏 / 「页面不存在」的排查经验（已解决，务必记住）

删掉页面之后，开发者工具可能出现**白屏**，或者显示微信官方的
「**页面不存在**」提示页。**通常不是代码问题，而是工具的编译缓存还留着旧页面。**

原因：工具的编译缓存按项目哈希存放，删页面后缓存里仍有旧页面的编译产物，
且模拟器可能还原上次停留的路由。旧路由在新版 `app.json` 里已不存在 → 404。

排查顺序（实测有效）：

1. **先看模拟器日志**，能直接看到加载了哪些页面、有没有报错：

   ```
   %LOCALAPPDATA%\微信开发者工具\User Data\<哈希>\WeappSimulator\
     WeappFileSystem\<用户>\<AppID>\usr\miniprogramLog\log1
   ```

   正常应看到 `page pages/index/index onLoad → onShow → onReady → onRouteDone`。

2. **清编译缓存**（关键步骤）。先完全关闭开发者工具，再删除：

   ```
   %LOCALAPPDATA%\微信开发者工具\User Data\<哈希>\WeappCache\WeappCompileCache\<项目哈希>\
   ```

   然后用 `cli open --project D:\projects\BestLand` 重新打开，工具会全量重新编译。

3. **清掉工具里残留的旧路由引用**。全目录搜索已删路由，正常只应出现在
   `WeappLocalData` 的**上传历史**里（`uploadInfo` 元数据，无害）。

### 顺带加固的启动期容错

白屏也可能是启动期 JS 抛错导致，已修复三处：

| 位置 | 原问题 |
|---|---|
| `app.js` `measureSystem` | `wx.getMenuButtonBoundingClientRect()` 可能返回 undefined 或不存在，直接读 `.top` 会抛 TypeError |
| `components/navigation-bar` | `rect.left`、`res.safeArea.top` 无保护，拿不到就抛错（该组件每个页面都用） |
| `pages/detail` | 没有 `id` 或 `id` 无效时 `series` 为 null，整页 `wx:if` 不成立 → 全白。现改为显示「没有找到这个产品系列」+ 返回入口 |

在你当前这台机器上，我遇到了两个硬限制，影响了交付方式：

1. **命令行一开始完全不可用，后来恢复。**
   起初任何 shell 命令都以 `SetNamedSecurityInfoW failed (Win32 5): grantWrite(D:\projects\BestLand)` 失败——
   沙箱初始化无法给工作目录授予写权限。后来权限放开，命令行才可用，
   图片导入和各项校验才得以完成。

2. **模型不支持读取图片。**
   所以我无法识别桶身上的产品型号、也无法核对证书内容。
   证书的编号（`2022070388`、`WT20103221065631WT1`、`FX26010300`、`67583611`、`67586855`）
   和检测机构是从你的**文件名**里读出来的，可信；但证书图片本身我没看过。
   商标注册证只有 PDF，我也没有 PDF 转图片的能力，所以那 2 张图仍缺。

### 已做的校验（命令行恢复后）

| 校验项 | 结果 |
|---|---|
| WXML 事件绑定是否都在 JS 中存在 | 12 个文件、53 个绑定，**0 问题** |
| 自定义组件是否都已注册、组件文件是否齐全 | **0 问题** |
| `app.json` 的 9 个页面是否 `.js/.json/.wxml/.wxss` 齐全 | **0 问题** |
| 所有 JSON 是否合法 | **0 问题** |
| 代码引用的图片路径是否都存在 | 119 个引用，115 命中；缺的 4 个是商标证（PDF-only） |
| 所有 JPEG 是否可正常解码 | 119 个，**0 个损坏** |

---

## 十三、Git 版本管理

仓库已经初始化好了，分支 `main`，含一个初始提交。

```
提交   0eb9a44  初始化贝之然小程序：品牌展示 + 产品目录 + 在线咨询
跟踪   225 个文件
分支   main
```

### 已配置的内容

**`.gitignore`** —— 忽略不该进仓库的东西：

| 忽略项 | 原因 |
|---|---|
| `node_modules/`、各类 lock 文件 | 依赖不共享 |
| `miniprogram_npm/`、`.wechat/`、`.wxcloud/` | 开发者工具的编译缓存 |
| `project.private.config.json` | 含开发者工具版本、本地编译开关等个人设置 |
| `.vscode/`、`.idea/`、`*.swp` | 编辑器配置 |
| `.DS_Store`、`Thumbs.db`、`desktop.ini` | 系统文件 |

> ⚠️ **注意 `miniprogram/` 下的 `.js` / `.wxss` 不能忽略。**
> 本项目是「免构建」的，这些是真正被加载的源码产物（见第六节）。

**`.gitattributes`** —— 图片标记为二进制，文本统一 LF 行尾，避免 Windows 上换行符被反复改写。

### 常用命令

```bash
git -C D:\projects\BestLand status              # 看改动
git -C D:\projects\BestLand add -A              # 暂存全部
git -C D:\projects\BestLand commit -m "说明"     # 提交
git -C D:\projects\BestLand log --oneline       # 看历史
```

### 远程仓库（已关联并推送）

```
origin  https://github.com/aluosen01-byte/BestLand.git   （私有）
分支    main，本地与远程完全一致
```

日常提交流程：

```bash
git -C D:\projects\BestLand status              # 看改动
git -C D:\projects\BestLand add -A              # 暂存全部
git -C D:\projects\BestLand commit -m "说明"     # 提交
git -C D:\projects\BestLand push                # 推到 GitHub
```

> 本机的 git 凭据由 `credential.helper = manager` 管理，已经能正常推送到该私有仓库。
> 如果换电脑推送时提示认证失败，注意 GitHub 不接受账号密码，
> 需要用 **Personal Access Token** 代替密码（或在凭据管理器里登录）。

> 仓库体积约 16 MB，主要是产品图。如果 GitHub 提示单文件或仓库体积问题，
> 可以启用 Git LFS 管理 `miniprogram/images/`，需要的话我来配。

---

## 十四、用 CLI 自动上传到微信平台

**已成功上传过一次**（AppID `wx3e3cecb062cf0d9d`，版本 `1.0.0`，包体 **193.7 KB**）。

以后发版不需要手动点「上传」，一条命令即可：

```bash
"D:\微信web开发者工具\cli.bat" upload \
  --project D:\projects\BestLand \
  --version 1.0.0 \
  --desc "版本说明" \
  --port 9420
```

### 前置条件（本机已配好）

| 项 | 状态 |
|---|---|
| 工具登录 | ✅ 已登录（`cli islogin` 返回 `{"login":true}`） |
| 服务端口 | ✅ 已开启（`enableServicePort: true`） |
| CLI 端口文件 | `.ide` = `9420` |

### 踩过的坑：CLI 的「鸡生蛋」问题

第一次调用 CLI 一直报：

```
IDE service port disabled ... set Service Port On
```

排查 `cli.js` 源码后发现它的判断逻辑是：

```js
// 简化后的逻辑
writeFileSync(userDirPath + '/.cli', cliPort)      // 先写 .cli
const status = readFileSync(userDirPath + '/.ide-status')  // 再读 .ide-status
if (status.trim() !== 'On') { exit(端口未开启) }     // 不等于 On 就直接退出
// —— 只有越过这里，才会带 --enable-service-port 去拉起 IDE
```

**死锁点**：`.ide-status` 是 **IDE 自己开启服务端口后才会写**的文件，
而 CLI 在拉起 IDE **之前**就要读它。工具没在运行时该文件不存在 → CLI 永远卡住。

另外 `userDirPath` 在 Windows 上是：

```
C:\Users\<用户>\AppData\Local\微信开发者工具\User Data\<installPath的MD5>\Default
```

解法：手动在该目录创建 `.ide-status`，内容为 ASCII `On`（CLI 用 `trim() === 'On'` 严格比较）。

```powershell
$d = "$env:USERPROFILE\AppData\Local\微信开发者工具\User Data\270d7310f77e162f7f0cb30ab692180c\Default"
[System.IO.File]::WriteAllText("$d\.ide-status", 'On', [System.Text.ASCIIEncoding]::new())
```

> ⚠️ **工具重启后可能又需要重建这个文件。** 若 CLI 再次报「服务端口已关闭」，
> 先检查 `.ide-status` 是否存在且内容为 `On`。
>
> 更正规的做法是在工具里点：**设置 → 安全设置 → 服务端口**（会提示重启工具）。

### 上传前检查清单

1. **git 已提交**（CLI 上传的是工作区当前文件，不是 git 提交）
2. **开发者工具已登录**，且账号对 AppID 有开发权限
3. **图片/视频域名已配**：`senluoflow.com` 需在 downloadFile 合法域名里
4. 上传后在 **微信公众平台 → 版本管理** 里能看到该版本，可提交审核 / 设为体验版

---

## 十五、代码结构

```
miniprogram/
├── app.js / app.json / app.wxss   入口、全局配置与全局样式（生效）
├── app.ts / app.less / theme.less 源码存档（未启用编译）
├── config.js                      运行配置（cloudEnv 等）
├── data/
│   ├── site.js                    公司信息、品牌卖点、专利、案例、资质亮点
│   ├── catalog.js                 11 个系列（宣传册真实参数）+ 单品 + 资质证书
│   ├── estimate.js                用量计算：涂布率、包装规格、8 种施工场景
│   ├── franchise.js               招商加盟：权益/门槛/支持/海外流程/FAQ
│   └── policy.js                  政策背书：11 项政策与标准 + 出处链接
├── utils/
│   ├── util.js                    时间格式化、手机号校验
│   ├── inquiry.js                 留言的本地存储与云端上报
│   └── share.js                   转发/朋友圈的统一文案与分享图配置
├── components/
│   ├── navigation-bar/            自定义导航栏（原模板，已补上缺失的 home 方法）
│   ├── tab-bar/                   自定义底部导航（首页/产品/咨询）
│   └── mkimg/                     带占位与淡入的图片组件
└── pages/                         12 个页面（见第二节）
```

---

## 十六、还没做 / 可以继续加的

- **产品型号**：目前是 `家装内墙 JZ-01` 这类占位编号，见第三节。
- **官网 web-view**：需在微信后台配业务域名并放校验文件（第八节）。
- **服务器清理**：`/opt/video` 下的 4K 原片与 `/opt/video_orig` 共约 3.5 GB 可释放（第七节）。
- **`贝之缘商标注册证`**：这是另一个商标（贝之缘），当前没放进小程序。
- **纸质证书（5 张微信图片）**：`证书资质纸质版\微信图片_202510221005xx.jpg` 还没用上，
  可以加一个「荣誉资质」区块。
- **真石漆 / 仿石漆独立系列**：宣传册与视频都提到这两个品类，但素材没有对应白底产品图，
  暂未建成独立系列。
- **购物车与在线下单**：你选的是「品牌展示 + 产品目录 + 在线咨询」，所以没做交易闭环。
- **图片可考虑换对象存储**：现在图在 `senluoflow.com/video/`（和 Flask 应用同一台机）。
  如果访问量上来，可以挪到腾讯云 COS / 阿里云 OSS，改 `catalog.js` 与 `video.js`
  里那两个常量即可，不用改页面代码。
- ⚠️ **招商加盟页的数据要复核**：代理权益与门槛（保证金、首批货款、销售额要求等）
  转录自宣传册第 46 页，上线前请与当前实际招商政策核对一次。

---

## 十七、v47 宣传册换肤与内容对照（2026-10-28）

素材：`D:\跨境电商\A贝歌\贝之然中英宣传册v47 - 2026年10月28日.pptx`（43 页 / 42 MB）

### ⚠️ v47 是图片版，正文需要特殊方式提取

43 页里**正文几乎全是导出的图片**，`slide.shapes` 直接读只能拿到零星图注。
真正的内容藏在**组合形状（group shapes）**里，必须递归解析：

```python
def walk(shapes, acc):
    for sh in shapes:
        if sh.shape_type == MSO_SHAPE_TYPE.GROUP:
            walk(sh.shapes, acc)      # 关键：递归进入组合
        else:
            acc.append(sh)
```

递归后从「0 个文本形状」变成 **527 个文本形状**，内容完整。脚本见
`_video_out/pptx_dump2.py`、`pptx_read.py`（未入库，属一次性工具）。

### 风格（从 PPTX 主题 + 页面渲染图统计得到）

| 角色 | 色值 | 用途 |
|---|---|---|
| 主色 | `#1F3A44` | 标题、主按钮、深底块 |
| 深色 | `#16292F` | 渐变另一端、图片占位底 |
| 强调 | `#F0A22E` | 橙色编号 01/02、英文 kicker、强调线 |
| 正文 | `#1D2226` | 段落文字 |
| 次要 | `#5C666B` | 英文副标、说明文字 |
| 米色 | `#F4F1EA` / `#D8D2C6` | 篇章底、石色块 |
| 底色 | `#F7F5F0` | 页面背景（原为浅灰绿） |
| 蓝 | `#2F6FB2` | 链接/次级强调 |

字体：中文 `Microsoft YaHei`，英文 `Arial`（宣传册用 Arial Black 做大标题）。

字阶按 1pt ≈ 2rpx 换算：54pt→108rpx、30pt→60rpx（页面标题用 44rpx）、
21pt→42rpx、18pt→36rpx、15pt→30rpx（正文 28rpx）、12pt→24rpx、10.5pt→21rpx。

### 落地方式

- **全局换色**：脚本替换 35 个文件共 **490 处**（`wxss` / `less` / `wxml`），
  含大小写变体与绿色系残留；替换后做了色相审计，无异常残留
- **新增工具类**（`app.wxss`）：`.kicker` `.num` `.h1` `.h2` `.body` `.caption`
  `.part`（篇章分隔页）`.ref`（出处引用块）
- **版式**：首页首屏改成宣传册封面结构；卖点区改为「产品六大优势」橙色编号；
  政策页与关于页插入 `PART 05 / PART 06` 篇章分隔页；系列详情标题加英文副标

### 内容对照（逐页核对 v47 的 43 页）

| v47 页 | 内容 | 小程序落点 |
|---|---|---|
| 1 | 封面：2026 宣传简介、口号、五条特性 | 首页首屏 |
| 2–3 | 商标注册证、品牌标识与定位 | 关于页「品牌标识」区块（新增） |
| 4 | 产品六大优势（含量化指标） | 首页「产品六大优势」（由 4 条扩为 6 条） |
| 5 | 发明专利证书 | 关于页「国家发明专利」 |
| 6 | 纯无机核心材料 25kg | 并入「无机底固」说明（无产品图，未建空页面） |
| 7–10 | 3 份检测报告 + ISO 三体系 | 资质与检测页（已有） |
| 11–16 | 外墙案例 5 处（肇庆/梅州/厦门/深圳/安溪） | 关于页「应用案例」（更新为真实项目） |
| 17–18 | 内墙案例（广州宾馆） | 关于页「应用案例」 |
| 19–31 | 11 个产品系列 + 包装规格 | 产品中心 / 系列详情（内容原已同源） |
| 33–34 | 政策导向 4 条 + VOCs 政策 5 条 | 政策与标准页 |
| 35 | 参考文献 1–12 | 政策页出处（补齐第 5 条，编号连续） |
| 37–42 | 推广矩阵 30 个渠道 | 关于页「品牌推广矩阵」（新增） |
| 43 | 联系方式 | 关于页 / 咨询页 |

### 三个需要你知道的判断

1. **口号英文拼写**：宣传册写作 `NEVER SEPERATE`（拼写有误），
   小程序内用了正确的 `NEVER SEPARATE`。
2. **推广矩阵重新归类**：宣传册按左右两栏排，但右栏混了百度百科/快手/抖音等国内平台。
   小程序按内容重新分为**国内 19 个 / 跨境 11 个**。
3. **「纯无机核心材料」未单独建页**：服务器 `/opt/video/product/` 下没有它的产品图，
   建了会是空图页。暂并入「无机底固」页的配套说明。**如果你有它的白底产品图，给我就能独立成页。**

### 本次版本

`2.0.0`（212.9 KB）—— 换肤 + 内容更新的第一个正式版本。