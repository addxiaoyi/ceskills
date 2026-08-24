---
id: page:configuration_block_behaviors_display_item_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/display_item_block
aliases: 物品展示方块, configuration block behaviors display item block, 🖼️ 物品展示方块, 示例
---

# 🖼️ 物品展示方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/display_item_block
- 连接数：0

## 摘要

本页总览 # 🖼️ 物品展示方块 方块实体 物品展示方块在方块上展示一个掉落的物品。手中持有物品时右键放入；空手右键取出。同一时间只能展示一件物品。 比较器在检测方块时若存在物品输出信号 15，否则输出 0（需启用 `has_signal` 选项）。 属性名称属性类型是否必需作用facingdirection否使展示的物品朝向特定方向 ## 示例​ `blocks: default:display_item_block: behavior: type: display_item_block position: "0.5,0.5,0.5" # 展示的物品的位置偏移（默认为 0.5,0.5,0.5） has_signal: true # 允许比较器检测信号：有物品时 15，否则 0（默认为 true） data_key: "craftengine:display_item" # 持久化数据的 NBT 键（默认为 "craftengine:display_item"） tint_source: true # 存储物品是否为方块实体提供颜色（默认为 false） sounds: put: m

## YAML 片段

```yaml
blocks:  default:display_item_block:
    behavior:
      type: display_item_block      position: "0.5,0.5,0.5"              # 展示的物品的位置偏移（默认为 0.5,0.5,0.5）      has_signal: true                     # 允许比较器检测信号：有物品时 15，否则 0（默认为 true）      data_key: "craftengine:display_item" # 持久化数据的 NBT 键（默认为 "craftengine:display_item"）      tint_source: true                    # 存储物品是否为方块实体提供颜色（默认为 false）
      sounds:        put: minecraft:block.decorated_pot.insert        # 放入时播放的音效（可选）        take: minecraft:block.decorated_pot.insert_fail  # 取出时播放的音效（可选）
```

## 相关页面

- （无）
