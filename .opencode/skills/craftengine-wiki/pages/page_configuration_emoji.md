---
id: page:configuration_emoji
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/emoji
aliases: 表情, configuration emoji, 😀 表情, 快速入门, 表情配置, 内容格式
---

# 😀 表情

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/emoji
- 连接数：3

## 摘要

本页总览 # 😀 表情 警告表情依赖于图像配置，请先阅读 [🖼️ 图像](/zh-Hans/configuration/image) 页面。 ## 快速入门​ 表情就是一个关键词，玩家输入后会被替换成"图片 + 文本"。最简配置只需两步： 第一步 — 创建底层图像（精灵图最合适）： `images: default:emojis: height: 11 ascent: 9 font: minecraft:default file: minecraft:font/image/emojis.png grid_size: 4,4` 第二步 — 定义一个指向精灵图某个格子的表情： `emoji: default:smiley: image: default:emojis:0:0 content: "" keywords: - ':smiley:' - ':)'` 现在玩家在聊天中输入 `:)`，它就会被替换成表情图片加上你定义的内容。 接下来的内容逐一展开：怎么自定义内容、怎么按场景切换显示、怎么用模板批量管理、以及兼容性注意事项。 ## 表情配置​ 表情配置写在任意包的 `emoji:`

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [🖼️ 图像](page_configuration_image.md)
