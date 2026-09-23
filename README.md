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
| 5 | 视频部署 | ⏳ **需你在服务器侧改造**（见第七节，当前配置微信用不了） |
| 6 | 商标注册证图片 | ⏳ 素材只有 PDF，见 [IMAGE-MAPPING.md](IMAGE-MAPPING.md) 第二节 |
| 7 | 公开展示的邮箱 | ⏳ 宣传册里是个人 QQ 邮箱，我未放上小程序；有企业邮箱请告知 |

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

## 七、视频（13 支短视频）

素材：`D:\跨境电商\A贝歌\贝之然涂料视频`，13 支竖屏短片，每支约 30 秒。

### 已完成的压缩

原始文件是 **4K 竖屏 HEVC，单支 126–270 MB，合计 1750 MB**，不可能放进小程序包。
我已统一转为微信可直接播放的格式：

| 项目 | 原始 | 压缩后 |
|---|---|---|
| 分辨率 | 2160×3840（其中 No.03 为 4272×7680） | **720×1280** |
| 编码 | HEVC | **H.264 High@3.1** |
| 码率 | 21–75 Mbps | 约 400–700 kbps |
| 音频 | AAC | AAC 96k 双声道 |
| 单支体积 | 126–270 MB | **1.4–2.8 MB** |
| 合计 | 1750 MB | **24.7 MB**（缩小 71 倍） |

另外从每支视频第 2 秒抽帧生成了 13 张竖版封面（540×960），已放进
`miniprogram/images/video/`，小程序包里只用封面，**不包含视频本体**。

压缩后的 mp4 在项目根目录 `_video_out/`（该目录已被 `.gitignore` 忽略）。
参数：`scale=720:-2 -c:v libx264 -crf 28 -preset medium -movflags +faststart`。

### ⚠️ 你现在的服务器暂时用不了，需要在服务器侧改三件事

你给的地址是 `47.107.190.235` 的 `/opt/video`，我实际探测了，结果是：

| 探测项 | 结果 | 微信要求 | 结论 |
|---|---|---|---|
| HTTP | 301 强制跳 HTTPS | 必须 HTTPS | 需保留 |
| HTTPS 证书 | **自签名，不受信任**（curl 退出码 60） | 必须是受信任 CA 证书 | ❌ **必须换** |
| 访问控制 | `/video/` **302 跳转到 `/login`**（SenluoFlow 登录页） | 资源必须匿名可访问 | ❌ **必须去掉** |
| 地址形态 | 纯 IP `47.107.190.235` | **必须备案域名**，微信不接受 IP | ❌ **必须换域名** |

**小程序里 `wx.downloadFile` / `<video>` 的域名必须是已备案域名，并在
微信公众平台「开发管理 → 开发设置 → 服务器域名 → downloadFile 合法域名」里配置。
IP 地址、自签证书、需要登录的路径，三者都会导致视频无法播放。**

### 需要你在服务器上做的事

```bash
# 1) 用真实域名 + 免费证书（假设域名 video.bestlandpaint.com 已解析到这台机）
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d video.bestlandpaint.com

# 2) 让该路径匿名可访问，不要走 SenluoFlow 的登录
#    在 nginx 里单独加一个 location，root 指向 /opt/video
#    （注意：只放开这个目录，别把整个站点鉴权去掉）
```

nginx 参考片段：

```nginx
server {
    listen 443 ssl http2;
    server_name video.bestlandpaint.com;

    ssl_certificate     /etc/letsencrypt/live/video.bestlandpaint.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/video.bestlandpaint.com/privkey.pem;

    location /video/ {
        alias /opt/video/;          # 视频目录
        autoindex off;
        add_header Access-Control-Allow-Origin *;
        add_header Accept-Ranges bytes;   # 支持拖动进度
        types { video/mp4 mp4; }
        default_type video/mp4;
    }
}
```

### 改完后你要做的一件事

把压缩后的 13 个 mp4 上传到服务器 `/opt/video/`，文件名**必须**保持：

```
bzr-01.mp4  bzr-02.mp4  bzr-03.mp4  bzr-04.mp4  bzr-05.mp4  bzr-06.mp4  bzr-07.mp4
bzr-08.mp4  bzr-09.mp4  bzr-10.mp4  bzr-11.mp4  bzr-12.mp4  bzr-13.mp4
```

（我在压缩时特意改成纯 ASCII 文件名，避免 URL 里出现空格、中文和多余的点。）

然后在 [video.js](miniprogram/data/video.js) 第 12 行把地址换掉：

```js
var VIDEO_BASE = 'https://video.bestlandpaint.com/video/'
```

最后在微信公众平台把 `video.bestlandpaint.com` 加入 **downloadFile 合法域名**，即可全量生效。

> 视频编号与系列的对应关系写在 `data/video.js` 里；
> 「视频」页可以切换播放，各产品详情页底部会自动列出该系列的相关视频。

📄 **服务器改造的具体步骤（含 nginx 配置、上传命令、ffmpeg 参数）见
[VIDEO-DEPLOY.md](VIDEO-DEPLOY.md)。**

---

## 八、本次开发遇到的环境限制（需要你知道）

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

## 九、Git 版本管理

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

## 十、代码结构

```
miniprogram/
├── app.js / app.json / app.wxss   入口、全局配置与全局样式（生效）
├── app.ts / app.less / theme.less 源码存档（未启用编译）
├── config.js                      运行配置（cloudEnv 等）
├── data/
│   ├── site.js                    公司信息、品牌卖点、专利、案例、资质亮点
│   ├── catalog.js                 11 个系列（宣传册真实参数）+ 单品 + 资质证书
│   └── video.js                   13 支短视频清单与播放地址    ← 改 VIDEO_BASE 即可生效
├── utils/
│   ├── util.js                    时间格式化、手机号校验
│   └── inquiry.js                 留言的本地存储与云端上报
├── components/
│   ├── navigation-bar/            自定义导航栏（原模板，已补上缺失的 home 方法）
│   ├── tab-bar/                   自定义底部导航（首页/产品/视频/咨询）
│   └── mkimg/                     带占位与淡入的图片组件
└── pages/                         10 个页面（见第二节）
```

---

## 十一、还没做 / 可以继续加的

- **产品型号**：目前是 `家装内墙 JZ-01` 这类占位编号，见第三节。
- **视频上线**：需先把域名与证书配好（第七节），再把 `video.js` 的 `VIDEO_BASE` 换掉。
- **`贝之缘商标注册证`**：这是另一个商标（贝之缘），当前没放进小程序。
- **纸质证书（5 张微信图片）**：`证书资质纸质版\微信图片_202510221005xx.jpg` 还没用上，
  可以加一个「荣誉资质」区块。
- **经销商 / 加盟页**：宣传册里有完整的代理权益与门槛（县级/地级/跨境），
  以及海外合作流程（MOQ 100 桶、100% T/T）。这些是渠道政策，我没放进消费者端小程序；
  如果你想做「招商加盟」板块，告诉我，我按宣传册内容建页面。
- **政策背书页**：宣传册第 43–45 页整理了 12 项国家政策与标准（《建筑防火通用规范》GB 55037-2022、
  《绿色建材产业高质量发展实施方案》等）。这类内容对工程客户很有说服力，可以单独做一页。
- **购物车与在线下单**：你选的是「品牌展示 + 产品目录 + 在线咨询」，所以没做交易闭环。
- **分包优化**：整包 17.4 MB（上限 20 MB）。若后续要加图，建议把图片拆到分包。
