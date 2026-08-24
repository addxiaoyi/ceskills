---
id: page:configuration_block_behaviors_fence_gate_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/fence_gate_block
aliases: 栅栏门方块, configuration block behaviors fence gate block, 🪵 栅栏门方块, 示例
---

# 🪵 栅栏门方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/fence_gate_block
- 连接数：0

## 摘要

本页总览 # 🪵 栅栏门方块 栅栏门方块行为与原版栅栏门一致。可通过手、红石或风弹开关。用手打开时，门会根据玩家方向调整朝向——若玩家在门后，`facing` 会自动翻转。 `in_wall` 属性会根据门朝向两侧的方块状态自动更新，当两侧存在是 `#minecraft:walls` 标签的方块时，该属性会设置为 `true`。 属性名称属性类型是否必需openboolean是poweredboolean是in_wallboolean是facinghorizontal_direction是 ## 示例​ `blocks: default:palm_fence_gate: behavior: type: fence_gate_block can_open_with_hand: true # 允许右键点击切换（默认为 true） can_open_by_wind_charge: true # 允许风弹切换（默认为 true） sounds: open: block.fence_gate.open # 打开时播放的音效（可选） close: block.fence_gate.close #

## YAML 片段

```yaml
blocks:  default:palm_fence_gate:
    behavior:
      type: fence_gate_block      can_open_with_hand: true        # 允许右键点击切换（默认为 true）      can_open_by_wind_charge: true   # 允许风弹切换（默认为 true）
      sounds:        open: block.fence_gate.open        # 打开时播放的音效（可选）        close: block.fence_gate.close      # 关闭时播放的音效（可选）
```

## 相关页面

- （无）
