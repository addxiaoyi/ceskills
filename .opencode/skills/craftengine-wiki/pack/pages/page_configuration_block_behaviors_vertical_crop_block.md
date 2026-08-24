---
id: page:configuration_block_behaviors_vertical_crop_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/vertical_crop_block
aliases: 垂直作物方块, configuration block behaviors vertical crop block, 🎍 垂直作物方块, 属性, 示例
---

# 🎍 垂直作物方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/vertical_crop_block
- 连接数：0

## 摘要

本页总览 # 🎍 垂直作物方块 垂直作物方块会在随机刻中向上或向下生长，类似甘蔗或海带。 在垂直方向上，只有最顶端的茎段会增加 `age` 值。每次随机刻触发时，若生长方向的方块为空且总高度未达上限，则增加 `age` 值。当 `age` 值积累至最大值时，会在顶端延伸出一个新茎段，并将原顶端的 `age` 值重置为最小值。 ## 属性​ 属性名称属性类型是否必需ageint是 ## 示例​ `blocks: default:flame_cane: behaviors: - type: vertical_crop_block max_height: 4 # 一株茎秆的最大段数（默认为 3） grow_speed: 0.333 # 每随机刻增加的 age 值，小数部分为额外 +1 的概率（默认为 1） direction: down # 生长方向 up 或 down（默认为 up） - type: hanging_block stackable: true delay: 1` 信息`grow_speed` 决定茎段成熟的速度。整数部分每随机刻直接加给 `age`，小数部分作为概率提供额

## YAML 片段

```yaml
blocks:  default:flame_cane:
    behaviors:
      - type: vertical_crop_block        max_height: 4            # 一株茎秆的最大段数（默认为 3）        grow_speed: 0.333        # 每随机刻增加的 age 值，小数部分为额外 +1 的概率（默认为 1）        direction: down          # 生长方向 up 或 down（默认为 up）
      - type: hanging_block        stackable: true        delay: 1
```

## 相关页面

- （无）
