贝之然小程序 · 在线留言接收服务
================================

服务地址（仅本机）
  127.0.0.1:5099

对外接口（经 nginx）
  POST https://senluoflow.com/mp/inquiry
  GET  https://senluoflow.com/mp/inquiry  -> 405（不提供读取）

留言保存在
  /opt/mp-inquiry/inquiries.jsonl    每行一条 JSON，追加写
  超过 5MB 自动轮转为 inquiries.jsonl.<时间戳>

查看留言（在服务器上执行）
  # 最近 10 条
  tail -n 10 /opt/mp-inquiry/inquiries.jsonl

  # 格式化查看（需 jq，未装可 apt install jq）
  tail -n 20 /opt/mp-inquiry/inquiries.jsonl | jq -r '"\(.receivedAt|todate)  \(.name)  \(.phone)  \(.company // "-")  \(.interest // "-")"'

  # 导出成 CSV（方便用 Excel 打开）
  jq -r '[.receivedAt|todate, .name, .phone, .company//"", .city//"", .type//"", .interest//"", (.message//""|gsub("\n";" "))] | @csv' \
    /opt/mp-inquiry/inquiries.jsonl > /tmp/inquiries.csv

常用运维
  systemctl status mp-inquiry     查看状态
  systemctl restart mp-inquiry    重启
  journalctl -u mp-inquiry -n 50  看日志

可选：新留言自动通知
  在 /opt/mp-inquiry/notify.json 写入（JSON）：
    { "webhook": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx" }
  支持企业微信机器人 / 钉钉机器人 / Server酱 / PushPlus。
  文件不存在则不通知；通知失败不影响留言保存。
  改完不需要重启，下一次留言即生效。

注意
  · 本服务不提供任何读取接口 —— 留言含手机号，绝不能公开访问
  · 只监听 127.0.0.1，公网必须经 nginx 的 /mp/inquiry
