---
id: page:configuration_item_behaviors_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/block_item
aliases: 方块物品, configuration item behaviors block item, 🧱 方块物品
---

# 🧱 方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/block_item
- 连接数：8

## 摘要

# 🧱 方块物品 右键点击有效表面时放置方块。 `items: default:palm_sapling: behavior: type: block_item block: default:palm_sapling # 引用已有方块 ID` `block` 字段也支持内联定义——方块会以物品自身的 ID 注册： `items: default:fairy_flower: behavior: type: block_item block: # 内联：定义一个新方块 settings: template: - default:hardness/none - default:sound/grass overrides: push_reaction: destroy map_color: 19 behavior: - type: bush_block bottom_blocks: - minecraft:farmland loot: template: default:loot_table/self state: auto_state: sugar_cane models: - path:

## YAML 片段

```yaml
items:  default:palm_sapling:
    behavior:
      type: block_item
      block: default:palm_sapling       # 引用已有方块 ID
```

```yaml
items:  default:fairy_flower:
    behavior:
      type: block_item
      block:                            # 内联：定义一个新方块
    settings:          template:
      - default:hardness/none
      - default:sound/grass          overrides:            push_reaction: destroy            map_color: 19
    behavior:
      - type: bush_block            bottom_blocks:
      - minecraft:farmland
    loot:          template: default:loot_table/self
    state:
      auto_state: sugar_cane          models:
      - path: minecraft:block/custom/fairy_flower
```

## 相关页面

- （无）
