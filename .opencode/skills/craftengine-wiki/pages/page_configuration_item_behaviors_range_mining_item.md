---
id: page:configuration_item_behaviors_range_mining_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/range_mining_item
aliases: 范围挖掘物品, configuration item behaviors range mining item, ⛏️ 范围挖掘物品
---

# ⛏️ 范围挖掘物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/range_mining_item
- 连接数：0

## 摘要

# ⛏️ 范围挖掘物品 在破坏方块时同时挖掘可配置区域内的多个方块。范围会根据朝向自动旋转。 `items: default:topaz_pickaxe: material: golden_pickaxe behaviors: - type: range_mining_item conditions: [] # 行为激活条件 range: - 0,1,0 # 宽,高,深 — 相对于被挖掘方块的偏移 - 0,-1,0 - 1,0,0 - -1,0,0` `range` 中每条是 `宽,高,深` 偏移。围绕方块周围 `3x3` 的平面区域： `range: - 0,1,0 - 1,1,0 - -1,1,0 - 0,0,0 - 1,0,0 - -1,0,0 - 0,-1,0 - 1,-1,0 - -1,-1,0`

## YAML 片段

```yaml
items:  default:topaz_pickaxe:
      material: golden_pickaxe
    behaviors:
      - type: range_mining_item        conditions: []                    # 行为激活条件        range:
      - 0,1,0   # 宽,高,深 — 相对于被挖掘方块的偏移
      - 0,-1,0
      - 1,0,0
      - -1,0,0
```

## 相关页面

- （无）
