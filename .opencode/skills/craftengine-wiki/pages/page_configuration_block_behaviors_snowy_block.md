---
id: page:configuration_block_behaviors_snowy_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/snowy_block
aliases: 覆雪方块, configuration block behaviors snowy block, ❄️ 覆雪方块, 示例
---

# ❄️ 覆雪方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/snowy_block
- 连接数：0

## 摘要

本页总览 # ❄️ 覆雪方块 覆雪方块自动检测顶部是否有雪，并据此设置 `snowy` 属性。这与原版草方块切换到覆雪材质的机制相同——当一个带有 `minecraft:snow` 标签的方块直接放在上方时，`snowy` 会被设置为 `true`。 放置时也会同步检测上方方块，以确保初始状态正确。 属性名称属性类型是否必需snowyboolean是 ## 示例​ `blocks: default:snowy_grass_block: behavior: type: snowy_block`

## YAML 片段

```yaml
blocks:  default:snowy_grass_block:
    behavior:
      type: snowy_block
```

## 相关页面

- （无）
