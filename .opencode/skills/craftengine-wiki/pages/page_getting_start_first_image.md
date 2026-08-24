---
id: page:getting_start_first_image
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_image
aliases: 第一张图片, getting start first image, 🖼️ 第一张图片, 原理, 第 1 步：放 PNG, 第 2 步：定义图片
---

# 🖼️ 第一张图片

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_image
- 连接数：1

## 摘要

本页总览 # 🖼️ 第一张图片 把 PNG 图标嵌进物品名、聊天、GUI——用 `` 标签就能引用。 ## 原理​ CraftEngine 把 PNG 注册成某个字体里的字符，你用 `` 标签把它"打"出来。玩家看到的是图标，游戏以为它是文字。 ## 第 1 步：放 PNG​ [⬇ 下载星星图标](/zh-Hans/assets/files/star-fbe7162d8982dc4cf940424b83a696ea.png)，放到 `textures/font/` 下。和模型贴图不同，字体图片不限尺寸、不需要 2 的幂： `resourcepack/assets/tutorial/textures/font/star.png` resourcepack/assets/tutorialtextures ⚠️ 不要把字体图片放进 `textures/item/` 或 `textures/block/`。 那些目录受贴图图集管理，会被纳入图集导致意外的 mipmap 降级。 ## 第 2 步：定义图片​ 在 `configuration/` 下新建 `images.yml`： `image

## YAML 片段

```yaml
items:  tutorial:star_sword:
      material: diamond_sword
    data:      item_name: " 星之剑"
```

## 相关页面

- （无）
