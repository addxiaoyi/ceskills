---
id: page:configuration_equipment
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/equipment
aliases: 装备, configuration equipment, ⚔️ 装备, 简介, 解决方案1（适用于 1.21.2+ 版本）：, 解决方案2（适用于1.20+版本）：
---

# ⚔️ 装备

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/equipment
- 连接数：4

## 摘要

本页总览 # ⚔️ 装备 ## 简介​ CraftEngine 提供两种创建自定义装备的方式：基于盔甲纹饰（适用于 1.20+ 版本）或使用可装备组件（1.21.2 新增）。 注意请注意以下均为装备配置，非物品具体设定。要将这些配置应用到盔甲物品，请参考[此文档](/zh-Hans/configuration/item/settings#equipment%E8%A3%85%E5%A4%87)。`items: my:custom_helmet: settings: equipment: asset_id: my:custom_armorequipments: my:custom_armor: ...` 提示关于 3D 头盔的说明：3D 头盔的创建方法与装备完全无关。由于许多用户在创建 3D 头盔时遇到了困难，我将在此说明正确的创建方法，并澄清一些可能存在的误解。3D 头盔原理阅读更多盔甲类物品天生带有 `equippable` 组件，其中包含一个名为 `asset_id` 的选项。当指定该选项时，Minecraft 会使用硬编码渲染器来渲染指定的盔甲纹理。这意味着即使你为基于钻石头盔的

## YAML 片段

```yaml
items:  my:custom_helmet:
    settings:      equipment:        asset_id: my:custom_armorequipments:  my:custom_armor:    ...
```

```yaml
items:  default:my_3d_helmet:
      material: diamond_helmet
    data:      equippable:        slot: head
```

```yaml
items:  default:my_3d_helmet:
      material: diamond_helmet    client_bound_material: paper
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
- depends_on → [🔧 物品设置](page_configuration_item_settings.md)
