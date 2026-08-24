---
id: page:configuration_item_models_empty
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/empty
aliases: 空模型, configuration item models empty, ∅ 空模型, 概述
---

# ∅ 空模型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/empty
- 连接数：2

## 摘要

本页总览 # ∅ 空模型 ## 概述​ 不渲染任何物品模型。适合作为回落映射，当不需要显示物品模型时使用。 `items: demo:hidden_item: material: paper model: type: minecraft:empty` `transformation` 不支持于 `empty`。

## YAML 片段

```yaml
items:  demo:hidden_item:
      material: paper
    model:
      type: minecraft:empty
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
