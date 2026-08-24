---
id: page:configuration_item_models_select
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/select
aliases: 枚举条件型, configuration item models select, ✅ 枚举条件型, 概述, 字段, 属性
---

# ✅ 枚举条件型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/select
- 连接数：2

## 摘要

本页总览 # ✅ 枚举条件型 ## 概述​ 先计算物品堆叠内给定的一个枚举属性，游戏会使用枚举属性值对应的物品模型映射。如果没有匹配的枚举值，则使用回落物品模型映射。如果此项不存在，则使用无效模型。 `items: demo:crossbow: material: crossbow model: type: minecraft:select property: minecraft:charge_type cases: - when: arrow model: type: minecraft:model path: minecraft:item/custom/crossbow_arrow - when: rocket model: type: minecraft:model path: minecraft:item/custom/crossbow_firework fallback: type: minecraft:model path: minecraft:item/custom/crossbow_standby` ## 字段​ 字段类型必需默认值说明`type`string是—`mi

## YAML 片段

```yaml
items:  demo:crossbow:
      material: crossbow
    model:
      type: minecraft:select      property: minecraft:charge_type      cases:
      - when: arrow
    model:
      type: minecraft:model            path: minecraft:item/custom/crossbow_arrow
      - when: rocket
    model:
      type: minecraft:model            path: minecraft:item/custom/crossbow_firework      fallback:
      type: minecraft:model        path: minecraft:item/custom/crossbow_standby
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
