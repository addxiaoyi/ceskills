---
id: page:configuration_block_behaviors_sofa_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sofa_block
aliases: 沙发方块, configuration block behaviors sofa block, 🛋️ 沙发方块, 示例
---

# 🛋️ 沙发方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/sofa_block
- 连接数：0

## 摘要

本页总览 # 🛋️ 沙发方块 沙发方块的行为类似可连接的座椅。`shape` 属性会在[PP更新](https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97%E6%9B%B4%E6%96%B0#PP%E6%9B%B4%E6%96%B0)时根据周围沙发的朝向自动计算为直形或内角，从而形成连续的沙发结构。 属性名称属性类型是否必需shapesofa_shape是facinghorizontal_direction是waterloggedboolean否 ## 示例​ `blocks: default:sofa: behavior: type: sofa_block`

## YAML 片段

```yaml
blocks:  default:sofa:
    behavior:
      type: sofa_block
```

## 相关页面

- （无）
