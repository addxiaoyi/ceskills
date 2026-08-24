---
id: page:configuration_block_behaviors_sapling_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sapling_block
aliases: 树苗方块, configuration block behaviors sapling block, 🌴 树苗方块, 示例
---

# 🌴 树苗方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sapling_block
- 连接数：0

## 摘要

本页总览 # 🌴 树苗方块 树苗方块会随时间生长。每次随机刻，若光照条件满足，则以 `grow_speed` 的概率使 `stage` 增加 1。当 `stage` 达到最大值时，会通过配置的**地物（feature）或结构（structure）**生成完整的树木。 仅当方块上方位置的亮度位于 `light_requirement`（下限，默认为 9）与 `max_light_requirement`（上限，默认为 15）之间时才会生长。 骨粉可以无视光照和生长概率，立即将 `stage` 增加 1，若已达最大值则直接尝试生成树木。`bone_meal_success_chance` 仅决定骨粉使用时是否播放绿色粒子效果——无论粒子是否出现，`stage` 的增加始终生效。 属性名称属性类型是否必需stageint是 ## 示例​ `blocks: default:palm_sapling: behavior: type: sapling_block feature: default:palm_tree # 完全成熟时生成的已配置的地物（未设置 structure 时必需） # st

## YAML 片段

```yaml
blocks:  default:palm_sapling:
    behavior:
      type: sapling_block      feature: default:palm_tree                # 完全成熟时生成的已配置的地物（未设置 structure 时必需）      # structure: default:palm_grove           # 备选：改为生成一个已注册的结构      light_requirement: 9                      # 生长所需最低光照（默认为 9）      max_light_requirement: 15                 # 生长所需最高光照（默认为 15）      grow_speed: 0.7                           # 每随机刻增加 stage 的概率（默认约 0.143）      bone_meal_success_chance: 0.45            # 骨粉产生成功粒子的概率（默认为 0.45）
```

## 相关页面

- （无）
