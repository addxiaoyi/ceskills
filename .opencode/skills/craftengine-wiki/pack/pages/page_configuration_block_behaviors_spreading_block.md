---
id: page:configuration_block_behaviors_spreading_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/spreading_block
aliases: 扩散方块, configuration block behaviors spreading block, 👾 扩散方块, 示例
---

# 👾 扩散方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/spreading_block
- 连接数：0

## 摘要

本页总览 # 👾 扩散方块 扩散方块会在收到随机刻后尝试向周围扩散。每次尝试都会在附近随机选择一个位置，若该位置的方块类型与 `target_block` 相同，则将其替换为自身。 扩散范围为当前位置周围的随机区域（X/Z 方向 ±1 格，Y 方向 -3 至 +1 格）。 ## 示例​ `blocks: default:corruption_block: behavior: type: spreading_block target_block: minecraft:stone # 可被转化的目标方块（必需）` 注意这是一个随机刻行为——只有方块收到随机刻时才会尝试扩散。

## YAML 片段

```yaml
blocks:  default:corruption_block:
    behavior:
      type: spreading_block      target_block: minecraft:stone   # 可被转化的目标方块（必需）
```

## 相关页面

- （无）
