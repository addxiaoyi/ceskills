---
id: page:configuration
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration
aliases: 配置, configuration, ⚙️ 配置, 简介, 高级技巧, 区块标识符
---

# ⚙️ 配置

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration
- 连接数：14

## 摘要

本页总览 # ⚙️ 配置 ## 简介​ 这里的配置特指每个包下 resources 目录中的 configuration 文件夹。配置文件存储在该文件夹中，并且支持 JSON 和 YML 格式。你可以在 configuration 文件夹中创建任意数量的子目录。 ## 高级技巧​ ### 区块标识符​ CraftEngine 引入了此功能，以解决 YAML 配置中的一些痛点——特别是在单个文件中需要定义多个相同类型的配置时。在 YAML 配置中，以下格式是不允许的： `items: default:topaz_helmet: template: default:topaz_armor arguments: part: helmet slot: headblocks: default:topaz_ore: ...更多内容items: default:topaz_boots: template: default:topaz_armor arguments: part: boots slot: feet` 因此，你需要在配置区块名称后面添加 `# + 任意标识符`，这让你能够在单个 YAML

## YAML 片段

```yaml
items:  default:topaz_trident:
      material: trident    client_bound_material:      $$1.20.1~1.21.1: bow      $$1.21.2~1.21.3: honey_bottle      $$fallback: xxx
    data:      item_name: <#FF8C00>      components:        minecraft:max_damage: 300
```

```yaml
items:  default:topaz_trident:
      material: trident
    data:      item_name: <#FF8C00>      components:        minecraft:max_damage: 300    $$>=1.21.2:      client_bound_data:        components:          minecraft:consumable:            consume_seconds: 128000            animation: spear
```

## 相关页面

- （无）
