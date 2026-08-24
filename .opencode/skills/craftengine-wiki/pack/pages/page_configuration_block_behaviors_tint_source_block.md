---
id: page:configuration_block_behaviors_tint_source_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/tint_source_block
aliases: 颜色提供器方块, configuration block behaviors tint source block, 🎨 颜色提供器方块, 示例
---

# 🎨 颜色提供器方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/tint_source_block
- 连接数：1

## 摘要

本页总览 # 🎨 颜色提供器方块 方块实体 颜色提供器方块可以将物品作为颜色提供器存入方块实体，使[方块实体渲染器元素](/zh-Hans/configuration/block/states/entity_renderer#%E6%B8%B2%E6%9F%93%E5%85%83%E7%B4%A0%E7%B1%BB%E5%9E%8B)可根据存储的物品[动态着色](/zh-Hans/configuration/block/states/entity_renderer#%E9%A2%9C%E8%89%B2%E6%8F%90%E4%BE%9B%E5%99%A8)。 若启用 `drop_item`，方块被破坏时存储的物品会掉落。 ## 示例​ `blocks: default:copper_coil: behavior: type: tint_source_block drop_item: true # 方块破坏后是否掉落存储的物品（默认为 true） data_key: "craftengine:tint_source" # 持久化数据的 NBT 键（默认为 "craftengine:ti

## YAML 片段

```yaml
blocks:  default:copper_coil:
    behavior:
      type: tint_source_block      drop_item: true                     # 方块破坏后是否掉落存储的物品（默认为 true）      data_key: "craftengine:tint_source" # 持久化数据的 NBT 键（默认为 "craftengine:tint_source"）
```

## 相关页面

- depends_on → [🫑 方块实体渲染器](page_configuration_block_states_entity_renderer.md)
