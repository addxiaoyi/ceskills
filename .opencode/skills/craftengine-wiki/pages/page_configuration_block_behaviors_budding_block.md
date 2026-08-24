---
id: page:configuration_block_behaviors_budding_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/budding_block
aliases: 母岩方块, configuration block behaviors budding block, 🌱 母岩方块, 示例
---

# 🌱 母岩方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/budding_block
- 连接数：0

## 摘要

本页总览 # 🌱 母岩方块 母岩方块按阶段催生附近的方块，类似紫水晶母岩。每个随机刻选取一个随机相邻面，执行以下检查： - 若该面为空气或水，放置 `blocks` 列表中的第一个方块。 - 若该面已是列表中的方块（非最后阶段），将其升级为列表中的下一个方块。 放置新方块时，若目标方块支持 `facing` 属性，则朝向生长方向，若支持 `waterlogged` 属性，则根据目标位置是否处于水中自动设置。 ## 示例​ `blocks: default:infected_palm_log: behavior: type: budding_block growth_chance: 0.2 # 每次随机刻触发生长的概率（默认为 0.2） blocks: # 分阶段方块 ID 列表（必需） - default:small_mushroom - default:medium_mushroom - default:large_mushroom` 注意这是一个随机刻行为——只有方块收到随机刻时才会生长。

## YAML 片段

```yaml
blocks:  default:infected_palm_log:
    behavior:
      type: budding_block      growth_chance: 0.2            # 每次随机刻触发生长的概率（默认为 0.2）
blocks:                       # 分阶段方块 ID 列表（必需）
      - default:small_mushroom
      - default:medium_mushroom
      - default:large_mushroom
```

## 相关页面

- （无）
