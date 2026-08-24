---
id: page:configuration_item_behaviors_liquid_collision_furniture_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/liquid_collision_furniture_item
aliases: 液体碰撞家具物品, configuration item behaviors liquid collision furniture item, 🌊 液体碰撞家具物品
---

# 🌊 液体碰撞家具物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/liquid_collision_furniture_item
- 连接数：2

## 摘要

# 🌊 液体碰撞家具物品 与 [furniture_item](/zh-Hans/configuration/item/behaviors/furniture_item) 类似，但允许放置在液体表面。 `items: default:water_lily: behavior: type: liquid_collision_furniture_item rules: ground: rotation: four alignment: center furniture: default:water_lily ignore_placer: false # 放置时忽略放置者的碰撞 ignore_entities: false # 放置时忽略实体碰撞 source_only: true # 仅放置在液体源方块上 liquid_type: - water # - lava` 其余字段见 [furniture_item](/zh-Hans/configuration/item/behaviors/furniture_item)。

## YAML 片段

```yaml
items:  default:water_lily:
    behavior:
      type: liquid_collision_furniture_item      rules:        ground:          rotation: four          alignment: center
furniture: default:water_lily      ignore_placer: false       # 放置时忽略放置者的碰撞      ignore_entities: false     # 放置时忽略实体碰撞      source_only: true          # 仅放置在液体源方块上      liquid_type:
      - water        #
      - lava
```

## 相关页面

- depends_on → [🪑 家具物品](page_configuration_item_behaviors_furniture_item.md)
