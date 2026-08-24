---
id: page:advanced_item_model_definition
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/advanced/item_model_definition
aliases: 物品模型定义, advanced item model definition, 🎨 物品模型定义, 模型 vs. 物品模型定义, 六种模型类型, 示例 1：静态模型
---

# 🎨 物品模型定义

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/advanced/item_model_definition
- 连接数：2

## 摘要

本页总览 # 🎨 物品模型定义 入门教程里你一行代码就给物品换上了自定义贴图。现在来理解这行代码背后的系统——以及你真正能用它做什么。 ## 模型 vs. 物品模型定义​ 这两个词听起来相似，但含义不同： 模型物品模型定义是什么单个 JSON 文件——几何体、贴图、显示变换一个 JSON 文件，决定渲染哪个（哪些）模型存放在`assets//models/``assets//items/`类比一件衣服一个衣柜，根据场合挑衣服 模型是静态的东西：`block/cube_all`、`item/handheld`、你从 BlockBench 导出的文件。物品模型定义是逻辑——决定每种情况下渲染哪个模型：手持 vs. 背包 vs. 掉落在地面、受损时、蓄力时等等。 CraftEngine 物品配置中的 `model:` 字段，写的就是物品模型定义。当你写： `items: tutorial:sword: material: golden_sword texture: tutorial:item/toxic_sword` CraftEngine 生成的物品模型定义就是"始终用这一个模型"。这是

## YAML 片段

```yaml
items:  tutorial:sword:
      material: golden_sword
      texture: tutorial:item/toxic_sword
```

## 相关页面

- depends_on → [🟰 物品模型](page_configuration_item_models.md)
