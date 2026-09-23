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

## 一、先做这两件事

| # | 要做的事 | 说明 |
|---|---|---|
| 1 | **核对联系方式** | 改 `miniprogram/data/site.js`：电话、邮箱、地址、办公时间。**现在都是占位值。** |
| 2 | **补产品型号** | 看下面第三节。现在每个系列是占位型号。 |

图片**已经全部导入并压缩好了**（119 张，小程序包共约 16.4 MB），不需要你手动拷图。
详见 [IMAGE-MAPPING.md](IMAGE-MAPPING.md)，其中还列了唯一缺的 2 张图（商标注册证，素材里只有 PDF）。

然后：用微信开发者工具打开 `D:\projects\BestLand`，**直接编译**即可看到效果（无需构建 npm）。

---

## 二、页面结构

```
首页          品牌首屏 · 核心卖点 · 11 个系列 · 品牌实力 · 资质 · 服务场景 · 联系 · 页脚
产品中心      关键词搜索 + 分组筛选（内墙/外墙防水/基层/功能地面/工程）+ 系列卡列表
系列详情      图片轮播 · 技术参数 · 可选型号 · 适用场景 · 系列说明 · 相关资质 + 底部咨询栏
资质与检测    3 份检测报告 + ISO 三体系认证 + 2 项商标注册证，可分类筛选、查看原件
关于我们      公司简介 · 企业信息 · 坚持的事 · 产品链路 · 联系方式
咨询与留言    留言表单（校验+本地留存）· 联系方式 · 常见问题
我的留言      已提交留言的记录、拨号、复制、删除
免责声明      6 条：内容性质/检测报告/信息使用/知识产权/责任限制/声明更新
启动日志      原模板保留页，仅调试用（sitemap 已禁止收录）
```

底部导航是**自定义组件**（首页 / 产品 / 咨询），不是原生 tabBar，原因见第五节。

---

## 三、需要你确认的「占位数据」

### 1. 产品型号（重要）

我**无法读取图片内容**（当前模型不支持图像输入），所以看不出桶身上印的是什么型号。
现在 `miniprogram/data/catalog.js` 里每个系列有 4 个占位型号，例如：

```
家装内墙 JZ-01   5kg
家装内墙 JZ-02   18kg
```

（`JZ` 是系列的编码前缀，`JZ`=家装、`GC`=工程、`ZF`=政府、`ET`=儿童房、`WQ`=外墙、
`FS`=防水、`DP`=地坪、`ZW`=罩面、`DG`=底固、`JM`=界面、`QM`=墙面剂。）

**改成真实型号的两种方式：**

- 方式 A：直接把产品清单发我（例如「贝之然无机内墙漆 5kg / 18kg / 20kg」），我批量写入。
- 方式 B：自己改 `data/catalog.js` 里的 `buildProducts()`，并把对应系列的
  `hasRealModels` 改成 `true`（改完列表页就不再显示「型号待补充」黄标）。

### 2. 技术参数

每个系列 `specs` 里的涂布率、干燥时间、执行标准等是**行业通用示意值**，
请按实际产品说明 / TDS / 检测报告核对后替换。

---

## 四、图片目录约定

```
miniprogram/images/
├── products/<系列id>/
│   ├── cover.png      系列封面（首页、列表页用）
│   ├── 1.png          第 1 张产品图（详情页轮播）
│   └── 2.png ... N.png
├── certs/             资质证书（a1-1.png、hb-1.png、yx-1.png、iso-1.png、tm-2.png…）
├── brand/cover.png    品牌形象图（关于我们页顶部）
└── tab/*.svg          底部导航图标（已生成，勿删）
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

**源的完整对应表（哪个文件拷到哪个路径）在 [IMAGE-MAPPING.md](IMAGE-MAPPING.md)。**

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

## 七、本次开发遇到的环境限制（需要你知道）

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

## 八、代码结构

```
miniprogram/
├── app.js / app.json / app.wxss   入口、全局配置与全局样式（生效）
├── app.ts / app.less / theme.less 源码存档（未启用编译）
├── config.js                      运行配置（cloudEnv 等）
├── data/
│   ├── site.js                    公司信息、品牌卖点、服务场景   ← 请核对
│   └── catalog.js                 11 个系列 + 单品 + 资质证书    ← 型号待补
├── utils/
│   ├── util.js                    时间格式化、手机号校验
│   └── inquiry.js                 留言的本地存储与云端上报
├── components/
│   ├── navigation-bar/            自定义导航栏（原模板，已补上缺失的 home 方法）
│   ├── tab-bar/                   自定义底部导航
│   └── mkimg/                     带占位与淡入的图片组件
└── pages/                         9 个页面（见第二节）
```

另有一个我建的空文件 `miniprogram/utils/_placeholder.js` / `.ts`，没有引用、可以删除
（我因为没有命令行而删不掉）。

---

## 九、还没做 / 可以继续加的

- **购物车与在线下单**：你选的是「品牌展示 + 产品目录 + 在线咨询」，所以没做交易闭环。
  要做需要接入微信支付，并补充订单后端。
- **纸质证书（5 张微信图片）**：`证书资质纸质版\微信图片_202510221005xx.jpg` 还没用上，
  可以加一个「荣誉资质」区块。
- **专利与报告 PPT**：`贝之然涂料专利与报告.pptx` 里的内容我看不到，如果里面有专利号，
  发我可以加进资质页。
- **产品型号与真实技术参数**：见第三节。
- **`贝之缘商标注册证`**：这是另一个商标（贝之缘），当前没放进小程序，需要的话告诉我。
