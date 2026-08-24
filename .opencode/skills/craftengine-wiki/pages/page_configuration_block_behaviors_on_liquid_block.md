---
id: page:configuration_block_behaviors_on_liquid_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/on_liquid_block
aliases: 液面方块, configuration block behaviors on liquid block, 🌊 液面方块, 示例
---

# 🌊 液面方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/on_liquid_block
- 连接数：0

## 摘要

本页总览 # 🌊 液面方块 液面方块只能放置在液体源表面上，类似睡莲。与 `near_liquid_block` 不同，它要求正下方必须是液体源方块——流动液体不算。冰视为水源。 启用 `stackable` 后，方块也可堆叠在同类型方块上存活。 模式说明堆叠模式（`stackable: true`）即使下方无有指定液体源只要堆叠在同类型方块上即可存活非堆叠模式（`stackable: false`）需要正下方有指定的液体源 ## 示例​ `blocks: default:reed: behavior: type: on_liquid_block liquid_type: # 可坐落的液体类型（默认为 ["water"]） - water stackable: false # 是否允许堆叠在同类型方块上`

## YAML 片段

```yaml
blocks:  default:reed:
    behavior:
      type: on_liquid_block      liquid_type:                 # 可坐落的液体类型（默认为 ["water"]）
      - water      stackable: false             # 是否允许堆叠在同类型方块上
```

## 相关页面

- （无）
