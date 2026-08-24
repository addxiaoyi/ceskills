---
id: page:configuration_item_models_composite
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/composite
aliases: 组合, configuration item models composite, 🧩 组合, 概述, 字段
---

# 🧩 组合

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/composite
- 连接数：2

## 摘要

本页总览 # 🧩 组合 ## 概述​ 将多个子模型叠加在同一个空间中渲染。从后向前依次渲染 —— 靠前的条目出现在上层。 `items: demo:gem: material: diamond model: type: minecraft:composite models: - type: minecraft:model path: minecraft:item/custom/gem_glow # 上层 - type: minecraft:model path: minecraft:item/custom/gem_base # 底层` ## 字段​ 字段类型必需默认值说明`type`string是—`minecraft:composite``models`list是—从后向前依次渲染的物品模型映射`transformation`object否—物品模型变换，在子节点的变换之上进行（26.1+）

## YAML 片段

```yaml
items:  demo:gem:
      material: diamond
    model:
      type: minecraft:composite      models:
      - type: minecraft:model          path: minecraft:item/custom/gem_glow   # 上层
      - type: minecraft:model          path: minecraft:item/custom/gem_base   # 底层
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
