---
id: page:configuration_item_models_model
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/model
aliases: 模型, configuration item models model, 📐 模型, 概述, 字段, Blueprint（Blockbench） 实验性
---

# 📐 模型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/models/model
- 连接数：5

## 摘要

本页总览 # 📐 模型 ## 概述​ 指定游戏使用哪一个物品模型进行渲染，并且指定各个着色索引使用的颜色。`type` 默认为 `minecraft:model`。 `items: demo:sword: material: diamond_sword model: path: minecraft:item/custom/sword` ## 字段​ 字段类型必需默认值说明`type`string否`minecraft:model`模型类型标识`path`资源路径是*—模型 JSON 的命名空间路径（如 `demo:item/sword`）。*设置 `blueprint` 时可选——此时作为生成模型的输出路径`generation`object否—从父模板自动生成模型 JSON`blueprint`string否—用于转换为模型 JSON 的 Blockbench `.bbmodel` 文件`tints`list否—指定各个着色索引使用的颜色提供器，数组下标对应着色索引`transformation`object否—物品模型变换（26.1+） ## Blueprint（Blockben

## YAML 片段

```yaml
items:  demo:sword:
      material: diamond_sword
    model:      path: minecraft:item/custom/sword
```

```yaml
items:  demo:rocket:
      material: paper
    model:      blueprint: rocket          # <资源文件夹>/blueprint/rocket.bbmodel
```

```yaml
items:  demo:rocket:
      material: paper
    model:      path: demo:furniture/rocket_v2    # → assets/demo/models/furniture/rocket_v2.json      blueprint: rocket
```

```yaml
items:  demo:sword:
      material: diamond_sword
    model:      path: demo:item/sword      generation:        parent: minecraft:item/handheld        textures:          layer0: demo:item/sword          layer1: demo:item/sword_glow        display:          thirdperson_righthand:            rotation: 0,0,0            translation: 0,1,1            scale: 0.85,0.85,0.85        gui_light: front
```

## 相关页面

- requires → [🟰 物品模型](page_configuration_item_models.md)
