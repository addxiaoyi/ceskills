---
id: page:compatibility_skript
type: Compat
url: https://ce-pre.gtemc.cn/zh-Hans/compatibility/skript
aliases: Skript, compatibility skript, ⌨️ Skript, 类型, 事件, 放置或破坏 CraftEngine 方块事件
---

# ⌨️ Skript

- 类型：Compat
- 原文：https://ce-pre.gtemc.cn/zh-Hans/compatibility/skript
- 连接数：1

## 摘要

本页总览 # ⌨️ Skript 提示对于高级 Skript 用户，请使用反射来实现更高级的功能。如果您在使用 CraftEngine 提供的 Skript 功能时遇到问题，请及时向我们[反馈](https://github.com/Xiao-MoMi/craft-engine/issues/new)。如果您想要请求新的 Skript 功能并且您了解 Java，请考虑通过拉取请求贡献您的代码！ 注意你需要安装 [Skript](https://modrinth.com/plugin/skript) 2.15.0 或更高版本。 ## 类型​ CraftEngine 额外注册了两种可存入变量的类型。可通过 `parsed as` 从字符串解析： `# 完整的不可变方块状态（ID + 属性）set {_state} to "default:table_lamp[lit=true,facing=east]" parsed as custom block state# 方块状态匹配器，主要用于事件过滤器set {_matcher} to "default:table_lamp[lit=true]

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🤝 兼容性](page_compatibility.md)
