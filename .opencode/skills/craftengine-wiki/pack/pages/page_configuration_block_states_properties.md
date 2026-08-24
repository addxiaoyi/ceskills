---
id: page:configuration_block_states_properties
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states/properties
aliases: 属性, configuration block states properties, ℹ️ 属性, 类型, boolean, int
---

# ℹ️ 属性

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states/properties
- 连接数：4

## 摘要

本页总览 # ℹ️ 属性 ## 类型​ 提示`default` 选项是可选的。 ### boolean​ `boolean` 类型的属性只有两种可能的值：`true` 或 `false`。 `properties: happy: type: boolean default: false` ### int​ `int` 类型的属性可以取指定范围内的任何整数值。 `properties: mode: type: int default: 1 range: 1~3` ### string​ `string` 类型的属性只能从预定义的选项集合中取值。 `properties: color: type: string default: red values: - red - green - blue` ### direction​ `east, south, west, north, up, down` `properties: facing: type: direction default: north values: # 可选 - north - east - south - west -

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🔣 方块状态](page_configuration_block_states.md)
