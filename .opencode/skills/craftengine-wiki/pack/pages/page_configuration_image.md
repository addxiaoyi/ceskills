---
id: page:configuration_image
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/image
aliases: 图像, configuration image, 🖼️ 图像, 快速入门, 图像配置, 基本字段
---

# 🖼️ 图像

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/image
- 连接数：5

## 摘要

本页总览 # 🖼️ 图像 ## 快速入门​ 图像系统的本质就是把 PNG 图片变成字符，让你可以在任意文本中使用它们。下面是最短的上手路径——从零到在游戏里看到效果： 第一步 — 在任意包的 `configuration/` 目录下创建图像配置： `images: my_pack:star: height: 10 ascent: 9 font: my_pack:ui file: my_pack:font/ui/star.png` 第二步 — 在物品名称中使用它： `items: my_pack:star_sword: material: diamond_sword data: item_name: " 星剑"` 就这么简单。`` 标签会把你图像对应的字符插入到文本中，该字符绑定了你指定的字体，Minecraft 渲染时就会显示为你的图片。 接下来的内容逐一拆解：怎么配置图像、怎么在不同场景中使用、以及怎么把多个图像组合成复杂的 UI。 ## 图像配置​ ### 基本字段​ 图像配置写在任意包的 `images:` 节点下，每个图像以 `命名空间:id` 作为唯一标识。 `images

## YAML 片段

```yaml
items:  my_pack:star_sword:
      material: diamond_sword
    data:      item_name: " 星剑"
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [🅿️ 占位符](page_compatibility_placeholderapi.md)
