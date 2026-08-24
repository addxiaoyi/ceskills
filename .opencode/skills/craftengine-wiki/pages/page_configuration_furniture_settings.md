---
id: page:configuration_furniture_settings
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/settings
aliases: 家具设置, configuration furniture settings, ⚙️ 家具设置, 物品, 击打次数, 音效
---

# ⚙️ 家具设置

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture/settings
- 连接数：2

## 摘要

本页总览 # ⚙️ 家具设置 ## 物品​ 决定此家具对应的物品是什么。通常用于使用鼠标中键点击来选取物品（1.21.4+）。 `item: default:test_furniture # 默认为家具ID` ## 击打次数​ 决定玩家需要击打多少次才能破坏此家具。 如果玩家停止击打超过 2 秒，或去击打其他家具，则击打计数会重置。 `hit_times: 3 # 默认为 0，即第一次击打即刻破坏` ## 音效​ 决定家具在各种情况下的音效 - break 当玩家破坏此家具时 - place 当玩家放置此家具时 - hit 当玩家击打此家具时 `sounds: # 默认为 null break: minecraft:block.bamboo_wood.break place: minecraft:block.bamboo_wood.place hit: minecraft:block.bamboo_wood.hit` 信息你可以像这样配置以精确控制音量和音调`sounds: break: id: minecraft:block.deepslate.break pitch: 0.5 vo

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🪑 家具](page_configuration_furniture.md)
