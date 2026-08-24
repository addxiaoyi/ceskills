---
id: page:configuration_global_variable
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/global_variable
aliases: 全局变量, configuration global variable, 🔢 全局变量, 快速入门, 配置, 使用变量
---

# 🔢 全局变量

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/global_variable
- 连接数：1

## 摘要

本页总览 # 🔢 全局变量 ## 快速入门​ 全局变量就是一段可复用的文本片段，定义一次就能在任意地方引用——物品名称、描述、消息、GUI、全息图都行。改一处，所有引用同步更新。 第一步 — 在 `global_variables` 下定义变量： `global_variables: rare_tag: "<#FF8C00>[RARE]"` 第二步 — 用 `` 标签引用： `items: default:topaz_sword: material: diamond_sword data: item_name: " 黄玉剑"` 就这么简单。`` 标签会被替换成变量的内容。 ## 配置​ 全局变量写在 `global_variables` 节点下，每项都是键值对： `global_variables: rare_tag: "<#FF8C00>[RARE]" vip_prefix: "[VIP]" coin_icon: ""` 字段说明Key变量的 ID，用于 ``。Value要替换的 MiniMessage 内容。完全支持标签、颜色、图片和其他变量。 ## 使用变量​ ### 基本用法

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
