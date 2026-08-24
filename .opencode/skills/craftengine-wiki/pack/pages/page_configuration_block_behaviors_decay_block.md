---
id: page:configuration_block_behaviors_decay_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/decay_block
aliases: 衰变方块, configuration block behaviors decay block, 🍂 衰变方块, 示例
---

# 🍂 衰变方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/decay_block
- 连接数：1

## 摘要

本页总览 # 🍂 衰变方块 衰变方块会随着时间的流逝的逐步增加 `age`，直到到达最大值时转变为另一种方块——例如冰融化为水。 它有两种工作模式： - 计划刻（`delay` > 0 或为[🔢 数字格式](/zh-Hans/reference/number_format)）：由 `delay` 选项自定义计划任务触发，检查光照等级与 `chance`，若通过则增加 `age`，并重新请求一个计划任务。当 `age` 达到最大值时，方块变为 `decay_into`。 - 随机刻（`delay` 未设置或 ≤ 0）：由[随机刻速率](https://zh.minecraft.wiki/w/%E6%B8%B8%E6%88%8F%E8%A7%84%E5%88%99/random_tick_speed)控制触发，检查光照等级与 `chance`，若通过则增加 `age`。当 `age` 达到最大值时，方块变为 `decay_into`。 若 `required_light` 选项大于 0，则仅在方块自身或周围光照达到阈值时才会衰变。 属性名称属性类型是否必需ageint是 ## 示例​

## YAML 片段

```yaml
blocks:  default:ice:
    behavior:
      type: decay_block      decay_into: water          # 完全衰变后变成的方块（默认为 air）      delay: 100~200             # 每次增加 age 的间隔（刻），省略则使用随机刻模式（可选）      chance: 0.5                # 每次间隔增加的概率（默认为 1）      required_light: 0          # 衰变所需最低光照，0 = 始终衰变（默认为 0）
```

## 相关页面

- depends_on → [🔢 数字格式](page_reference_number_format.md)
