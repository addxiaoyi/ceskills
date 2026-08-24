---
id: page:configuration_block_behaviors_seat_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block
aliases: 座椅方块, configuration block behaviors seat block, 💺 座椅方块, 示例
---

# 💺 座椅方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block
- 连接数：0

## 摘要

本页总览 # 💺 座椅方块 方块实体 座椅方块让玩家通过右键方块坐在上面。每个 `seats` 配置定义一个座位和一个可选[偏航角](https://zh.minecraft.wiki/w/%E6%9C%9D%E5%90%91#Y%E8%BD%B4%E6%97%8B%E8%BD%AC%E8%A7%92%EF%BC%88%E5%81%8F%E8%88%AA%E8%A7%92%EF%BC%89%E4%B8%8E%E6%96%B9%E4%BD%8D)旋转锁定角度。 若配置了 `facing` 属性会自动计算座椅的相对位置——位置随方块朝向旋转，因此同个坐标适用于所有方向。 属性名称属性类型是否必需facinghorizontal_direction否 ## 示例​ `blocks: default:sofa: behavior: type: seat_block seats: - 0,0,0 0 # x,y,z [角度] —— 角度限制玩家身体旋转，省略则可自由旋转`

## YAML 片段

```yaml
blocks:  default:sofa:
    behavior:
      type: seat_block
      seats:
      - 0,0,0 0      # x,y,z [角度] —— 角度限制玩家身体旋转，省略则可自由旋转
```

## 相关页面

- （无）
