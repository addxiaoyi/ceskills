---
id: page:configuration_item_behaviors
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors
aliases: 物品行为, configuration item behaviors, 🕹️ 物品行为, 分配行为, 组合行为
---

# 🕹️ 物品行为

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors
- 连接数：2

## 摘要

本页总览 # 🕹️ 物品行为 物品行为定义了玩家与物品交互时发生的事情——放置方块、放置家具、范围挖掘或堆肥。没有行为，自定义物品只具有其原版材质的交互逻辑，没有特殊行为。 ## 分配行为​ 在物品配置的 `behavior` 或 `behaviors` 字段下挂载： `items: default:palm_sapling: behavior: type: block_item block: default:palm_sapling` ## 组合行为​ 在 `behaviors` 下列出多项来组合。例如，一个既能范围挖掘又能放置方块的物品： `items: default:topaz_pickaxe: material: golden_pickaxe behaviors: - type: range_mining_item conditions: [] range: - 0,1,0 - 0,-1,0 - type: block_item block: default:topaz_ore`

## YAML 片段

```yaml
items:  default:palm_sapling:
    behavior:
      type: block_item
      block: default:palm_sapling
```

```yaml
items:  default:topaz_pickaxe:
      material: golden_pickaxe
    behaviors:
      - type: range_mining_item        conditions: []        range:
      - 0,1,0
      - 0,-1,0
      - type: block_item
      block: default:topaz_ore
```

## 相关页面

- requires → [🗡️ 物品](page_configuration_item.md)
