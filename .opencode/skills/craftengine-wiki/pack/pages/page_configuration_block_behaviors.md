---
id: page:configuration_block_behaviors
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors
aliases: 方块行为, configuration block behaviors, 🕹️ 方块行为, 简介, 指定行为, 复合行为
---

# 🕹️ 方块行为

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors
- 连接数：8

## 摘要

本页总览 # 🕹️ 方块行为 ## 简介​ 方块行为定义了方块独特的机制与物理特性——例如如何生长、下落、开启、蔓延，或如何与相邻方块互动。原版 Minecraft 将这些机制硬编码进特定方块中，CraftEngine 则允许你通过配置，把同样的机制指定到任意方块上。 某些行为依赖特定的方块属性才能工作，例如： - [农作物](/zh-Hans/configuration/block/behaviors/crop_block)需要 `age` 属性来追踪生长阶段 - [门](/zh-Hans/configuration/block/behaviors/door_block)需要 `hinge` 属性来决定门轴位于哪一侧 在后续各个行为的页面中，你会看到类似下面的属性表，用于说明该行为支持的属性名称、类型以及是否必需。 属性名称属性类型是否必需facingdirection是waterloggedboolean否 信息未来版本可能会支持自定义属性名称。目前，为了简化配置，属性名称是硬编码的。有关类型和保留名称的完整列表，请参考[ℹ️ 属性](/zh-Hans/configuration

## YAML 片段

```yaml
blocks:  default:fairy_flower:
    behavior:
      type: bush_block
      bottom_block_tags:
      - minecraft:dirt
      - minecraft:farmland
```

```yaml
blocks:  default:gunpowder_block:
    behaviors:
      - type: concrete_powder_block
      solid_block: default:solid_gunpowder_block
      - type: falling_block
```

## 相关页面

- requires → [🧱 方块](page_configuration_block.md)
- depends_on → [🌽 农作物方块](page_configuration_block_behaviors_crop_block.md)
- depends_on → [🚪 门方块](page_configuration_block_behaviors_door_block.md)
- depends_on → [ℹ️ 属性](page_configuration_block_states_properties.md)
- depends_on → [💦 混凝土粉末方块](page_configuration_block_behaviors_concrete_powder_block.md)
- depends_on → [🟨 可下落方块](page_configuration_block_behaviors_falling_block.md)
