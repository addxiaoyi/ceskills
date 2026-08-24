---
id: page:configuration_recipe
type: Recipe
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/recipe
aliases: 配方, configuration recipe, 🍳 配方, 准备工作, 标签, 数据组件谓词
---

# 🍳 配方

- 类型：Recipe
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/recipe
- 连接数：3

## 摘要

本页总览 # 🍳 配方 ## 准备工作​ 在设置新配方之前，你需要了解以下内容。这些提示将使配置更轻松，并揭示额外有用的功能。 ### 标签​ CraftEngine 允许你使用标签，你也可以创建自定义标签。要使用标签，只需遵循以下格式：`#namespace:tag`。 提示大多数合成插件都有一个共同的痛点——它们不支持为物品分配标签，也不允许在配方中使用标签。例如，如果你想让新创建的木板类型与原版木板在合成配方中混合使用，那根本无法实现。 在下面的示例中，我为 `palm_planks` 添加了两个原版标签，允许它们参与数据包中包含这两个标签的所有配方。 `items: default:palm_planks: material: paper settings: fuel_time: 300 tags: - "minecraft:planks" - "minecraft:wooden_tool_materials" data: item_name: "棕榈木板"` #minecraft:planks #minecraft:wooden_tool_materials ### 数据组

## YAML 片段

```yaml
items:  default:palm_planks:
      material: paper
    settings:      fuel_time: 300
      tags:
      - "minecraft:planks"
      - "minecraft:wooden_tool_materials"
    data:      item_name: "棕榈木板"
```

```yaml
recipes:  default:sharpness_upgrade:
      type: shapeless_transform    ingredients:
      - items: minecraft:diamond_sword        source: true
      - items: minecraft:paper        predicate:
      - type: enchantment            enchantments:              minecraft:sharpness: 5    result:      id: default:topaz_sword      count: 1
```

```yaml
recipes:  default:palm_planks:
      type: shapeless    category: building    group: planks    ingredients:      A: "#default:palm_logs"    result:      id: default:palm_planks      count: 4
```

```yaml
items:   mythicmobs:kingscrown:
      material: golden_helmet
    data:      external:        plugin: MythicMobs        id: KingsCrown
    settings:
      tags:
      - add_tag:if_you_want # 添加标签，如果你想的话
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [📦️ 外部物品来源](page_compatibility_external_item_sources.md)
