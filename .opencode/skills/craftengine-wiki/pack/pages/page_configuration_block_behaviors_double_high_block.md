---
id: page:configuration_block_behaviors_double_high_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/double_high_block
aliases: 2双层方块, configuration block behaviors double high block, 2️⃣ 双层方块, 示例
---

# 2️⃣ 双层方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/double_high_block
- 连接数：0

## 摘要

本页总览 # 2️⃣ 双层方块 双层方块由下半部分与上半部分组成的两格高的结构。若上半部分下方不再是与其配对的下半部分（例如下方方块被移除或类型不一致），上半部分会自动破坏，破坏上半部分时，若处于创造模式或未使用正确的工具，下半部分也会被一并移除，且不会额外掉落物品。 属性名称属性类型是否必需halfdouble_block_half是 ## 示例​ `blocks: default:double_high_block: behavior: type: double_high_block`

## YAML 片段

```yaml
blocks:  default:double_high_block:
    behavior:
      type: double_high_block
```

## 相关页面

- （无）
