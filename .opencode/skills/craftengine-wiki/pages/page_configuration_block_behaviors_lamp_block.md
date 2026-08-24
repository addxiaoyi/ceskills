---
id: page:configuration_block_behaviors_lamp_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/lamp_block
aliases: 灯方块, configuration block behaviors lamp block, 💡 灯方块, 示例
---

# 💡 灯方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/lamp_block
- 连接数：0

## 摘要

本页总览 # 💡 灯方块 灯方块根据红石信号切换 `lit` 点亮状态，就像原版红石灯。收到红石信号会立刻被点亮，失去红石信号供给后需要 4 刻才能熄灭。 放置时会自动检测附近的红石信号并设置正确的初始状态。 属性名称属性类型是否必需litboolean是 ## 示例​ `blocks: default:copper_coil: behavior: type: lamp_block`

## YAML 片段

```yaml
blocks:  default:copper_coil:
    behavior:
      type: lamp_block
```

## 相关页面

- （无）
