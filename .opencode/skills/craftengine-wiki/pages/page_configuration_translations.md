---
id: page:configuration_translations
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/translations
aliases: 翻译, configuration translations, 🌍 翻译, i18n 与 l10n — 服务端翻译, 配置, 使用
---

# 🌍 翻译

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/translations
- 连接数：2

## 摘要

本页总览 # 🌍 翻译 CraftEngine 有三套翻译系统，适用于不同场景。根据翻译发生的位置，它们分为两类： 系统标签翻译位置语言来源最佳场景i18n``服务端服务器配置后台日志l10n``服务端各玩家客户端语言消息、物品、GUI — 一切玩家看到的东西lang``客户端（资源包）玩家的 Minecraft 语言设置消息、物品、GUI — 一切玩家看到的东西 ## i18n 与 l10n — 服务端翻译​ i18n 和 l10n 共享同一套数据源 — `translations` 配置节点。唯一的区别在于查翻译时用哪个语言： - i18n 使用服务器的语言（由 `config.yml` 中的 `forced-locale` 决定，或跟随 JVM 默认语言） - l10n 使用每个玩家的客户端语言设置 ### 配置​ 翻译写在 `translations` 节点下： `translations: en: item.chinese_lantern: "Chinese Lantern" item.fairy_flower: "Fairy Flower" item.bench: "Be

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
