---
id: page:configuration_block_behaviors_chime_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/chime_block
aliases: 震响方块, configuration block behaviors chime block, 🔔 震响方块, 示例
---

# 🔔 震响方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/chime_block
- 连接数：0

## 摘要

本页总览 # 🔔 震响方块 震响方块被弹射物（箭、三叉戟等）击中时发出的音效，类似于紫水晶块。 ## 示例​ `blocks: default:palm_button: behavior: type: chime_block sounds: chime: minecraft:block.amethyst_block.chime # 被弹射物击中时播放的音效（可选）`

## YAML 片段

```yaml
blocks:  default:palm_button:
    behavior:
      type: chime_block
      sounds:        chime: minecraft:block.amethyst_block.chime   # 被弹射物击中时播放的音效（可选）
```

## 相关页面

- （无）
