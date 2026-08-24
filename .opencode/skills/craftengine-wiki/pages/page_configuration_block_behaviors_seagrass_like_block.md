---
id: page:configuration_block_behaviors_seagrass_like_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seagrass_like_block
aliases: 类海草方块, configuration block behaviors seagrass like block, 🪸 类海草方块, 示例
---

# 🪸 类海草方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seagrass_like_block
- 连接数：1

## 摘要

本页总览 # 🪸 类海草方块 类海草方块像原版海草一样永久含水。它没有 `waterlogged` 属性——方块始终处于含水状态。 - 只能放置在水中（完整的水方块）；在其他位置放置会被拒绝。 - 桶既无法从中取水，也无法向其倒水。 - 邻居方块变化时，水会从其所在位置重新流出。 注意此行为需要配合 `fluid_state: water` 使用，否则方块不会被视为水源：水不会从它流出，处于其中的实体不会被判定为在水中，破坏后留下的也是空气而不是水。 水是否会真正流出方块取决于其碰撞形状：纤细的植物（如 `auto_state: kelp`）允许水通过，而完整方块的碰撞会把水封在里面——这与原版含水树叶的规则一致。 ## 示例​ `blocks: default:water_grass: behavior: type: seagrass_like_block settings: fluid_state: water # 将此方块视为水源 states: appearances: default: auto_state: kelp # 纤细的碰撞形状——水可以流出 model: pat

## YAML 片段

```yaml
blocks:  default:water_grass:
    behavior:
      type: seagrass_like_block
    settings:      fluid_state: water      # 将此方块视为水源
    states:      appearances:        default:
      auto_state: kelp    # 纤细的碰撞形状——水可以流出
    model:            path: "minecraft:block/custom/water_grass"
```

## 相关页面

- depends_on → [🔣 方块状态](page_configuration_block_states.md)
