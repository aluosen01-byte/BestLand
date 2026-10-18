#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
贝之然小程序 —— 在线留言接收服务

用途：小程序「咨询与留言」提交后，通过 wx.request POST 到这里，
      留言落盘保存，彻底闭合「客户提交 → 企业收到」的流程。
      之前只存手机本机、并提示用户打电话，会被审核判为「强制引流」。

部署：
  /opt/mp-inquiry/server.py      本文件
  /opt/mp-inquiry/inquiries.jsonl 留言（每行一条 JSON，追加写）
  /opt/mp-inquiry/notify.json   可选，配置 webhook 通知（企业微信/钉钉/Server酱等）
  systemd 单元 mp-inquiry.service，监听 127.0.0.1:5099
  nginx: location = /mp/inquiry → proxy_pass http://127.0.0.1:5099/inquiry

安全措施：
  · 只监听回环地址，公网必须经 nginx
  · 请求体限 4KB，只接受 JSON 对象
  · 每 IP 每分钟最多 6 次
  · 只保存白名单字段，且各自限长
  · 不提供任何读取接口（留言含手机号，绝不能公开）
  · 日志文件超过 5MB 自动轮转
"""

import json
import os
import re
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

STORE_DIR = '/opt/mp-inquiry'
JSONL = os.path.join(STORE_DIR, 'inquiries.jsonl')
NOTIFY_CONF = os.path.join(STORE_DIR, 'notify.json')

MAX_BODY = 4096
RATE_LIMIT = 6          # 每 IP 每分钟最多次数
RATE_WINDOW = 60
ROTATE_BYTES = 5 * 1024 * 1024

PHONE_RE = re.compile(r'^1[3-9]\d{9}$')

# 只保存这些字段，并限长
FIELDS = [
    ('id', 64),
    ('name', 40),
    ('phone', 20),
    ('company', 80),
    ('city', 40),
    ('type', 20),
    ('interest', 60),
    ('message', 2000),
]
REQUIRED = ('name', 'phone')

_rate = {}
_rate_lock = threading.Lock()
_write_lock = threading.Lock()


def allowed(ip):
    now = time.time()
    with _rate_lock:
        arr = [t for t in _rate.get(ip, []) if now - t < RATE_WINDOW]
        if len(arr) >= RATE_LIMIT:
            _rate[ip] = arr
            return False
        arr.append(now)
        _rate[ip] = arr
        return True


def rotate_if_needed():
    try:
        if os.path.exists(JSONL) and os.path.getsize(JSONL) > ROTATE_BYTES:
            os.replace(JSONL, JSONL + '.' + time.strftime('%Y%m%d%H%M%S'))
    except OSError:
        pass


def notify(rec):
    """可选通知：notify.json 里配了 webhook 才发，失败不影响留言保存。"""
    try:
        if not os.path.exists(NOTIFY_CONF):
            return
        with open(NOTIFY_CONF, encoding='utf-8') as f:
            conf = json.load(f)
        url = (conf or {}).get('webhook') or ''
        if not url.startswith('https://'):
            return
        text = (
            '【贝之然小程序 · 新留言】\n'
            '称呼：%s\n手机：%s\n'
            '公司：%s\n城市：%s\n'
            '类型：%s\n意向：%s\n内容：%s'
        ) % (
            rec.get('name', ''), rec.get('phone', ''),
            rec.get('company') or '—', rec.get('city') or '—',
            rec.get('type') or '—', rec.get('interest') or '—',
            (rec.get('message') or '—')[:300],
        )
        # 兼容企业微信 / 钉钉 / Server酱 三种常见格式
        if 'qyapi.weixin.qq.com' in url or 'oapi.dingtalk.com' in url:
            payload = {'msgtype': 'text', 'text': {'content': text}}
        elif 'sctapi.ftqq.com' in url or 'pushplus' in url:
            payload = {'title': '贝之然小程序新留言', 'desp': text, 'content': text}
        else:
            payload = {'text': text, 'content': text, 'title': '新留言'}
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(
            url, data=body,
            headers={'Content-Type': 'application/json; charset=utf-8'},
            method='POST',
        )
        urllib.request.urlopen(req, timeout=5).read()
    except Exception as e:  # 通知失败绝不影响主流程
        print('[notify] failed: %r' % (e,), flush=True)


def save(rec):
    with _write_lock:
        os.makedirs(STORE_DIR, exist_ok=True)
        rotate_if_needed()
        line = json.dumps(rec, ensure_ascii=False) + '\n'
        with open(JSONL, 'a', encoding='utf-8') as f:
            f.write(line)
            f.flush()
            os.fsync(f.fileno())


class Handler(BaseHTTPRequestHandler):
    server_version = 'MPInquiry/1.0'
    sys_version = ''

    def log_message(self, fmt, *args):
        # 用 systemd journal 记录一行简洁日志
        print('%s %s' % (self.client_address[0], fmt % args), flush=True)

    def _send(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split('?')[0] == '/health':
            self._send(200, {'ok': True, 'service': 'mp-inquiry'})
        else:
            self._send(405, {'ok': False, 'error': 'method not allowed'})

    def do_POST(self):
        if self.path.split('?')[0] != '/inquiry':
            self._send(404, {'ok': False, 'error': 'not found'})
            return

        xff = (self.headers.get('X-Forwarded-For') or '').split(',')[0].strip()
        ip = xff or self.headers.get('X-Real-IP') or self.client_address[0]

        if not allowed(ip):
            self._send(429, {'ok': False, 'error': 'too many requests'})
            return

        try:
            length = int(self.headers.get('Content-Length') or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY:
            self._send(400, {'ok': False, 'error': 'bad body size'})
            return

        raw = self.rfile.read(length)
        try:
            data = json.loads(raw.decode('utf-8'))
        except Exception:
            self._send(400, {'ok': False, 'error': 'invalid json'})
            return
        if not isinstance(data, dict):
            self._send(400, {'ok': False, 'error': 'invalid json'})
            return

        name = str(data.get('name') or '').strip()
        phone = str(data.get('phone') or '').strip()
        if not name:
            self._send(400, {'ok': False, 'error': 'name required'})
            return
        if not PHONE_RE.match(phone):
            self._send(400, {'ok': False, 'error': 'invalid phone'})
            return

        rec = {'receivedAt': int(time.time()), 'ip': ip}
        for key, limit in FIELDS:
            v = data.get(key)
            if v is None:
                continue
            rec[key] = str(v)[:limit]

        try:
            save(rec)
        except Exception as e:
            print('[save] failed: %r' % (e,), flush=True)
            self._send(500, {'ok': False, 'error': 'storage error'})
            return

        threading.Thread(target=notify, args=(rec,), daemon=True).start()
        print('[saved] %s %s' % (rec.get('name'), rec.get('phone')), flush=True)
        self._send(200, {'ok': True})


def main():
    os.makedirs(STORE_DIR, exist_ok=True)
    srv = ThreadingHTTPServer(('127.0.0.1', 5099), Handler)
    srv.daemon_threads = True
    print('mp-inquiry listening on 127.0.0.1:5099 -> %s' % JSONL, flush=True)
    srv.serve_forever()


if __name__ == '__main__':
    main()
