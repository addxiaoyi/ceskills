---
id: page:configuration_item_models_bundle_selected_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/bundle_selected_item
aliases: 收纳袋选中物品, configuration item models bundle selected item, 📦 收纳袋选中物品, 概述
---

# 📦 收纳袋选中物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/bundle_selected_item
- 连接数：1

## 摘要

本页总览 # 📦 收纳袋选中物品 ## 概述​ 渲染当前收纳袋内被选中的物品堆叠。要求物品堆叠必须具有 `bundle_contents` 组件，否则不渲染任何东西。 [Minecraft Wiki | 收纳袋选中物品https://zh.minecraft.wiki/w/物品模型映射#bundle_selected_item](https://zh.minecraft.wiki/w/物品模型映射#bundle_selected_item) `items: demo:bundle: material: bundle model: type: minecraft:bundle/selected_item` `transformation` 不支持。

## YAML 片段

```yaml
items:  demo:bundle:
      material: bundle
    model:
      type: minecraft:bundle/selected_item
```

## 相关页面

- （无）
