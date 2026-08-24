---
id: page:configuration_item_behaviors_multi_high_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/multi_high_block_item
aliases: 多格高方块物品, configuration item behaviors multi high block item, 🔢 多格高方块物品
---

# 🔢 多格高方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/multi_high_block_item
- 连接数：2

## 摘要

# 🔢 多格高方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但专为三格及以上的方块设计。修复标准 `block_item` 放置时的偏移问题。 `items: default:tall_plant: behavior: type: multi_high_block_item block: default:tall_plant`

## YAML 片段

```yaml
items:  default:tall_plant:
    behavior:
      type: multi_high_block_item
      block: default:tall_plant
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
