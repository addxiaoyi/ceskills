---
id: page:configuration_item_models_range_dispatch
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/range_dispatch
aliases: 值调配型, configuration item models range dispatch, 📡 值调配型, 概述, 字段, 属性
---

# 📡 值调配型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/range_dispatch
- 连接数：1

## 摘要

本页总览 # 📡 值调配型 ## 概述​ 先计算物品堆叠内给定的一个数值属性，游戏会按照给定阈值从小到大排序，找到数值属性第一个超过或等于的阈值，并使用对应物品模型映射。如果数值属性小于所有阈值，则使用回落物品模型映射。如果此项不存在，则使用无效模型。 `items: demo:shield: material: shield model: type: minecraft:range_dispatch property: minecraft:damage scale: 1.0 entries: - threshold: 0.0 model: type: minecraft:model path: minecraft:item/custom/shield_full - threshold: 0.5 model: type: minecraft:model path: minecraft:item/custom/shield_cracked fallback: type: minecraft:model path: minecraft:item/custom/shield_full` #

## YAML 片段

```yaml
items:  demo:shield:
      material: shield
    model:
      type: minecraft:range_dispatch      property: minecraft:damage      scale: 1.0      entries:
      - threshold: 0.0
    model:
      type: minecraft:model            path: minecraft:item/custom/shield_full
      - threshold: 0.5
    model:
      type: minecraft:model            path: minecraft:item/custom/shield_cracked      fallback:
      type: minecraft:model        path: minecraft:item/custom/shield_full
```

## 相关页面

- （无）
