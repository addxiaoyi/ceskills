---
id: page:configuration_block_behaviors_strippable_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/strippable_block
aliases: 可剥离方块, configuration block behaviors strippable block, 🪓 可剥离方块, 示例
---

# 🪓 可剥离方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/strippable_block
- 连接数：0

## 摘要

本页总览 # 🪓 可剥离方块 可剥离方块可用斧右键剥离，就像原版原木。剥离后会转换为 `stripped` 选项指定的方块，并尽可能保留原方块的属性值。若某些属性被列入 `excluded_properties`，则不会继承其值，而是使用目标方块对应属性的默认值。 ## 示例​ `blocks: default:palm_log: behavior: type: strippable_block stripped: default:stripped_palm_log # 剥离后转化成的方块（必需） excluded_properties: [] # 转化时不继承的属性（默认空列表） tools: # 可以剥离此方块的工具（默认 ["#minecraft:axes"]） - "#minecraft:axes" # 以 # 开头的条目匹配物品标签 - default:palm_knife # 普通条目匹配物品 id（支持自定义物品） sound: minecraft:item.axe.strip # 剥离时播放的音效（默认 minecraft:item.axe.strip）` 信息默认情

## YAML 片段

```yaml
blocks:  default:palm_log:
    behavior:
      type: strippable_block
      stripped: default:stripped_palm_log   # 剥离后转化成的方块（必需）      excluded_properties: []               # 转化时不继承的属性（默认空列表）      tools:                                # 可以剥离此方块的工具（默认 ["#minecraft:axes"]）
      - "#minecraft:axes"                 # 以 # 开头的条目匹配物品标签
      - default:palm_knife                # 普通条目匹配物品 id（支持自定义物品）      sound: minecraft:item.axe.strip       # 剥离时播放的音效（默认 minecraft:item.axe.strip）
```

## 相关页面

- （无）
