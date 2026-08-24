---
id: page:configuration_block_behaviors_leaves_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/leaves_block
aliases: 树叶方块, configuration block behaviors leaves block, 🍁 树叶方块, 示例
---

# 🍁 树叶方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/leaves_block
- 连接数：0

## 摘要

本页总览 # 🍁 树叶方块 树叶方块会在[PP更新](https://zh.minecraft.wiki/w/%E6%96%B9%E5%9D%97%E6%9B%B4%E6%96%B0#PP%E6%9B%B4%E6%96%B0)中计算其到最近原木的距离并作为 `distance` 的值（原木为 0，直接相邻的树叶为 1，以此类推）。 达到最大距离（`distance` 属性的 `range` 中的最大值）的树叶会在接收到一个随机刻时会枯萎并掉落物品。 当 `persistent` 为 `true` 时树叶不参与距离计算，无论距离多远都不会枯萎。 属性名称属性类型是否必需distanceint是persistentboolean是waterloggedboolean否 ## 示例​ `blocks: default:palm_leaves: behavior: type: leaves_block` 提示对于较大的树木，可将 `distance` 属性的 `range` 设高一些——例如 `1~10` 这样树叶距离原木 10 格才会枯萎。原版树叶最大距离为 7。

## YAML 片段

```yaml
blocks:  default:palm_leaves:
    behavior:
      type: leaves_block
```

## 相关页面

- （无）
