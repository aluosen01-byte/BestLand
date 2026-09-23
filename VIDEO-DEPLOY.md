# 视频部署待办（贝之然小程序）

> 结论先说：**压缩后的 13 支视频已经准备好，但你现在的服务器配置微信小程序用不了，
> 需要你在服务器侧改三件事。** 改完只要改一行代码即可全量生效。

---

## 一、我探测到的现状

我实际请求了 `47.107.190.235`，结果如下：

| 探测项 | 实际结果 | 微信小程序要求 | 是否可用 |
|---|---|---|---|
| HTTP | `301` 强制跳转到 HTTPS | 必须 HTTPS | ✅ |
| HTTPS 证书 | **自签名，不受信任**（curl 退出码 60） | 受信任 CA 签发 | ❌ **必须换** |
| `/video/` 访问 | `302` 跳转到 `/login`（SenluoFlow 登录页） | 资源须匿名可访问 | ❌ **必须放开** |
| 地址形态 | 纯 IP `47.107.190.235` | **必须是备案域名** | ❌ **必须换域名** |

服务器是 **nginx 1.24.0 (Ubuntu)**，`/video/` 路径被 SenluoFlow 应用接管并做了登录鉴权。

### 为什么这三条是硬性要求

微信小程序里加载外部资源（`<video>`、`wx.downloadFile`）时：

1. **不接受 IP 地址**，必须是已备案域名；
2. **必须 HTTPS**，且证书链要能被系统信任（自签名会直接失败）；
3. 域名必须加入微信公众平台
   「开发管理 → 开发设置 → 服务器域名 → **downloadFile 合法域名**」。

---

## 二、需要你在服务器上做的三件事

假设你用 `video.bestlandpaint.com` 这个域名（已解析到该服务器）。

### 1. 申请受信任证书（免费）

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d video.bestlandpaint.com
```

certbot 会自动改 nginx 配置并配置续期。

### 2. 让 `/video/` 匿名可访问，绕开 SenluoFlow 登录

关键是：**只放开视频目录，不要把整个站点的鉴权去掉。**

在 nginx 的 server 块里，把 `/video/` 单独用一个 `location` 交给静态文件，
它就不会再走到 SenluoFlow 的路由：

```nginx
server {
    listen 443 ssl http2;
    server_name video.bestlandpaint.com;

    ssl_certificate     /etc/letsencrypt/live/video.bestlandpaint.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/video.bestlandpaint.com/privkey.pem;

    # 视频目录：直接由 nginx 发静态文件，匿名可读
    location /video/ {
        alias /opt/video/;
        autoindex off;                          # 不列目录
        add_header Accept-Ranges bytes;         # 支持拖动进度条
        add_header Access-Control-Allow-Origin *;
        types { video/mp4 mp4; }
        default_type video/mp4;
        expires 7d;
    }
}
```

改完执行 `sudo nginx -t && sudo systemctl reload nginx`。

### 3. 把压缩后的视频传上去

压缩后的文件在项目根目录 `_video_out/`，**文件名必须保持不变**：

```
bzr-01.mp4 ... bzr-13.mp4
```

我在压缩时特意改成纯 ASCII 文件名，就是为了避免 URL 里出现空格、中文和多余的点
（原文件名是 `No.01 贝之然纯无机涂料 · 把森林搬进家.mp4` 这种，做 URL 很容易出错）。

上传命令示例（按你的实际账号改）：

```bash
scp _video_out/*.mp4 root@47.107.190.235:/opt/video/
```

---

## 三、改完后要改的一行代码

打开 [miniprogram/data/video.js](miniprogram/data/video.js)，第 12 行附近：

```js
// 改前
var VIDEO_BASE = 'https://example.com/video/'

// 改后
var VIDEO_BASE = 'https://video.bestlandpaint.com/video/'
```

然后在微信公众平台把 `video.bestlandpaint.com` 加入 **downloadFile 合法域名**。

**这样就可以全量生效了**：视频中心页、首页视频条、各产品详情页的相关视频都会正常播放。

---

## 四、视频与系列的对应关系

编号是我按内容归的类，写在 [miniprogram/data/video.js](miniprogram/data/video.js)：

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
> 视频画面本身我没有看过，所以归类若与实际内容不符，告诉我调整。

---

## 五、压缩参数（需要重新生成时用）

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

## 六、说明

- 小程序包里**只有封面**（13 张，约 1 MB），不含视频本体 —— 视频走外部托管。
- `_video_out/` 已在 `.gitignore` 中忽略，不进 git 仓库。
  原始素材仍在 `D:\跨境电商\A贝歌\贝之然涂料视频`。
- 如果不想用外部服务器，也可以改用微信云开发的存储：把 mp4 传到云存储后
  把 `VIDEO_BASE` 换成云存储的 https 域名即可，省去域名备案问题。
  需要的话告诉我，我来接。
