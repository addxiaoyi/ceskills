---
id: page:getting_start_first_furniture
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_furniture
aliases: 第一件家具, getting start first furniture, 🪑 第一件家具, 第 1 步：给家具准备一个物品模型, 第 2 步：让物品能放置家具, 第 3 步：给家具属性
---

# 🪑 第一件家具

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_furniture
- 连接数：1

## 摘要

本页总览 # 🪑 第一件家具 方块锁网格，家具不锁。家具是 CraftEngine 基于展示实体的装饰系统，位置精确到像素。 ## 第 1 步：给家具准备一个物品模型​ 家具本身不直接指定贴图——它通过引用一个物品来显示模型。所以先做一个物品。 在 BlockBench 做一个椅子模型，导出 JSON 放到 `models/item/chair.json`，贴图也放好。然后： `items: tutorial:my_chair: material: paper model: tutorial:item/chair` `/ce item get tutorial:my_chair`——背包里出现一把椅子。现在它只是个普通物品，右键什么也不发生。 ## 第 2 步：让物品能放置家具​ `items: tutorial:my_chair: material: paper model: tutorial:item/chair behavior: type: furniture_item rules: ground: rotation: four alignment: center furni

## YAML 片段

```yaml
items:  tutorial:my_chair:
      material: paper
    model: tutorial:item/chair
```

```yaml
items:  tutorial:my_chair:
      material: paper
    model: tutorial:item/chair
    behavior:
      type: furniture_item      rules:        ground:          rotation: four          alignment: center
furniture:        variants:          ground:            elements:
      - item: tutorial:my_chair            hitboxes:
      - position: 0,0,0
      type: shulker
```

```yaml
furniture:
    settings:          hit_times: 3
      sounds:            break: minecraft:block.bamboo_wood.break            place: minecraft:block.bamboo_wood.place            hit: minecraft:block.bamboo_wood.hit        variants:          ground:            elements:
      - item: tutorial:my_chair            hitboxes:
      - position: 0,0,0
      type: shulker
```

```yaml
furniture:
    settings:          hit_times: 3
      sounds:            break: minecraft:block.bamboo_wood.break            place: minecraft:block.bamboo_wood.place            hit: minecraft:block.bamboo_wood.hit        variants:          ground:            elements:
      - item: tutorial:my_chair            hitboxes:
      - position: 0,0,0
      type: shulker                blocks_building: true                interactive: true                interaction_entity: true
      seats:
      - 0,0.5,0
    loot:          template: default:loot_table/furniture          arguments:
      item: tutorial:my_chair
```

## 相关页面

- （无）
