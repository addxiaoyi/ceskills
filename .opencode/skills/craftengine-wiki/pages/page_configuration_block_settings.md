---
id: page:configuration_block_settings
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/settings
aliases: 方块设置, configuration block settings, 🔧 方块设置, 概览, 稳定设置, 硬度
---

# 🔧 方块设置

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/settings
- 连接数：9

## 摘要

本页总览 # 🔧 方块设置 ## 概览​ `settings` 配置部分定义了方块的基础属性，例如硬度、音效、熔岩可燃性、亮度、合适挖掘工具等，其次这与[🕹️ 方块行为](/zh-Hans/configuration/block/behaviors)不在同一个配置部分。此外所有设置项均为可选（省略时使用默认值），并能通过[变体](/zh-Hans/configuration/block/states#%E5%8F%98%E4%BD%93%E5%8C%B9%E9%85%8D%E8%A7%84%E5%88%99)按状态覆盖。以下是包含所有可用设置类型的示例： 示例阅读更多`blocks: custom:all_settings_block: settings: hardness: 0.5 resistance: 0.5 push_reaction: NORMAL map_color: 36 burnable: false fire_spread_chance: 0 burn_chance: 0 item: custom:all_settings_item replaceable: fa

## YAML 片段

```yaml
blocks:  custom:all_settings_block:
    settings:
      hardness: 0.5      resistance: 0.5      push_reaction: NORMAL      map_color: 36      burnable: false      fire_spread_chance: 0      burn_chance: 0
      item: custom:all_settings_item      replaceable: false      is_redstone_conductor: true      is_suffocating: true      is_view_blocking: true
      sounds:        break: minecraft:block.deepslate.break        step: minecraft:block.deepslate.step        place: minecraft:block.deepslate.place        hit: minecraft:block.deepslate.hit        fall: minecraft:block.deepslate.fall      require_correct_tools: true      respect_tool_component: false      correct_tools:
      - minecraft:wooden_pickaxe      incorrect_tool_dig_speed: 0.3      required_break_power: 2
      tags:
      - minecraft:mineable/pickaxe      instrument: basedrum      fluid_state: water      support_shape: minecraft:stone      luminance: 15      can_occlude: false      block_light: 0      propagate_skylight: false      jump_factor: 1.0      speed_factor: 1.0      friction: 0.7      bounce_restitution: 0.0
```

## 相关页面

- requires → [🧱 方块](page_configuration_block.md)
- depends_on → [🕹️ 方块行为](page_configuration_block_behaviors.md)
- depends_on → [🔣 方块状态](page_configuration_block_states.md)
- depends_on → [🔧 物品设置](page_configuration_item_settings.md)
- depends_on → [🏷️ 方块标签](page_reference_block_tags.md)
- depends_on → [⏏️ 弹跳方块](page_configuration_block_behaviors_bouncing_block.md)
