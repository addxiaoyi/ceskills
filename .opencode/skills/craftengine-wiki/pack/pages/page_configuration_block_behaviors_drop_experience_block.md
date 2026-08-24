---
id: page:configuration_block_behaviors_drop_experience_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/drop_experience_block
aliases: 掉落经验方块, configuration block behaviors drop experience block, 💎 掉落经验方块, 示例
---

# 💎 掉落经验方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/drop_experience_block
- 连接数：4

## 摘要

本页总览 # 💎 掉落经验方块 掉落经验方块在被破坏时掉落经验球。经验点数和掉落条件均可配置——你可以将经验掉落限制为物品带有特定附魔或任意其他条件。 若方块要求正确的工具（参见[需要合适挖掘工具](/zh-Hans/configuration/block/settings#%E9%9C%80%E8%A6%81%E5%90%88%E9%80%82%E6%8C%96%E6%8E%98%E5%B7%A5%E5%85%B7)），而玩家用错误的工具破坏它，则不会掉落经验。 ## 示例​ `blocks: default:topaz_ore: behavior: type: drop_exp_block amount: 3~7 # 掉落的经验点数（默认为 0） conditions: type: enchantment # 条件：仅当未使用精准采集时掉落经验 predicate: minecraft:silk_touch<=0` 信息 - `amount` 支持[🔢 数字格式](/zh-Hans/reference/number_format) - `conditions` 为可选项，未定义

## YAML 片段

```yaml
blocks:  default:topaz_ore:
    behavior:
      type: drop_exp_block      amount: 3~7                        # 掉落的经验点数（默认为 0）      conditions:
      type: enchantment                # 条件：仅当未使用精准采集时掉落经验        predicate: minecraft:silk_touch<=0
```

## 相关页面

- depends_on → [🔧 方块设置](page_configuration_block_settings.md)
- depends_on → [🔢 数字格式](page_reference_number_format.md)
