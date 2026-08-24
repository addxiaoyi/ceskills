---
id: page:configuration_item_behaviors_liquid_collision_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/liquid_collision_block_item
aliases: 液体碰撞方块物品, configuration item behaviors liquid collision block item, 🌊 液体碰撞方块物品
---

# 🌊 液体碰撞方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/liquid_collision_block_item
- 连接数：2

## 摘要

# 🌊 液体碰撞方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但允许放置在液体表面（水或熔岩）。使用 `offset_y` 调整相对于液面的放置高度。 `items: default:reed: material: paper behavior: type: liquid_collision_block_item offset_y: 1 # 相对于液面的高度偏移 block: default:reed`

## YAML 片段

```yaml
items:  default:reed:
      material: paper
    behavior:
      type: liquid_collision_block_item      offset_y: 1               # 相对于液面的高度偏移
      block: default:reed
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
