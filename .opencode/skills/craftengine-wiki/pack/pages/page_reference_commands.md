---
id: page:reference_commands
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/commands
aliases: 命令, reference commands, 🐚 命令, 基础命令, reload, upload
---

# 🐚 命令

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/commands
- 连接数：5

## 摘要

本页总览 # 🐚 命令 CraftEngine 的大部分命令以 `/craftengine`（缩写 `/ce`）开头，少数为独立的玩家命令（如 `/search-recipe`、`/search-usage`）。每条命令的启用状态、权限节点与命令路径都记录在 `plugins/CraftEngine/commands.yml` 中，可在其中自由修改（修改后需重启生效）。多数命令支持 `--silent`（简写 `-s`）标志以静默执行、不回显消息。 下文中 `[ ]` 表示必填参数，`( )` 表示可选参数。 ## 基础命令​ ### reload​ `/ce reload [all/recipe/config/pack]` 重载插件资源。不带参数时默认为 `config`。`config`/`recipe` 重载配置与配方，`pack` 重新生成资源包，`all` 同时执行两者。 ### upload​ `/ce upload` 手动将资源包上传至已配置的托管主机。 ### clean-cache​ `/ce clean-cache [类型]` 清理自动分配的缓存数据。可用类型：`

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [📒 参考](page_reference.md)
