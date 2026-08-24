---
id: page:configuration_furniture_variants
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/variants
aliases: 家具变体, configuration furniture variants, 📍 家具变体, 简介, 元素, 展示实体通用参数
---

# 📍 家具变体

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/variants
- 连接数：4

## 摘要

本页总览 # 📍 家具变体 ## 简介​ 家具至少要定义一个变体。变体决定了家具长什么样、占用多少空间。 信息变体名称可以随便起，插件本身不做限制。你常见的 [`ground`、`ceiling`、`wall`] 只是默认[🪑 家具物品](/zh-Hans/configuration/item/behaviors/furniture_item)行为的约定：它根据点击方块的面选变体——顶面 → `ground`，底面 → `ceiling`，侧面 → `wall`。你完全可以用其他名称。比如给电池家具定义 `charged`、`half_charged`、`empty` 三个变体，通过 API 在电量变化时切换。或者光传感器也可以在放置时根据当前时间选择是 `day` 或 `night` 变体。 注意默认的 `furniture_item` 只能使用 `ground`、`ceiling`、`wall` 三个名称。想用自定义变体名称，要么注册自己的物品行为，要么放置后用 [`set_furniture_variant`](/zh-Hans/reference/events#%E8%AE

## YAML 片段

```yaml
furniture:  default:standing_lamp:    variants:      ground:        # 掉落物偏移，防止掉落物生成在方块内部（默认: 0,0,0）        loot_spawn_offset: 0,0.5,0        # 家具元素——家具的外观        elements:
      - type: item_display
      item: default:standing_lamp        # 家具判定箱——家具占用多少空间以及如何与玩家交互        hitboxes:
      - type: interaction            width: 1            height: 2            blocks_building: true            interactive: true
```

## 相关页面

- requires → [🪑 家具](page_configuration_furniture.md)
- depends_on → [🪑 家具物品](page_configuration_item_behaviors_furniture_item.md)
- depends_on → [🪇 事件](page_reference_events.md)
