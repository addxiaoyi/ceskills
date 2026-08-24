---
id: page:reference_loot_table
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/loot_table
aliases: 战利品表, reference loot table, 🎲 战利品表, 简介, ☘️ 条目, item
---

# 🎲 战利品表

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/loot_table
- 连接数：6

## 摘要

本页总览 # 🎲 战利品表 ## 简介​ 在 `loots` 配置中必须包含 `pools` 列表，每个列表代表一个战利品池。每个战利品池由四部分组成： `rolls` 决定该池的抽取次数 `conditions` 为掉落条件判定 `entries` 表示实际掉落的物品 `functions` 是后处理函数（如修改数量/NBT数据等） 信息若您熟悉原版数据包，会发现此结构与原版高度一致。插件采用该格式并加以改良，便于快速过渡至CraftEngine战利品体系。 `loot: functions: [] pools: - rolls: 1 conditions: - type: survives_explosion entries: - type: item item: "minecraft:apple" functions: []` ## ☘️ 条目​ 'entry' 用于指定实际掉落的物品，但在某些情况下也可表示多个可能掉落项中的选择。 提示所有 `entry` 配置部分均可使用 `functions` 和 `conditions` 功能。`type: itemitem: "min

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- depends_on → [🔢 物品数据](page_configuration_item_data.md)
- depends_on → [💎 掉落经验方块](page_configuration_block_behaviors_drop_experience_block.md)
