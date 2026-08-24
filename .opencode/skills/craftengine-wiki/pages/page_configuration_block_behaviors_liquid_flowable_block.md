---
id: page:configuration_block_behaviors_liquid_flowable_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/liquid_flowable_block
aliases: 流体推动方块, configuration block behaviors liquid flowable block, 🪣 流体推动方块, 示例
---

# 🪣 流体推动方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/liquid_flowable_block
- 连接数：0

## 摘要

本页总览 # 🪣 流体推动方块 流体推动方块可被水或熔岩替换，就像矮草丛或火把。当流体流入时，方块会被破坏并替换为对应流体。 - 水： 若 `drop_item` 为 `true`，方块会掉落对应物品。 - 熔岩： 方块不会掉落物品，而是直接摧毁方块。 ## 示例​ `blocks: default:amethyst_torch: behavior: type: liquid_flowable_block drop_item: true # 被水替换时是否掉落物品（默认为 true）`

## YAML 片段

```yaml
blocks:  default:amethyst_torch:
    behavior:
      type: liquid_flowable_block      drop_item: true        # 被水替换时是否掉落物品（默认为 true）
```

## 相关页面

- （无）
