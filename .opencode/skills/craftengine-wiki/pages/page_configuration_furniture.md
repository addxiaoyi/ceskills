---
id: page:configuration_furniture
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture
aliases: 家具, configuration furniture, 🪑 家具, 概览, 结构速览, 可配置的部分
---

# 🪑 家具

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture
- 连接数：14

## 摘要

本页总览 # 🪑 家具 ## 概览​ 家具是 CraftEngine 基于实体的装饰系统。与原版方块锁定在网格上不同，家具使用原版的展示实体，这让你能以像素级一样的精确控制其位置、旋转、缩放与对齐。更重要的是这些实体由 CraftEngine 管理，不会让其列入实体 tick 列表，因此其性能遥遥领先于原版展示实体。 ## 结构速览​ 每个家具都遵循同样的结构。每个选项回答关于家具的一个问题： `furniture: # 配置区域 —— 通常可以定义在任意配置文件夹中的任意配置文件中 default:my_furniture: # 家具 id —— 可以在其他地方通过 default:my_furniture 引用 variants: # 家具变体 —— 必填 → 他看起来是什么（元素、判定箱、座位） ... settings: # 家具设置 —— 可选 → 基本属性是什么（音效、击打次数等） ... behaviors: # 家具行为 —— 可选 → 有什么行为（存储、物品展示等） ... loot: # 战利品表 —— 可选 → 被破坏时掉落什么 ... events: # 事件

## YAML 片段

```yaml
furniture:                # 配置区域  ——  通常可以定义在任意配置文件夹中的任意配置文件中  default:my_furniture:   # 家具 id  ——  可以在其他地方通过 default:my_furniture 引用    variants:             # 家具变体  ——  必填  → 他看起来是什么（元素、判定箱、座位）      ...
    settings:             # 家具设置  ——  可选  → 基本属性是什么（音效、击打次数等）      ...
    behaviors:            # 家具行为  ——  可选  → 有什么行为（存储、物品展示等）      ...
    loot:                 # 战利品表  ——  可选  → 被破坏时掉落什么      ...
    events:               # 事件     ——  可选  → 对玩家交互的反应（放置、破坏...）      ...
```

```yaml
furniture:  default:my_chair:    variants:      ground:        elements:
      - item: default:my_chair_model   # 要显示的物品模型        hitboxes:
      - position: 0,0,0                # 位于相对原点的判定箱
```

```yaml
furniture:  default:my_chair:
    settings:
      item: default:my_chair               # 家具对应的物品 ID（用于按下鼠标中键点击来选取物品）      hit_times: 3                         # 破坏所需击打次数（默认为 0 = 瞬间破坏）
      sounds:        break: minecraft:block.bamboo_wood.break        place: minecraft:block.bamboo_wood.place        hit: minecraft:block.bamboo_wood.hit    variants:      ground:        elements:
      - item: default:my_chair_model        hitboxes:
      - position: 0,0,0
```

```yaml
furniture:  default:my_chair:
    settings:
      item: default:my_chair      hit_times: 3
      sounds:        break: minecraft:block.bamboo_wood.break        place: minecraft:block.bamboo_wood.place        hit: minecraft:block.bamboo_wood.hit    variants:      ground:        elements:
      - item: default:my_chair_model            translation: 0,0.5,0             # 向上半格        hitboxes:
      - position: 0,0,0
      type: shulker                    # shulker = 硬碰撞箱            peek: 100            blocks_building: true            interactive: true            interaction_entity: true
      seats:
      - 0.5,0.3,0                   # 座位位置
    loot:      pools:
      - rolls: 1          entries:
      - type: furniture_item
      item: default:my_chair
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [📍 家具变体](page_configuration_furniture_variants.md)
- depends_on → [⚙️ 家具设置](page_configuration_furniture_settings.md)
- depends_on → [🕹️ 家具行为](page_configuration_furniture_behaviors.md)
- depends_on → [🎲 战利品表](page_reference_loot_table.md)
- depends_on → [🪇 事件](page_reference_events.md)
- depends_on → [🪑 家具物品](page_configuration_item_behaviors_furniture_item.md)
- depends_on → [🌊 液体碰撞家具物品](page_configuration_item_behaviors_liquid_collision_furniture_item.md)
- depends_on → [💡 发光家具](page_configuration_furniture_behaviors_glowing_furniture.md)
- depends_on → [⚖️ 条件](page_reference_conditions.md)
