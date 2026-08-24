---
id: page:configuration_item_models_special
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/special
aliases: 特殊模型, configuration item models special, 👻 特殊模型, 概述, 字段, 特殊模型类型
---

# 👻 特殊模型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/special
- 连接数：3

## 摘要

本页总览 # 👻 特殊模型 ## 概述​ 调用游戏的特殊模型渲染物品堆叠。物品堆叠渲染时的渲染变换、粒子纹理变量等可以从 `base` 指定的基础物品模型中获取。 `items: demo:head: material: player_head model: type: minecraft:special base: minecraft:item/custom/head_base model: type: minecraft:head kind: skeleton texture: minecraft:custom/heads/wizard animation: 0.0` ## 字段​ 字段类型必需默认值说明`type`string是—`minecraft:special``base`资源路径是*—用于变换、粒子纹理和 GUI 光照的模型路径。*设置 `blueprint` 时可选——此时作为生成模型的输出路径`blueprint`string否—转换为基础模型 JSON 的 Blockbench `.bbmodel` 文件 实验性（见 [Blueprint](/zh-Hans/co

## YAML 片段

```yaml
items:  demo:head:
      material: player_head
    model:
      type: minecraft:special      base: minecraft:item/custom/head_base
    model:
      type: minecraft:head        kind: skeleton
      texture: minecraft:custom/heads/wizard        animation: 0.0
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
- depends_on → [📐 模型](page_configuration_item_models_model.md)
