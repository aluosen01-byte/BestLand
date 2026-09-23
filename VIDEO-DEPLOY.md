# 视频部署待办（贝之然小程序）

> **结论：域名和证书都没问题，`/video/` 目录也已经配好 —— 只差把视频传上去。**

---

## 一、我实测确认的现状

我用 curl 实际请求了你的服务器，结果如下：

| 检查项 | 实测结果 | 判断 |
|---|---|---|
| `senluoflow.com` 解析 | A 记录 → `47.107.190.235` ✅ | 指向你的视频服务器，正确 |
| HTTPS 证书 | curl 退出码 **0**（受信任） | ✅ **证书没问题**，不是自签名 |
| `https://senluoflow.com/video/` | **403**（nginx 直接应答） | ✅ 已被 nginx 映射为静态目录 |
| `https://senluoflow.com/video/bzr-01.mp4` | **404** | ❌ 视频文件还没上传 |
| 微信 downloadFile 合法域名 | 已配置 `senluoflow.com` | ✅ 无需再改 |

### 关键判断依据

- `/video/` 返回 **403**，而 `/video`、`/videox/` 等返回 **302 跳登录**。
  这说明 **nginx 专门为 `/video/`（带斜杠）配了静态目录映射**，
  它绕过了 SenluoFlow 的登录拦截 —— 403 只是「目录存在但不允许列目录」的正常表现。
- `/video/bzr-01.mp4` 返回 **404**，说明目录里还没有这个文件。
- 我用正确域名试了全部 13 个文件名，**0/13 存在**。

**所以之前那句报错提示（域名没配 / 证书不受信任）是误导** —— 真正的原因就是文件没上传。

---

## 二、你要做的：上传 13 个 mp4

压缩好的文件在项目根目录 `_video_out/`（共 24.7 MB），文件名**必须保持不变**：

```
bzr-01.mp4  bzr-02.mp4  bzr-03.mp4  bzr-04.mp4  bzr-05.mp4  bzr-06.mp4  bzr-07.mp4
bzr-08.mp4  bzr-09.mp4  bzr-10.mp4  bzr-11.mp4  bzr-12.mp4  bzr-13.mp4
```

```bash
scp _video_out/*.mp4 root@47.107.190.235:/opt/video/
```

然后确认权限（**这一步很重要**）：

```bash
ssh root@47.107.190.235

# 目录与文件都要让 nginx 能读
chmod 755 /opt/video
chmod 644 /opt/video/*.mp4

# nginx 通常以 www-data 运行，属主给谁都行但要可读
chown -R www-data:www-data /opt/video

# 确认文件到位
ls -lh /opt/video
```

> ⚠️ 如果 `/opt/video` 是 `root:root` + `700`，nginx 读不到，
> 就会一直 403 —— 这正是「目录 403、文件 404」之外最容易被忽略的一种情况。
> 如果上传后仍然 403，先查这里。

---

## 三、验证

传完后在浏览器或命令行验证（应该返回 `200` 和 `Content-Type: video/mp4`）：

```bash
curl -I https://senluoflow.com/video/bzr-01.mp4
```

期望看到：

```
HTTP/1.1 200 OK
Content-Type: video/mp4
Accept-Ranges: bytes
```

**代码侧我已经改好了**：[miniprogram/data/video.js](miniprogram/data/video.js) 里的
`VIDEO_BASE` 已指向 `https://senluoflow.com/video/`，你不需要再动代码。

传完文件后重新编译小程序，视频中心页、首页视频条、各产品详情页的相关视频就会全部正常播放。

---

## 四、如果上传后仍然播不了

按这个顺序排查：

| 现象 | 可能原因 | 处理 |
|---|---|---|
| 浏览器 403 | `/opt/video` 权限不对 | 按上面 `chmod 755` + `chown www-data` |
| 浏览器 404 | 文件名大小写或后缀不符 | 必须完全等于 `bzr-01.mp4` 这样 |
| 浏览器能播、小程序不能 | 微信后台域名没生效 | 开发者工具「详情 → 域名信息」确认；改完需重新编译 |
| 小程序报证书错误 | 该域名证书链不全 | 用 `curl -I` 确认退出码为 0；Let's Encrypt 需带 fullchain |
| 拖动进度条卡住 | 未开启 Range 支持 | nginx 加 `add_header Accept-Ranges bytes;` |

如果播放器报错，小程序里会显示一段可读的提示；你也可以把开发者工具
Console 里的 `[贝之然] 视频播放失败` 日志发我。

---

## 五、视频与系列的对应关系

编号是按内容归的类，写在 [miniprogram/data/video.js](miniprogram/data/video.js)：

| 编号 | 标题 | 关联系列 |
|---|---|---|
| bzr-01 | 把森林搬进家 | 品牌形象 |
| bzr-02 | 硬核陶瓷甲 | 家装内墙、政府工程内墙 |
| bzr-03 | 刷新即享安心家 | 家装内墙 |
| bzr-04 | 0 甲醛儿童房宝贝房专用 | 儿童房 |
| bzr-05 | 腻子膏修复底固专家 | 无机底固、界面剂 |
| bzr-06 | 抗污罩面隐形防弹衣 | 抗污罩面 |
| bzr-07 | 仿石漆外墙神器 | 外墙 |
| bzr-08 | 天冬聚脲地坪耐划甲 | 天冬聚脲地坪漆 |
| bzr-09 | 天冬聚脲防水隐形盾 | 天冬聚脲防水涂料 |
| bzr-10 | 给家一口会呼吸的墙 | 家装内墙 |
| bzr-11 | 仿石漆石材质感历久弥新 | 外墙 |
| bzr-12 | 真石漆一刷成石 30 年不褪色 | 外墙 |
| bzr-13 | 旧墙改造极致性价比 | 无机底固、界面剂、外墙 |

> 编号与标题的对应关系是从**视频文件名**读出来的（文件名里有内容描述），
> 视频画面本身我没有看过，归类若与实际内容不符，告诉我调整。

---

## 六、压缩参数（需要重新生成时用）

原始文件：4K 竖屏 HEVC，单支 126–270 MB，13 支合计 **1750 MB**。

```bash
ffmpeg -i input.mp4 \
  -vf "scale=720:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -level 3.1 -crf 28 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 2 \
  -movflags +faststart \
  bzr-NN.mp4
```

| 项目 | 原始 | 压缩后 |
|---|---|---|
| 分辨率 | 2160×3840（No.03 为 4272×7680） | 720×1280 |
| 编码 | HEVC | H.264 High@3.1（微信兼容最好） |
| 码率 | 21–75 Mbps | 约 400–700 kbps |
| 单支 | 126–270 MB | 1.4–2.8 MB |
| 合计 | 1750 MB | **24.7 MB**（缩小 71 倍） |

封面（`miniprogram/images/video/bzr-NN.jpg`）是从每支视频**第 2 秒**抽帧生成的：
避开片头黑场，尺寸 540×960，单张 61–104 KB。

---

## 七、说明

- 小程序包里**只有封面**（13 张，约 1 MB），不含视频本体 —— 视频走外部托管。
- `_video_out/` 已在 `.gitignore` 中忽略，不进 git 仓库。
  原始素材仍在 `D:\跨境电商\A贝歌\贝之然涂料视频`。
- 备用方案：如果之后不想依赖这台服务器，可以改用微信云开发的云存储，
  把 mp4 传到云存储后把 `VIDEO_BASE` 换成云存储 https 域名即可。需要的话我来接。
