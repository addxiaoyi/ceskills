---
id: page:configuration_block_behaviors_door_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/door_block
aliases: 门方块, configuration block behaviors door block, 🚪 门方块, 示例
---

# 🚪 门方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/door_block
- 连接数：1

## 摘要

本页总览 # 🚪 门方块 门方块是由下半部分与上半部分组成的两个方块高的结构。放置一个方块可自动创建两半。门可通过手、红石或风弹开启。 - 手： 右键点击切换开关。 - 红石： 开关与两半同步——上、下半同时切换。 - 风弹： 风弹击中下半部分可切换（仅在未被红石充能时）。 `hinge` 侧在放置时根据相邻方块的碰撞形状与附近门自动判定，模拟原版门的铰链逻辑。 当门的一半被破坏时，另一半也会同步移除，以保持门结构完整并避免重复掉落。 属性名称属性类型是否必需openboolean是poweredboolean是halfdouble_block_half是facinghorizontal_direction是hingehinge是 ## 示例​ `blocks: default:palm_door: behavior: type: door_block can_open_with_hand: true # 允许右键点击切换（默认为 true） can_open_by_wind_charge: true # 允许风弹切换（默认为 true） sounds: open: block.wo

## YAML 片段

```yaml
blocks:  default:palm_door:
    behavior:
      type: door_block      can_open_with_hand: true        # 允许右键点击切换（默认为 true）      can_open_by_wind_charge: true   # 允许风弹切换（默认为 true）
      sounds:        open: block.wooden_door.open      # 打开时播放的音效（可选）        close: block.wooden_door.close    # 关闭时播放的音效（可选）
```

## 相关页面

- （无）
