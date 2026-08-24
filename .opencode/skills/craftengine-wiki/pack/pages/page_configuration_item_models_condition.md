---
id: page:configuration_item_models_condition
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/condition
aliases: 布尔条件型, configuration item models condition, ⚖️ 布尔条件型, 概述, 字段, 谓词
---

# ⚖️ 布尔条件型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/condition
- 连接数：2

## 摘要

本页总览 # ⚖️ 布尔条件型 ## 概述​ 先计算物品堆叠内给定的谓词，当谓词为真时选择一个物品模型映射，为假时选择另一个。 `items: demo:bow: material: bow model: type: minecraft:condition property: minecraft:using_item on_true: type: minecraft:model path: minecraft:item/custom/bow_pull on_false: type: minecraft:model path: minecraft:item/custom/bow` ## 字段​ 字段类型必需默认值说明`type`string是—`minecraft:condition``property`string是—布尔谓词类型（见下方）`on_true`model是—谓词为真时使用的模型`on_false`model是—谓词为假时使用的模型`transformation`object否—物品模型变换（26.1+） ## 谓词​ [Minecraft Wiki | 条件谓词https

## YAML 片段

```yaml
items:  demo:bow:
      material: bow
    model:
      type: minecraft:condition      property: minecraft:using_item      on_true:
      type: minecraft:model        path: minecraft:item/custom/bow_pull      on_false:
      type: minecraft:model        path: minecraft:item/custom/bow
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
