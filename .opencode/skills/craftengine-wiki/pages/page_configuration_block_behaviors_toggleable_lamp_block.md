---
id: page:configuration_block_behaviors_toggleable_lamp_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/toggleable_lamp_block
aliases: 可切换灯方块, configuration block behaviors toggleable lamp block, 💡 可切换灯方块, 属性, 示例
---

# 💡 可切换灯方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/toggleable_lamp_block
- 连接数：0

## 摘要

本页总览 # 💡 可切换灯方块 可切换灯方块通过切换 `lit` 属性控制亮灭状态。可由红石、手动交互或两者共同控制。 - 红石： 每当方块从未充能变为充能时，`lit` 状态会翻转一次。`powered` 属性用于记录当前是否受到红石信号。 - 手动交互： 当 `can_open_with_hand` 启用时，玩家可右键直接切换 `lit` 状态。 ## 属性​ 属性名称属性类型是否必需litboolean是poweredboolean否* * 当 `can_open_with_hand` 为 `false` 时必需；为 `true` 时可选。 ## 示例​ `blocks: default:copper_coil: behavior: type: toggleable_lamp_block can_open_with_hand: false # 允许右键点击切换（默认为 false）`

## YAML 片段

```yaml
blocks:  default:copper_coil:
    behavior:
      type: toggleable_lamp_block      can_open_with_hand: false       # 允许右键点击切换（默认为 false）
```

## 相关页面

- （无）
