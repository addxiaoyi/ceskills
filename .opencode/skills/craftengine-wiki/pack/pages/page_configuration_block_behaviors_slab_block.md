---
id: page:configuration_block_behaviors_slab_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/slab_block
aliases: 台阶方块, configuration block behaviors slab block, ➖️ 台阶方块, 示例
---

# ➖️ 台阶方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/slab_block
- 连接数：0

## 摘要

本页总览 # ➖️ 台阶方块 台阶方块行为与原版台阶一致。放置在方块下半部分或上半部分可创建下半台阶或上半台阶。将相同台阶放置在已有的单层台阶上会将两者合并为双层台阶。 双层台阶无法含水，液体也无法流入双层台阶。 属性名称属性类型是否必需typeslab_type是waterloggedboolean否 ## 示例​ `blocks: default:palm_slab: behavior: type: slab_block`

## YAML 片段

```yaml
blocks:  default:palm_slab:
    behavior:
      type: slab_block
```

## 相关页面

- （无）
