---
id: page:configuration_item_behaviors_ground_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/ground_block_item
aliases: 地面方块物品, configuration item behaviors ground block item, ⬆️ 地面方块物品
---

# ⬆️ 地面方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/ground_block_item
- 连接数：2

## 摘要

# ⬆️ 地面方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但只能放置在方块的顶部（如树苗、花朵）。 `items: default:palm_sapling: behavior: type: ground_block_item block: default:palm_sapling`

## YAML 片段

```yaml
items:  default:palm_sapling:
    behavior:
      type: ground_block_item
      block: default:palm_sapling
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
