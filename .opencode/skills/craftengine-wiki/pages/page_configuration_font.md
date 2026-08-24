---
id: page:configuration_font
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/font
aliases: 字体, configuration font, ㊙️ 字体, TTF, 位图, Unihex
---

# ㊙️ 字体

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/font
- 连接数：2

## 摘要

本页总览 # ㊙️ 字体 信息这个过程极其简单，无需插件端配置。只需按照下面的教程操作即可。 ## TTF​ [TrueType矢量字体https://zh.minecraft.wiki/w/自定义字体#ttf](https://zh.minecraft.wiki/w/自定义字体#ttf) 对于 TTF 字体，你需要在以下路径中创建一个 `default.json` 文件。如果你已经有一个 `default.json` 文件，只需将你的字体 JSON 追加到现有 JSON 文件的末尾即可。 `{ "providers": [ { "type": "ttf", "file": "minecraft:custom_font.ttf", "oversample": 10, "size": 11 } ]}` ## 位图​ [位图字体https://zh.minecraft.wiki/w/自定义字体#bitmap](https://zh.minecraft.wiki/w/自定义字体#bitmap) 如果你希望替换原版字符图片，只需将以下 PNG 文件放置在指定路径中，如下所示。 ## Unihe

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
