---
id: page:configuration_item_models
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models
aliases: 物品模型, configuration item models, 🟰 物品模型, 概述, 根字段, 模型类型
---

# 🟰 物品模型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models
- 连接数：19

## 摘要

本页总览 # 🟰 物品模型 ## 概述​ 自 1.21.4 起，Minecraft 使用物品模型映射控制物品渲染哪个模型。CraftEngine 将其封装为 YAML —— `model` 字段决定了物品的一切外观。模型是一棵树：每个节点有一个 `type`，分支类型（`condition`、`select`、`range_dispatch`、`composite`）可嵌套子模型。 [Minecraft Wiki | 物品模型映射https://zh.minecraft.wiki/w/物品模型映射](https://zh.minecraft.wiki/w/物品模型映射) ## 根字段​ 以下字段写在物品层级 —— 与 `material`、`model`、`data` 同级。它们映射到生成的物品模型映射 JSON 根级。 字段类型默认值说明`hand_animation_on_swap`bool`true`切换手持物品时是否播放第一人称交换动画`oversized_in_gui`bool`true`若为 `true`，取消 GUI 槽位裁剪——模型可渲染得比槽位更大`swap_ani

## YAML 片段

```yaml
items:  demo:sword:
      material: diamond_sword    hand_animation_on_swap: false   # 无交换动画    oversized_in_gui: true          # 允许超出 GUI 格子边界    swap_animation_scale: 1.5       # 交换动画速度 ×1.5
    model:
      type: minecraft:model      path: minecraft:item/custom/sword
```

```yaml
items:  demo:sword:
      material: diamond_sword
    model: minecraft:item/custom/sword
```

```yaml
items:  demo:sword:
      material: diamond_sword    custom_model_data: 10001     # 强制指定编号    item_model: demo:sword       # 强制指定路径
    model:
      type: minecraft:model      path: minecraft:item/custom/sword
```

```yaml
  demo:rod:
      material: fishing_rod  textures:
      - minecraft:item/custom/rod
      - minecraft:item/custom/rod_cast
```

## 相关页面

- requires → [🗡️ 物品](page_configuration_item.md)
- depends_on → [📐 模型](page_configuration_item_models_model.md)
- depends_on → [🧩 组合](page_configuration_item_models_composite.md)
- depends_on → [⚖️ 布尔条件型](page_configuration_item_models_condition.md)
- depends_on → [✅ 枚举条件型](page_configuration_item_models_select.md)
- depends_on → [📡 值调配型](page_configuration_item_models_range_dispatch.md)
- depends_on → [👻 特殊模型](page_configuration_item_models_special.md)
- depends_on → [∅ 空模型](page_configuration_item_models_empty.md)
- depends_on → [📦 收纳袋选中物品](page_configuration_item_models_bundle_selected_item.md)
