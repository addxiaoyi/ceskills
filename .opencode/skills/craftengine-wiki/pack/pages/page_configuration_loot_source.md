---
id: page:configuration_loot_source
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/loot_source
aliases: 战利品源, configuration loot source, 🗃️ 战利品源, 简介, 通用选项, block_break
---

# 🗃️ 战利品源

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/loot_source
- 连接数：3

## 摘要

本页总览 # 🗃️ 战利品源 ## 简介​ Minecraft 原生的战利品系统虽然功能强大，但存在一个关键限制：它无法集成插件特有的元素，例如占位符检查、权限控制或其他高级功能。此外，配置原版数据包也较为繁琐，尤其是在覆盖默认战利品表时尤为复杂。 战利品源将一张 [🎲 战利品表](/zh-Hans/reference/loot_table) 绑定到一个原版战利品事件上——破坏方块、击杀实体、钓鱼、开启宝库等等。当事件触发时，所有类型（及目标）匹配的战利品源都会被评估，并将其战利品应用到事件中。 所有战利品源都声明在 `loot_sources` 节点下。为了获得最佳效果，我们建议先阅读 [🎲 战利品表](/zh-Hans/reference/loot_table)，以全面掌握战利品表的配置方法。 提示如果你只想在不影响原版战利品的情况下额外添加一些新的战利品，请不要设置 `overwrite`（默认为 `none`），并使用 `random` 条件来控制掉落概率：`loot_sources: minecraft:zombie_bonus: type: entity_death

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- depends_on → [🎲 战利品表](page_reference_loot_table.md)
- depends_on → [⚖️ 条件](page_reference_conditions.md)
