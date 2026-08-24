---
id: page:configuration_block_behaviors_sturdy_base_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sturdy_base_block
aliases: 稳固基底方块, configuration block behaviors sturdy base block, 🏗️ 稳固基底方块, 堆叠, 示例
---

# 🏗️ 稳固基底方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sturdy_base_block
- 连接数：0

## 摘要

本页总览 # 🏗️ 稳固基底方块 稳固基底方块需要在指定方向上有一个坚固的支撑面。若支撑的方块被移除，方块会被破坏。 三种可用的支撑类型：`full`、`rigid` 和 `center`。 ## 堆叠​ 启用 `stackable` 后，方块也可通过堆叠在同类型方块上存活——在支撑方向上最多可有 `max_height` 个连续堆叠的同类型方块。一旦连续数量超过 `max_height`，将无法继续向上堆叠。 ## 示例​ `blocks: default:pebble: behavior: type: sturdy_base_block direction: down # 检查支撑的方向（默认为 down） support_types: # 所需的支撑类型（默认为 ["full"]） - full stackable: false # 是否允许堆叠在同类型方块上 max_height: 0 # 堆叠时的最大高度（需 >1） delay: 0 # 检查延迟（刻），0 = 立即破坏`

## YAML 片段

```yaml
blocks:  default:pebble:
    behavior:
      type: sturdy_base_block      direction: down                # 检查支撑的方向（默认为 down）      support_types:                 # 所需的支撑类型（默认为 ["full"]）
      - full      stackable: false               # 是否允许堆叠在同类型方块上      max_height: 0                  # 堆叠时的最大高度（需 >1）      delay: 0                       # 检查延迟（刻），0 = 立即破坏
```

## 相关页面

- （无）
