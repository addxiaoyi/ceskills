---
id: page:configuration_block_behaviors_change_over_time_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/change_over_time_block
aliases: 随时间更改方块, configuration block behaviors change over time block, 🔄 随时间更改方块, 示例
---

# 🔄 随时间更改方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/change_over_time_block
- 连接数：0

## 摘要

本页总览 # 🔄 随时间更改方块 随时间更改方块在接受到随机刻后会尝试转化层另一种方块，类似铜的氧化。每个随机刻有 `change_speed` 的概率将方块转化为 `next_block`。 原方块的属性会被携带到目标方块，除了 `excluded_properties` 中列出的属性——这些将保持目标方块的默认值。 ## 示例​ `blocks: default:iron_block: behavior: type: change_over_time_block change_speed: 0.057 # 每随机刻转化的概率（默认为 0.057） next_block: default:oxidized_iron_block # 转化成的目标方块（必需） excluded_properties: [] # 转化时忽略的属性（默认空列表）` 注意这是一个随机刻行为——只有方块收到随机刻时才会转化。

## YAML 片段

```yaml
blocks:  default:iron_block:
    behavior:
      type: change_over_time_block      change_speed: 0.057                     # 每随机刻转化的概率（默认为 0.057）      next_block: default:oxidized_iron_block # 转化成的目标方块（必需）      excluded_properties: []                 # 转化时忽略的属性（默认空列表）
```

## 相关页面

- （无）
