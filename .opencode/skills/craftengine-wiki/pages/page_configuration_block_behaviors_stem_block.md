---
id: page:configuration_block_behaviors_stem_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stem_block
aliases: 茎方块, configuration block behaviors stem block, 🍄 茎方块, 示例
---

# 🍄 茎方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/stem_block
- 连接数：0

## 摘要

本页总览 # 🍄 茎方块 茎方块会随时间生长，就像原版西瓜或南瓜茎。每次随机刻都会进入一个 `age` 阶段。达到最大值后，会随机选择一个水平方向。若目标位置为空气且其下方方块满足条件，则在该位置生成果实，并将自身替换为朝向果实的附着茎方块。 骨粉可使茎额外生长多个 `age` 阶段，若达到最大值，则会立即尝试生成果实。 仅当当前位置光照等级位于 `light_requirement`（下限，默认为 0）与 `max_light_requirement`（上限，默认为 15）之间时才会生长。 属性名称属性类型是否必需ageint是 ## 示例​ `blocks: default:hami_melon_stem: behavior: type: stem_block fruit: default:hami_melon # 茎生成的果实方块（必需） attached_stem: default:attached_hami_melon_stem # 变为的附着茎方块（必需） light_requirement: 0 # 生长所需最低光照等级（默认为 0） max_light_require

## YAML 片段

```yaml
blocks:  default:hami_melon_stem:
    behavior:
      type: stem_block      fruit: default:hami_melon                              # 茎生成的果实方块（必需）      attached_stem: default:attached_hami_melon_stem        # 变为的附着茎方块（必需）      light_requirement: 0                                   # 生长所需最低光照等级（默认为 0）      max_light_requirement: 15                              # 生长所需最高光照等级（默认为 15）      fruit_bottom_blocks:                                   # 果实可坐落的方块（白名单）
      - minecraft:farmland
      - minecraft:dirt      fruit_bottom_block_tags: []                            # 果实可坐落的方块标签（白名单）
```

## 相关页面

- （无）
