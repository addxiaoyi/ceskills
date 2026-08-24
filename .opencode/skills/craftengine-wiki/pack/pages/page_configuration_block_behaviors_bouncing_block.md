---
id: page:configuration_block_behaviors_bouncing_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/bouncing_block
aliases: 弹跳方块, configuration block behaviors bouncing block, ⏏️ 弹跳方块, 示例
---

# ⏏️ 弹跳方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/bouncing_block
- 连接数：1

## 摘要

本页总览 # ⏏️ 弹跳方块 弹跳方块能将落在其上的实体弹回空中。当实体落到这个方块上时，其下落速度会被反转——`bounce_height` 控制反弹时保留多少速度。处于潜行状态下的实体不会被反弹，而是正常落地。 摔落伤害仍会生效，但会按 `fall_damage_multiplier` 等比缩放。设为 `0` 可完全禁用摔落伤害。 ## 示例​ `blocks: default:sofa: behavior: type: bouncing_block bounce_height: 0.66 # 反弹速度系数，0 为不反弹（默认为 0.66，仅在 26.1.2 及更低版本生效，26.2+ 通过方块设置 bounce_restitution 定义） fall_damage_multiplier: 0.5 # 摔落伤害系数，0 为无伤害（默认为 0.5） sync_player_position: true # 弹跳后强制同步客户端与服务端的移动向量（默认为 true）` 信息sync_player_position： 当设为 `true` 时，服务器会在弹跳 1 刻后标记需要向客户端修

## YAML 片段

```yaml
blocks:  default:sofa:
    behavior:
      type: bouncing_block      bounce_height: 0.66              # 反弹速度系数，0 为不反弹（默认为 0.66，仅在 26.1.2 及更低版本生效，26.2+ 通过方块设置 bounce_restitution 定义）      fall_damage_multiplier: 0.5      # 摔落伤害系数，0 为无伤害（默认为 0.5）      sync_player_position: true       # 弹跳后强制同步客户端与服务端的移动向量（默认为 true）
```

## 相关页面

- （无）
