---
id: page:configuration_item_updater
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/updater
aliases: 物品更新器, configuration item updater, 🔄 物品更新器, 工作原理, 配置更新器, 更新器类型
---

# 🔄 物品更新器

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/updater
- 连接数：3

## 摘要

本页总览 # 🔄 物品更新器 物品更新器用于在配置变更后修补玩家背包中已存在的物品。与 `client_bound_data` 只改外观不同，更新器直接修改物品在服务端的实际数据。 ## 工作原理​ 每个物品携带一个内部版本标记（`craftengine:version`，默认 `0`）。当触发器事件发生时，插件读取物品的当前版本，重放 `updater` 配置中所有高于当前版本的步骤，然后将物品标记为最新版本。 `旧物品（版本 0）被拾取 → 执行版本 1、2 的更新步骤 → 物品版本升至 2 → 不再需要更新` 新物品完全跳过更新器。 它们直接由 `data` 节点构建，并预先打上最新版本标记。这意味着：每次添加 updater 步骤时，必须同步更新 `data` 以匹配最终期望的状态。 ## 配置更新器​ 黄金法则：`data` 构建新物品，`updater` 修补旧物品，两者必须一致。 `items: default:my_sword: material: stone_sword # ← 新物品从这里开始 data: item_name: 石剑 lore: - "最终描述"

## YAML 片段

```yaml
items:  default:my_sword:
      material: stone_sword              # ← 新物品从这里开始
    data:      item_name: 石剑      lore:
      - "最终描述"    updater:      1:
      type: apply_data
    data:          item_name: 石剑               # 旧物品：改名      2:
      - type: apply_data
    data:            lore:
      - "最终描述"               # 旧物品：加描述
      - type: transmute
      material: stone_sword          # 旧物品：换材质
```

## 相关页面

- requires → [🗡️ 物品](page_configuration_item.md)
- depends_on → [🔢 物品数据](page_configuration_item_data.md)
