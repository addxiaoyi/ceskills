---
id: page:configuration_block_behaviors_fence_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/fence_block
aliases: 栅栏方块, configuration block behaviors fence block, 🚧 栅栏方块, 示例
---

# 🚧 栅栏方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/fence_block
- 连接数：0

## 摘要

本页总览 # 🚧 栅栏方块 栅栏方块在四个水平方向自动与相邻方块连接。行为与原版栅栏相同。 若启用 `can_leash`，右键可用拴绳系在方块上。 属性名称属性类型是否必需northboolean是eastboolean是southboolean是westboolean是 ## 示例​ `blocks: default:palm_fence: behavior: type: fence_block connectable_block_tag: minecraft:wooden_fences # 连接其他栅栏的标签（默认为 minecraft:wooden_fences） can_leash: true # 是否允许拴绳拴上`

## YAML 片段

```yaml
blocks:  default:palm_fence:
    behavior:
      type: fence_block      connectable_block_tag: minecraft:wooden_fences   # 连接其他栅栏的标签（默认为 minecraft:wooden_fences）      can_leash: true                                  # 是否允许拴绳拴上
```

## 相关页面

- （无）
