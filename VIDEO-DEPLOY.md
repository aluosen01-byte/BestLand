# 视频部署说明（贝之然小程序）

## ✅ 已完成部署（2026-09-23）

13 支视频已上传并验证通过，**现在可以正常播放，无需再做任何服务器操作。**

| 验证项 | 结果 |
|---|---|
| `https://senluoflow.com/video/bzr-01.mp4` ~ `bzr-13.mp4` | **13/13 返回 `200`** |
| Content-Type | `video/mp4` ✅ |
| 文件大小与本地压缩产物对账 | **13/13 逐字节一致** ✅ |
| 拖动进度条（Range 请求） | 返回 `206` ✅，`Accept-Ranges: bytes` |
| 缓存头 | `Cache-Control: public, max-age=86400` ✅ |
| 文件权限 | `-rw-r--r-- root:root`，nginx 可读 ✅ |
| 微信 downloadFile 合法域名 | 已配置 `senluoflow.com` ✅ |

**你只需要在微信开发者工具里重新编译小程序**，视频就会出现在：
视频中心页、首页视频条、各产品详情页的「相关视频」。

---

## 一、服务器实际配置（已确认，不用改）

nginx 配置本身是**正确**的，不需要修改：

```nginx
# 宣传视频静态托管：nginx 直接读盘返回，不经 Flask，无需登录
location ^~ /video/ {
    alias /opt/video/;
    autoindex off;
    add_header Cache-Control "public, max-age=86400";
}
```

- `alias /opt/video/` 正确（不是 `root`，避开了多拼一层目录的坑）
- `^~` 前缀匹配优先级高于 `location /` 的登录代理，所以视频**不需要登录**
- Range 请求 nginx 默认支持，进度条可正常拖动

---

## 二、踩过的坑：文件名里的 `·` 是 U+00B7

这是本次部署最花时间的一个问题，记录下来避免以后再踩。

服务器上原来的 13 个文件是**原始中文名**：

```
No.01 贝之然纯无机涂料 · 把森林搬进家.mp4
        ↑ 这里的 · 不是 ·(U+00B7) 就是中点
```

小程序请求的是 `bzr-01.mp4` 这类**纯 ASCII 名**（我在压缩时就改好了），
所以当时全部 404。

我尝试在服务器上批量改名，结果 `mv` 一直报
`mv: target 'bzr-01.mp4': No such file or directory`。`set -x` 跟踪发现：

```
+ f=No.01
+ 贝之然纯无机涂料 · 把森林搬进家.mp4
bash: 贝之然纯无机涂料: command not found
```

**文件名在 `·` 处被拆成了两个词** —— 即使用了双引号也没用。

原因：文件里的那个点 UTF-8 字节是 `c2 b7`，也就是 **U+00B7（CENTER DOT）**。
在 `LANG=en_US.UTF-8` 下，glibc 的 `iswspace()` 认为 U+00B7 是空白字符，
于是 bash **在引号内部也做了词分割**。

（顺带一提：`printf '%s' "$IFS"` 只输出 `0a`，是因为 bash 对默认 IFS 做了特殊处理，
并不代表 U+00B7 不是分隔符。）

### 最终采用的解法

不做服务器端改名，直接用 `pscp` 把压缩好的文件**按目标名上传覆盖**：

```bash
pscp -batch -hostkey SHA256:wG1ZMqmDhmYS1pKwqMphjwUC+ulsqX91no6BM9GMROg \
     -pw <密码> _video_out/*.mp4 root@47.107.190.235:/opt/video/
```

13 个文件约 24.7 MB，几秒完成。原来的中文名文件被同名覆盖的逻辑自然绕开了。

> ⚠️ **以后新增或替换视频，一律用 ASCII 文件名**（`bzr-14.mp4` 这样），
> 不要用带 `·`、空格或中文的名字，否则脚本处理会踩同样的坑。

---

## 三、视频与系列的对应关系

写在 [miniprogram/data/video.js](miniprogram/data/video.js)：

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
> 视频画面本身我没有看过。归类若与实际内容不符，改 `data/video.js` 即可。

---

## 四、服务器上的磁盘占用（建议清理）

```
/opt/video        1.8 GB   ← 13 个 bzr-*.mp4（压缩版，约 24.7MB）
                              + 13 个原始中文名 mp4（4K 原片，约 1.75GB）
/opt/video_orig   1.8 GB   ← 13 个 4K 原片的另一份拷贝
```

原片（4K，单支 126–270 MB）**对小程序没用**，而且能匿名下载 —— 用户拖动进度
也不会用到它们。可以清掉释放约 3.5 GB：

```bash
# 先确认压缩版都在
ls -la /opt/video/bzr-*.mp4 | wc -l      # 应该是 13

# 删掉 /opt/video 下的原始中文名文件（保留 bzr-*.mp4）
cd /opt/video && find . -maxdepth 1 -name 'No.*.mp4' -delete

# 备份目录如果确认不需要也删掉
rm -rf /opt/video_orig
```

> 我没有自动删除 —— 涉及原片，留给你确认。
> 另外 `/dev/vda3` 现在用了 7.3G / 40G，空间还宽裕，不急。

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
| 单支 | 126–270 MB | 1.5–2.9 MB |
| 合计 | 1750 MB | **24.7 MB**（缩小 71 倍） |

封面（`miniprogram/images/video/bzr-NN.jpg`）是从每支视频**第 2 秒**抽帧生成的：
避开片头黑场，尺寸 540×960，单张 61–104 KB。

---

## 六、说明

- 小程序包里**只有封面**（13 张，约 1 MB），视频本体走外部托管。
- `_video_out/` 已在 `.gitignore` 中忽略，不进 git 仓库。
  原始素材仍在 `D:\跨境电商\A贝歌\贝之然涂料视频`。
- 备用方案：如果之后不想依赖这台服务器，可以改用微信云开发的云存储，
  把 mp4 传到云存储后把 `VIDEO_BASE` 换成云存储 https 域名即可。
