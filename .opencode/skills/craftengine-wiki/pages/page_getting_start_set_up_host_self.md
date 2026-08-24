---
id: page:getting_start_set_up_host_self
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/set_up_host/self
aliases: 自托管, getting start set up host self, 🛜 自托管, 配置, 字段参考, 内外地址不一致时
---

# 🛜 自托管

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/set_up_host/self
- 连接数：1

## 摘要

本页总览 # 🛜 自托管 自托管在 Minecraft 服务器内启动轻量 HTTP 服务器直接分发资源包。免费、无需外部服务，适合小服和开发环境。带宽不足时不推荐大量玩家使用。 ## 配置​ YAML复制`resource-pack: delivery: hosting: - type: "self"- ip: "localhost"+ ip: "服务器IP" # 例如 111.222.333.444，或 "auto" port: 8163 protocol: "http" # 拒绝非 Minecraft 客户端请求（检查 User-Agent 头） deny_non_minecraft_request: true # 生成一次性限时下载链接 one_time_token: true # 增强 token 和 Minecraft 客户端验证 # 离线模式服务器切勿启用 strict_validation: false rate_limiting: max_bandwidth_per_second: 5_000_000 # 总上传上限 5 MB/s min_download_speed

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
