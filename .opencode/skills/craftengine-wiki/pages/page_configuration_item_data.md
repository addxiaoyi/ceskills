---
id: page:configuration_item_data
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/data
aliases: 物品数据, configuration item data, 🔢 物品数据, 概述, 🎨 外观, item_name（物品名称）
---

# 🔢 物品数据

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/data
- 连接数：7

## 摘要

本页总览 # 🔢 物品数据 ## 概述​ `data` 设置物品堆叠上的数据组件——名称、lore、属性、附魔、食物属性等模型和行为之外的一切。`data` 下的大多数键直接映射到[原版数据组件](https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6)，CraftEngine 自动处理跨版本转换。 提示在数据键后追加 `#` 即可多次应用同一个处理器。`#id` 部分在解析时被去除，仅用于让键名唯一：`data: insert_lore#1: position: TAIL lore: - "第一次插入" insert_lore#2: position: HEAD lore: - "第二次插入"`适用于任何数据键：`attribute_modifiers#main`、`attribute_modifiers#bonus`、`lore#static`、`lore#conditional` 等。 ## 🎨 外观​ ### item_name（物品名称）​ 物品的默认名称，默认存在于所有物品上。与 `custom_

## YAML 片段

```yaml
items:  demo:sword:
    data:      item_name: "<#FF8C00>Topaz Sword"
```

```yaml
items:  demo:sword:
    data:      custom_name: "<#FF8C00>Topaz Sword"
```

```yaml
items:  demo:sword:
    data:      lore:
      - "好闪亮的剑！"
```

```yaml
items:  demo:sword:
    data:      insert_lore:        position: AFTER          # HEAD | TAIL | BEFORE | AFTER        pattern: "匹配此行"       # BEFORE/AFTER 时使用的正则        lore:
      - content: "插入的行"        fallback:                # 可选——未匹配时的回落操作          position: TAIL          lore:
      - content: "回落行"
```

## 相关页面

- requires → [🗡️ 物品](page_configuration_item.md)
- depends_on → [🟰 物品模型](page_configuration_item_models.md)
- depends_on → [🔢 数字格式](page_reference_number_format.md)
- depends_on → [📦️ 外部物品来源](page_compatibility_external_item_sources.md)
