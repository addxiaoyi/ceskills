---
id: page:getting_start_set_up_host_s3
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/set_up_host/s3
aliases: 简单存储服务, getting start set up host s3, 简单存储服务
---

# 简单存储服务

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/set_up_host/s3
- 连接数：1

## 摘要

# 简单存储服务 高级用户 付费 S3 (简单存储服务) 是云服务提供商提供的一种高可扩展性、持久且高可用的对象存储服务。为了防止被盗刷流量，CraftEngine 会为每次下载签发唯一且会过期的令牌，从而有效阻止直接的滥用行为。 `resource-pack: delivery: hosting: - type: s3 endpoint: "" # 端点，不能包含 https:// 或者 http:// 开头 bucket: "" # 桶名称 access_key_id: "" access_key_secret: "" # 可选选项 use_environment_variables: false # 是否使用环境变量提供机密信息，默认为 false protocol: "https" # 端点访问协议支持 https 和 http，默认为 https path_style: false # 选择端点访问风格，启用使用 Path 风格，不启用使用 Virtual Hosted 风格，默认为 false region: "auto" # 若 auto 无法使用才需要填写对应的区域，默

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
