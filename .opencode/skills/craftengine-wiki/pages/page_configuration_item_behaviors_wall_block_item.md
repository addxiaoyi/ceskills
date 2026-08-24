---
id: page:configuration_item_behaviors_wall_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/wall_block_item
aliases: 墙面方块物品, configuration item behaviors wall block item, 🧱 墙面方块物品
---

# 🧱 墙面方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/wall_block_item
- 连接数：2

## 摘要

# 🧱 墙面方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但只能放置在方块的侧面（如墙上的火把、按钮）。 `items: default:amethyst_torch: behavior: type: wall_block_item block: default:amethyst_wall_torch`

## YAML 片段

```yaml
items:  default:amethyst_torch:
    behavior:
      type: wall_block_item
      block: default:amethyst_wall_torch
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
