---
id: page:configuration_block_behaviors_stackable_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stackable_block
aliases: 可堆叠方块, configuration block behaviors stackable block, 🥪 可堆叠方块, 示例
---

# 🥪 可堆叠方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stackable_block
- 连接数：0

## 摘要

本页总览 # 🥪 可堆叠方块 可堆叠方块允许使用指定物品对已有方块进行堆叠，就像海泡菜或蜡烛。使用 `items` 列表中配置的物品对方块放置时，会递增指定 int 属性的值，直到达到该属性的最大值。不同的属性值可用于切换不同的视觉状态。 属性名称属性类型是否必需自定义int是 ## 示例​ `blocks: default:pebble: behavior: type: stackable_block property: pebble # 用于记录堆叠数量的 int 属性名（默认为 "amount"） items: # 可用于增加堆叠的物品（必需） - default:pebble` 信息`property` 指定用于记录堆叠数量的 int 属性。使用 `items` 中配置的物品对同类方块放置时，该属性会递增 1，直到达到其最大值。属性的取值范围决定了可用的堆叠等级数量。

## YAML 片段

```yaml
blocks:  default:pebble:
    behavior:
      type: stackable_block      property: pebble           # 用于记录堆叠数量的 int 属性名（默认为 "amount"）
items:                     # 可用于增加堆叠的物品（必需）
      - default:pebble
```

## 相关页面

- （无）
