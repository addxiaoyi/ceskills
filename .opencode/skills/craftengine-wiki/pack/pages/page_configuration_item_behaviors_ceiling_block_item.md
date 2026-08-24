---
id: page:configuration_item_behaviors_ceiling_block_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/ceiling_block_item
aliases: 天花板方块物品, configuration item behaviors ceiling block item, ⬇️ 天花板方块物品
---

# ⬇️ 天花板方块物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/ceiling_block_item
- 连接数：2

## 摘要

# ⬇️ 天花板方块物品 与 [block_item](/zh-Hans/configuration/item/behaviors/block_item) 类似，但只能放置在方块的底部（如吊灯、悬挂灯笼）。 `items: default:chandelier: behavior: type: ceiling_block_item block: default:chandelier`

## YAML 片段

```yaml
items:  default:chandelier:
    behavior:
      type: ceiling_block_item
      block: default:chandelier
```

## 相关页面

- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
