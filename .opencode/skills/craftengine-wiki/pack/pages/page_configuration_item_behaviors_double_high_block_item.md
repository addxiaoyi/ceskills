---
id: page:configuration_item_behaviors_double_high_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/double_high_block_item
aliases: 2双格高方块物品, configuration item behaviors double high block item, 2️⃣ 双格高方块物品
---

# 2️⃣ 双格高方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/double_high_block_item
- 连接数：2

## 摘要

# 2️⃣ 双格高方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但专为两格高的方块设计（如门）。修复标准 `block_item` 放置时的偏移问题。 `items: default:palm_door: behavior: type: double_high_block_item block: default:palm_door`

## YAML 片段

```yaml
items:  default:palm_door:
    behavior:
      type: double_high_block_item
      block: default:palm_door
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
