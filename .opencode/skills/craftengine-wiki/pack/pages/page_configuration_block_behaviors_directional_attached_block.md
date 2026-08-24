---
id: page:configuration_block_behaviors_directional_attached_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/directional_attached_block
aliases: 定向附着方块, configuration block behaviors directional attached block, ➡️ 定向附着方块, 属性, 示例
---

# ➡️ 定向附着方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/directional_attached_block
- 连接数：0

## 摘要

本页总览 # ➡️ 定向附着方块 定向附着方块可以附着在另一个方块的侧面上，类似墙上的火把。若附着的方块变动（移动、破坏、替代等）而不再允许附着时，方块会被破坏。 放置时会尝试附着到这块空间内最近的有效附着表面。 同时是否能附着在附着的方块上是由 `blacklist` 选项和方块（标签）列表决定： - 黑名单模式（`blacklist: true`，默认）：可附着到除了列表中的方块。 - 白名单模式（`blacklist: false`）：只能附着到列表中的方块。 在满足以上条件的同时，还需要附着的方块侧面完整。 ## 属性​ 属性名称属性类型是否必需facinghorizontal_direction是 ## 示例​ `blocks: default:amethyst_wall_torch: behavior: type: directional_attached_block blacklist: true # true = 黑名单，false = 白名单（默认为 true） attached_blocks: # 要检查的方块列表（可选） - custom:xxx - minecr

## YAML 片段

```yaml
blocks:  default:amethyst_wall_torch:
    behavior:
      type: directional_attached_block      blacklist: true                   # true = 黑名单，false = 白名单（默认为 true）      attached_blocks:                  # 要检查的方块列表（可选）
      - custom:xxx
      - minecraft:stone      attached_block_tags:              # 要检查的方块标签列表（可选）
      - minecraft:dirt
      - minecraft:farmland
```

## 相关页面

- （无）
