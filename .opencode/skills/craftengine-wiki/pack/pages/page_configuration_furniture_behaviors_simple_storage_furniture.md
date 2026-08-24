---
id: page:configuration_furniture_behaviors_simple_storage_furniture
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors/simple_storage_furniture
aliases: 简单存储家具, configuration furniture behaviors simple storage furniture, 📦 简单存储家具, 示例, 按变体配置交互碰撞箱
---

# 📦 简单存储家具

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/behaviors/simple_storage_furniture
- 连接数：1

## 摘要

本页总览 # 📦 简单存储家具 简单存储家具为家具添加一个类似箱子的功能。右键打开容器，玩家可以放入或者取出物品。 ## 示例​ `furniture: default:storage_core: behavior: type: simple_storage_furniture title: "Storage Core" # 容器标题，支持 MiniMessage 格式（默认为 ""） rows: 3 # 行数，1~6（默认为 1） data_key: "craftengine:simple_storage_contents" # 持久化数据的 NBT 键（默认为 "craftengine:simple_storage_contents"） sounds: open: minecraft:block.iron_trapdoor.open # 容器打开时播放的音效（可选） close: minecraft:block.iron_trapdoor.close # 容器关闭时播放的音效（可选）` ## 按变体配置交互碰撞箱​ 你可以通过 `variants.<变体名>.hitboxes`

## YAML 片段

```yaml
furniture:  default:storage_core:
    behavior:
      type: simple_storage_furniture      title: "Storage Core"                 # 容器标题，支持 MiniMessage 格式（默认为 ""）      rows: 3                                          # 行数，1~6（默认为 1）      data_key: "craftengine:simple_storage_contents"  # 持久化数据的 NBT 键（默认为 "craftengine:simple_storage_contents"）
      sounds:        open: minecraft:block.iron_trapdoor.open       # 容器打开时播放的音效（可选）        close: minecraft:block.iron_trapdoor.close     # 容器关闭时播放的音效（可选）
```

```yaml
furniture:  default:double_drawer:
    settings:
      item: default:double_drawer    variants:      ground:        elements:
      - item: default:double_drawer        hitboxes: []                          # 家具默认没有碰撞箱
    behavior:                                 # 家具 behavior 列表
      - type: simple_storage_furniture        title: "Left Drawer"        data_key: "left_drawer"        rows: 2        variants:          ground:            hitboxes:
      - type: interaction                position: -0.25,0.5,0                width: 0.5                height: 1                interactive: true
      - type: simple_storage_furniture        title: "Right Drawer"        data_key: "right_drawer"        rows: 2        variants:          ground:            hitboxes:
      - type: interaction                position: 0.25,0.5,0                width: 0.5                height: 1                interactive: true
```

## 相关页面

- （无）
