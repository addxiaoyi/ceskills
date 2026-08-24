---
id: page:configuration_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block
aliases: 方块, configuration block, 🧱 方块, 概览, 结构速览, 可配置的部分
---

# 🧱 方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block
- 连接数：23

## 摘要

本页总览 # 🧱 方块 ## 概览​ 一个自定义方块就是在[任意配置](/zh-Hans/configuration#%E7%AE%80%E4%BB%8B)里的 `block` 或 `blocks` 键下的配置区域的一个子配置。每个子配置以它的键作为方块 id —— `命名空间:路径`，如 `default:palm_log`，然后由不同的配置选项拼装而成，你只需配置自己需要的部分。 其中只有一个选项是必填的 `state` 或 `states`，其余的选项都可以按需添加。 ## 结构速览​ 每个方块都遵循同样的结构。每个选项回答关于方块的一个问题： `blocks: # 配置区域 —— 通常可以定义在任意配置文件夹中的任意配置文件中 default:my_block: # 方块 id —— 可以在其他地方通过 default:my_block 引用 state: # 方块状态 —— 必填 → 他看起来是什么（模型、判定箱） ... settings: # 方块设置 —— 可选 → 基本属性是什么（硬度、音效、亮度、标签） ... behavior: # 方块行为 —— 可选 → 有

## YAML 片段

```yaml
blocks:                 # 配置区域  ——  通常可以定义在任意配置文件夹中的任意配置文件中  default:my_block:     # 方块 id   ——  可以在其他地方通过 default:my_block 引用
    state:              # 方块状态  ——  必填   → 他看起来是什么（模型、判定箱）      ...
    settings:           # 方块设置  ——  可选   → 基本属性是什么（硬度、音效、亮度、标签）      ...
    behavior:           # 方块行为  ——  可选   → 有什么行为（生长、下落、存储、蔓延...）      ...
    loot:               # 战利品表  ——  可选   → 被破坏时掉落什么      ...
    events:             # 事件      ——  可选   → 对玩家交互的反应（放置、破坏...）      ...
```

```yaml
blocks:  default:my_block:
    state:
      auto_state: note_block                       # 让插件自动选一个视觉状态
    model:
      texture: "minecraft:block/custom/my_block" # 单张纹理 → cube_all 模型
```

```yaml
blocks:  default:my_block:
    state:
      auto_state: note_block
    model:
      texture: "minecraft:block/custom/my_block"
    settings:
      hardness: 1.5      resistance: 6.0      is_suffocating: true      is_redstone_conductor: true      instrument: basedrum      map_color: 11
      sounds:        break: minecraft:block.stone.break        step: minecraft:block.stone.step        place: minecraft:block.stone.place        hit: minecraft:block.stone.hit        fall: minecraft:block.stone.fall      correct_tools:
      - minecraft:wooden_pickaxe
      - minecraft:stone_pickaxe
      - minecraft:iron_pickaxe
      - minecraft:golden_pickaxe
      - minecraft:diamond_pickaxe
      - minecraft:netherite_pickaxe
      tags:
      - minecraft:mineable/pickaxe
```

```yaml
blocks:  default:my_block:
    state:
      auto_state: note_block
    model:
      texture: "minecraft:block/custom/my_block"
    settings:
      hardness: 1.5
      tags:
      - minecraft:mineable/axe
      - minecraft:logs
    behavior:
      type: strippable_block
      stripped: default:stripped_my_block
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [⚙️ 配置](page_configuration.md)
- depends_on → [🔣 方块状态](page_configuration_block_states.md)
- depends_on → [🔧 方块设置](page_configuration_block_settings.md)
- depends_on → [🕹️ 方块行为](page_configuration_block_behaviors.md)
- depends_on → [🎲 战利品表](page_reference_loot_table.md)
- depends_on → [🪇 事件](page_reference_events.md)
- depends_on → [🫑 方块实体渲染器](page_configuration_block_states_entity_renderer.md)
- depends_on → [🧱 方块物品](page_configuration_item_behaviors_block_item.md)
- depends_on → [⬇️ 天花板方块物品](page_configuration_item_behaviors_ceiling_block_item.md)
- depends_on → [🧱 墙面方块物品](page_configuration_item_behaviors_wall_block_item.md)
- depends_on → [⬆️ 地面方块物品](page_configuration_item_behaviors_ground_block_item.md)
- depends_on → [2️⃣ 双格高方块物品](page_configuration_item_behaviors_double_high_block_item.md)
- depends_on → [🔢 多格高方块物品](page_configuration_item_behaviors_multi_high_block_item.md)
- depends_on → [🌊 液体碰撞方块物品](page_configuration_item_behaviors_liquid_collision_block_item.md)
- depends_on → [ℹ️ 属性](page_configuration_block_states_properties.md)
- depends_on → [💎 掉落经验方块](page_configuration_block_behaviors_drop_experience_block.md)
- depends_on → [⚖️ 条件](page_reference_conditions.md)
- depends_on → [🏷️ 方块标签](page_reference_block_tags.md)
