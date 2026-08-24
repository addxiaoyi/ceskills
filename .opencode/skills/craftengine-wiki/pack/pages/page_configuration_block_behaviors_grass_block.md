---
id: page:configuration_block_behaviors_grass_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/grass_block
aliases: 草方块, configuration block behaviors grass block, 🌿 草方块, 示例
---

# 🌿 草方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/grass_block
- 连接数：0

## 摘要

本页总览 # 🌿 草方块 对着草方块使用骨粉后，草方块会尝试生成一个[已配置的地物](https://zh.minecraft.wiki/w/%E5%B7%B2%E9%85%8D%E7%BD%AE%E7%9A%84%E5%9C%B0%E7%89%A9)，其决定了所生成基本内容，例如 `minecraft:grass_bonemeal` 会尝试在方块上方生成草和花。 ## 示例​ `blocks: default:grass_block: behavior: type: grass_block feature: minecraft:grass_bonemeal # 尝试生成的已配置的地物（必需）` 注意 - 方块必须拥有 `minecraft:dirt` 和 `minecraft:supports_vegetation`(26.1+) 标签，否则其上生成的草和花无法存活。

## YAML 片段

```yaml
blocks:  default:grass_block:
    behavior:
      type: grass_block      feature: minecraft:grass_bonemeal   # 尝试生成的已配置的地物（必需）
```

## 相关页面

- （无）
