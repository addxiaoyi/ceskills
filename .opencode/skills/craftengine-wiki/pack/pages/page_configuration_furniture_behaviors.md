---
id: page:configuration_furniture_behaviors
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors
aliases: 家具行为, configuration furniture behaviors, 🕹️ 家具行为, 简介, 指定行为, 复合行为
---

# 🕹️ 家具行为

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors
- 连接数：4

## 摘要

本页总览 # 🕹️ 家具行为 ## 简介​ 行为让家具拥有真正的用途——可以打开存储界面、展示物品、发光。如果没有任何行为，家具只具备放置、破坏和乘坐等基础功能。 每个行为之间是独立的。可以单独使用一个，也可以将多个行为组合在同一家具上。它们会在家具存在期间自动运行，不需要任何额外的手动配置。 ## 指定行为​ 通过家具的 `behavior` 或 `behaviors` 选项来指定行为： `furniture: default:my_furniture: behavior: type: simple_storage_furniture title: "我的箱子" # 容器标题，支持 MiniMessage（默认为 ""） rows: 3 # 行数，1~6（默认为 1） sounds: open: minecraft:block.iron_trapdoor.open close: minecraft:block.iron_trapdoor.close` ## 复合行为​ 在 `behavior` 或 `behaviors` 下列出多个行为，即可将它们组合成一个复合家具行为。下面的例子

## YAML 片段

```yaml
furniture:  default:my_furniture:
    behavior:
      type: simple_storage_furniture      title: "我的箱子"                   # 容器标题，支持 MiniMessage（默认为 ""）      rows: 3                            # 行数，1~6（默认为 1）
      sounds:        open: minecraft:block.iron_trapdoor.open        close: minecraft:block.iron_trapdoor.close
```

```yaml
furniture:  default:lit_cabinet:
    behaviors:
      - type: simple_storage_furniture        title: "灯柜"        rows: 2
      sounds:          open: minecraft:block.barrel.open          close: minecraft:block.barrel.close
      - type: glowing_furniture        lights:
      - 0,0.5,0 15                      # 简写: "x,y,z 光照等级"
```

## 相关页面

- requires → [🪑 家具](page_configuration_furniture.md)
- depends_on → [📦 简单存储家具](page_configuration_furniture_behaviors_simple_storage_furniture.md)
- depends_on → [💡 发光家具](page_configuration_furniture_behaviors_glowing_furniture.md)
