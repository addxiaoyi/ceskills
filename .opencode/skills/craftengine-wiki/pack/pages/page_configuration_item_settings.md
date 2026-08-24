---
id: page:configuration_item_settings
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/settings
aliases: 物品设置, configuration item settings, 🔧 物品设置, 简介, 类型, fuel_time（烧炼时间）
---

# 🔧 物品设置

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/settings
- 连接数：7

## 摘要

本页总览 # 🔧 物品设置 ## 简介​ 与 data 不同，settings 中的内容涉及由插件处理的特殊机制。 ## 类型​ ### fuel_time（烧炼时间）​ 控制物品可燃烧的时间（或称燃料热值）。 `fuel_time: 100 # 单位：刻` ### break_power（破坏力）​ 决定了此物品作为工具时的破坏力。带有 [`required_break_power`](/zh-Hans/configuration/block/settings#%E6%89%80%E9%9C%80%E7%A0%B4%E5%9D%8F%E5%8A%9B) 的方块只能被破坏力大于或等于需求值的工具有效挖掘。（默认值：继承物品原版材质的破坏力） `break_power: 3` 信息原版工具的破坏力是写死的：木/金 = 1、石/铜 = 2、铁 = 3、钻石 = 4、下界合金 = 5，其余物品 = 0。你可以在 config.yml 中通过 `item.break-power` 覆写。 ### tags（标签）​ 标签可以在用命令测试物品时以 `#<命名空间ID>` 的形式调用。也可以在配

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🗡️ 物品](page_configuration_item.md)
- depends_on → [🔧 方块设置](page_configuration_block_settings.md)
- depends_on → [⚔️ 装备](page_configuration_equipment.md)
