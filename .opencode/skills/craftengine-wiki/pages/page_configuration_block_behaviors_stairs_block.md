---
id: page:configuration_block_behaviors_stairs_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stairs_block
aliases: 楼梯方块, configuration block behaviors stairs block, 🎢 楼梯方块, 示例
---

# 🎢 楼梯方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stairs_block
- 连接数：0

## 摘要

本页总览 # 🎢 楼梯方块 楼梯方块行为与原版楼梯一致。放置时根据点击位置自动设置 `facing` 与 `half`。`shape` 属性会根据周围楼梯自动计算为直梯、内角或外角，从而形成连续的楼梯结构。 属性名称属性类型是否必需shapestairs_shape是halfsingle_block_half是facinghorizontal_direction是waterloggedboolean否 ## 示例​ `blocks: default:palm_stairs: behavior: type: stairs_block` 注意由于 Minecraft 的楼梯连接逻辑属于硬编码行为，自定义楼梯无法与原版楼梯形成内角、外角等连接形状。

## YAML 片段

```yaml
blocks:  default:palm_stairs:
    behavior:
      type: stairs_block
```

## 相关页面

- （无）
