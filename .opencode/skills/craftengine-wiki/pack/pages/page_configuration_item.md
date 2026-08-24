---
id: page:configuration_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item
aliases: 物品, configuration item, 🗡️ 物品, 概述, 结构, 配置段
---

# 🗡️ 物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item
- 连接数：16

## 摘要

本页总览 # 🗡️ 物品 ## 概述​ 一个物品就是 `items:` 下的一个条目，用 `namespace:path` 作为唯一标识（比如 `default:topaz_sword`），由若干个彼此独立的配置段拼成。`material` 不写就用 config.yml 里的默认值，原版物品 ID 写了也无效——其他段按需添加即可。 ## 结构​ 每个物品都遵循同一套骨架。每个顶层键回答一个问题： `items: default:my_item: # 物品 ID，其他地方都用 default:my_item 引用 material: paper # 可选 → 基于哪个原版物品（默认值见 config.yml） data: # 可选 → 携带什么数据组件（名称、描述、附魔……） ... model: # 可选 → 长什么样 ... behavior: # 可选 → 交互后能干什么（放方块、放家具……） ... settings: # 可选 → 插件驱动的特性（燃料、标签、可修复、可附魔……） ... events: # 可选 → 对事件的响应 ...` 除了以上配置段，物品上还有几个

## YAML 片段

```yaml
items:  default:my_item:            # 物品 ID，其他地方都用 default:my_item 引用
      material: paper           # 可选  → 基于哪个原版物品（默认值见 config.yml）
    data:                     # 可选  → 携带什么数据组件（名称、描述、附魔……）      ...
    model:                    # 可选  → 长什么样      ...
    behavior:                 # 可选  → 交互后能干什么（放方块、放家具……）      ...
    settings:                 # 可选  → 插件驱动的特性（燃料、标签、可修复、可附魔……）      ...
    events:                   # 可选  → 对事件的响应      ...
```

```yaml
items:  default:ruby:
      material: paper
      texture: minecraft:item/custom/ruby
```

```yaml
items:  default:ruby_sword:
      material: golden_sword
      texture: minecraft:item/custom/ruby_sword
    data:      item_name: "<#FF8C00>Ruby Sword"      lore:
      - "Forged in the depths"
```

```yaml
items:  default:ruby_sword:
      material: golden_sword
      texture: minecraft:item/custom/ruby_sword
    data:      item_name: "<#FF8C00>Ruby Sword"
    behavior:
      type: block_item
      block: default:ruby_block
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [🟰 物品模型](page_configuration_item_models.md)
- depends_on → [🔢 物品数据](page_configuration_item_data.md)
- depends_on → [🕹️ 物品行为](page_configuration_item_behaviors.md)
- depends_on → [🔧 物品设置](page_configuration_item_settings.md)
- depends_on → [🪇 事件](page_reference_events.md)
- depends_on → [🔄 物品更新器](page_configuration_item_updater.md)
- depends_on → [📐 模型](page_configuration_item_models_model.md)
- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
- depends_on → [🪑 家具物品](page_configuration_item_behaviors_furniture_item.md)
