---
id: page:configuration_category
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/category
aliases: 分类, configuration category, 📂 分类, 快速入门, 配置, 列出成员
---

# 📂 分类

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/category
- 连接数：3

## 摘要

本页总览 # 📂 分类 ## 快速入门​ 分类用于在 `/ce` 物品浏览器中组织物品。定义一个分类、列出它的成员，它就会出现在菜单里。 第一步 — 在 `categories` 下创建分类： `categories: default:palm_tree: name: "棕榈树" icon: default:palm_log list: - default:palm_sapling - default:palm_leaves - default:palm_log - default:palm_planks` 第二步 — 在游戏内用 `/ce menu` 打开浏览器，分类会显示为一个图标，点击即可浏览其中的物品。 ## 配置​ 分类配置写在 `categories` 节点下，每个分类以 `命名空间:id` 作为唯一标识。 `categories: default:palm_tree: name: "" lore: [] hidden: false priority: 1 icon: default:palm_log conditions: - type: permission perm

## YAML 片段

```yaml
items:  default:topaz_sword:
      material: golden_sword    category: default:topaz
```

```yaml
items:  default:topaz_sword:
      material: golden_sword    category:
      - default:swords
      - default:topaz_gear
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [⚖️ 条件](page_reference_conditions.md)
