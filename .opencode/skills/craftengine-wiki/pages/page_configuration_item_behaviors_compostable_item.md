---
id: page:configuration_item_behaviors_compostable_item
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/compostable_item
aliases: 可堆肥物品, configuration item behaviors compostable item, 🪹 可堆肥物品
---

# 🪹 可堆肥物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/compostable_item
- 连接数：1

## 摘要

# 🪹 可堆肥物品 让不可堆肥的物品变为可堆肥。 `items: default:ender_pearl_flower_seeds: behavior: type: compostable_item chance: 0.5 # 增加堆肥等级的概率` 警告此行为对漏斗无效。Minecraft 的堆肥系统是硬编码的——只有原版可堆肥物品才能在漏斗中正常工作。替代方案：使用原版可堆肥物品作为基础材质，然后通过 [⚙️ 物品设置](/zh-Hans/configuration/item/settings) 调整堆肥概率。

## YAML 片段

```yaml
items:  default:ender_pearl_flower_seeds:
    behavior:
      type: compostable_item      chance: 0.5                # 增加堆肥等级的概率
```

## 相关页面

- depends_on → [🔧 物品设置](page_configuration_item_settings.md)
