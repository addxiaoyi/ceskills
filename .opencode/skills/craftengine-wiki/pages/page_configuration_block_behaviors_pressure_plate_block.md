---
id: page:configuration_block_behaviors_pressure_plate_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/pressure_plate_block
aliases: 压力板方块, configuration block behaviors pressure plate block, ⬜️ 压力板方块, 示例
---

# ⬜️ 压力板方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/pressure_plate_block
- 连接数：0

## 摘要

本页总览 # ⬜️ 压力板方块 压力板方块是一种可以用来探测玩家、生物等实体的方块。当实体踩上时，发出 15 强度的[强充能](https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E7%94%B5%E8%B7%AF/%E5%85%85%E8%83%BD%E4%B8%8E%E6%BF%80%E6%B4%BB#%E5%85%85%E8%83%BD%EF%BC%88Charging%EF%BC%89)信号，在实体离开后持续保持 `pressed_time` 刻按下。 选项 `sensitivity` 可以控制哪些实体能触发压力板： - `all`（默认）： 任意实体。 - `mob`： 仅限生物。 压力板必须放置于方块支撑形状上表面中心完整或边缘完整的方块上方。 属性名称属性类型是否必需poweredboolean是 ## 示例​ `blocks: default:palm_pressure_plate: behavior: type: pressure_plate_block sensitivity: all # "all" 或 "mob"（默认为

## YAML 片段

```yaml
blocks:  default:palm_pressure_plate:
    behavior:
      type: pressure_plate_block      sensitivity: all           # "all" 或 "mob"（默认为 all）      pressed_time: 20           # 实体离开后保持按下的时长，单位：刻（默认为 20）
      sounds:        on: minecraft:block.wooden_pressure_plate.click_on    # 按下时播放的音效（可选）        off: minecraft:block.wooden_pressure_plate.click_off  # 释放时播放的音效（可选）
```

## 相关页面

- （无）
