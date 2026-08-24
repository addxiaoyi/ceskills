---
id: page:advanced_model_tinting
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/advanced/model_tinting
aliases: 模型着色, advanced model tinting, 🎨 模型着色, 着色原理, 在 BlockBench 中设置 tintindex, 在 JSON 中的样子
---

# 🎨 模型着色

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/advanced/model_tinting
- 连接数：2

## 摘要

本页总览 # 🎨 模型着色 着色源在运行时给模型部件重新上色——一张灰度贴图即可产生无限颜色变体。本页重点讲如何设置模型来配合着色。 ## 着色原理​ - 你的模型给某些面标记一个 `tintindex` 编号（0、1、2……） - 在物品配置中，给每个索引绑定一个着色源 - 运行时，着色源向所有匹配该索引的面提供颜色 可着色面的贴图应为灰度。白色像素完全呈现着色颜色；黑色像素不变；灰色呈现减弱版。 ## 在 BlockBench 中设置 tintindex​ 选中你想设为可着色的元素，在 Elements 面板中为每个面设置 Tint Index。 - `-1` 或留空 → 面不被着色，贴图原样渲染 - `0` → 由第一个着色源着色 - `1` → 由第二个着色源着色 典型设置：剑刃各面设 `0`，宝石设 `1`，剑柄不设。 如何将 Tint Index 添加到 Elements 面板阅读更多默认情况下 Tint Index 字段可能不可见。以下是添加方法：阅读更多 ## 在 JSON 中的样子​ BlockBench 保存模型后，你设置的 tintindex 会出现在模型 JS

## YAML 片段

```yaml
items:  tutorial:dyeable_sword:
      material: golden_sword
    model:      path: tutorial:item/sword_blade      tints:
      - type: minecraft:dye          default: 16777215
```

## 相关页面

- depends_on → [📐 模型](page_configuration_item_models_model.md)
