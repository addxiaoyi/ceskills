---
id: page:configuration_block_behaviors_concrete_powder_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/concrete_powder_block
aliases: 混凝土粉末方块, configuration block behaviors concrete powder block, 💦 混凝土粉末方块, 示例
---

# 💦 混凝土粉末方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/concrete_powder_block
- 连接数：2

## 摘要

本页总览 # 💦 混凝土粉末方块 混凝土粉末方块遇水会硬化成固体方块。硬化发生在以下情况： - 放置时——若放置后与水接触。 - 下落后——若落在水中或与水接触（常与[🟨 可下落方块](/zh-Hans/configuration/block/behaviors/falling_block)组合使用）。 - [PP更新](https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97%E6%9B%B4%E6%96%B0#PP%E6%9B%B4%E6%96%B0)时——若水流到已放置的粉末方块旁。 当方块接触到水时，会触发 `BlockFormEvent` 并用 `solid_block` 替换自身。 ## 示例​ `blocks: default:gunpowder_block: behavior: type: concrete_powder_block solid_block: default:solid_gunpowder_block # 硬化后转化成的方块（必需）` 信息`solid_block` 接受任意有效的方块 ID 或完整方块状态（如 `

## YAML 片段

```yaml
blocks:  default:gunpowder_block:
    behavior:
      type: concrete_powder_block
      solid_block: default:solid_gunpowder_block   # 硬化后转化成的方块（必需）
```

## 相关页面

- depends_on → [🟨 可下落方块](page_configuration_block_behaviors_falling_block.md)
