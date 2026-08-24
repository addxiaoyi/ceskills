---
id: page:getting_start_item_models
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/item_models
aliases: 物品模型, getting start item models, 🎨 物品模型, 模型和贴图放哪, 准备贴图, 方式一：texture 一行搞定
---

# 🎨 物品模型

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/item_models
- 连接数：3

## 摘要

本页总览 # 🎨 物品模型 上一章的物品能用了，但长得和原版一样。这章给它换外观。 CraftEngine 提供了三种配置模型的方式，从简到繁： 方式写法什么时候用简化纹理`texture: 路径`只有一张贴图，让插件自动搞定一切自动生成`model:` + `generation:`需要指定 parent、多个贴图层、display 变换外部模型`model: 路径`已有现成的模型 JSON 文件 ⚠️ 这章要改资源包文件（贴图/模型）。改完跑 `/ce reload all`，不是 `config`。 只跑 `config` 贴图变更不生效——这是整个教程被问最多的问题。 ## 模型和贴图放哪​ 包的 `resourcepack/` 结构和原版资源包一样： resourcepack/assets/tutorialmodelstextures 引用时 `models/` 和 `textures/` 前缀省略：`tutorial:item/toxic_sword` 在模型上下文里解析为 `models/item/toxic_sword.json`，在贴图上下文里解析为 `textur

## YAML 片段

```yaml
items:  tutorial:toxic_sword:
      material: golden_sword
    data:      item_name: "<#3CB371>剧毒之剑"
      texture: tutorial:item/toxic_sword
```

```yaml
items:  tutorial:toxic_sword:
      material: golden_sword
    data:      item_name: "<#3CB371>剧毒之剑"
    model:      path: tutorial:item/toxic_sword      generation:        parent: minecraft:item/handheld        textures:          layer0: tutorial:item/toxic_sword
```

```yaml
# 弓——4 个槽位items:  tutorial:my_bow:
      material: bow    textures:
      - tutorial:item/bow              # 待机
      - tutorial:item/bow_pulling_0    # 刚开始拉弓
      - tutorial:item/bow_pulling_1    # 拉至中途
      - tutorial:item/bow_pulling_2    # 完全拉满
```

```yaml
items:  tutorial:toxic_sword:
      material: golden_sword
    data:      item_name: "<#3CB371>剧毒之剑"
    model: tutorial:item/toxic_sword
```

## 相关页面

- depends_on → [🟰 物品模型](page_configuration_item_models.md)
- depends_on → [🗂️ 认识项目](page_getting_start_project_structure.md)
