---
id: page:configuration_block_states
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states
aliases: 方块状态, configuration block states, 🔣 方块状态, 简介, 单状态方块, 视觉状态
---

# 🔣 方块状态

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states
- 连接数：7

## 摘要

本页总览 # 🔣 方块状态 ## 简介​ 在 Minecraft 中，每个方块都可以拥有一个或多个方块状态。例如，原木有不同朝向（`axis=x/y/z`），树叶可以检测与树木的“距离”（`distance=1~7`）。这些状态共同决定了方块在游戏中的外观和物理行为。 在 CraftEngine 中，我们需要区分两个核心概念： #### 视觉方块状态（客户端看到的）​ 这是玩家在客户端实际看到的方块状态，因此也叫原版方块状态。 - 插件通过为特定的原版方块状态（例如某个音符盒）覆盖自定义模型，来实现各种独特的方块渲染 - 简而言之：视觉状态 = 看起来是什么样子 #### 内部方块状态（服务端计算的）​ 这是在服务端真正被存储和运算的方块状态，因此也叫服务端方块状态。 - 它负责处理方块的逻辑与物理行为——碰撞箱、红石信号、实体交互等 - 服务器将内部状态通过特定的网络协议，映射成一个视觉状态，再发送给客户端渲染 - 简而言之：内部状态 = 实际如何运作 `state` 或 `states` 配置部分只做一件事：为每个内部方块状态指定它在客户端显示的视觉方块状态。 根据方块的复杂度，

## YAML 片段

```yaml
    state:
      auto_state: note_block
    model:    path: "minecraft:block/custom/my_block"
```

```yaml
# 简单形式 — 各自分配不同的视觉状态auto_state: solid# 展开形式 — 相同 id 的外观共用同一个视觉状态auto_state:
      type: solid  id: "my_shared_id"
```

```yaml
    state:
      auto_state: note_block  blueprint: "rocket"                     # <资源文件夹>/blueprint/rocket.bbmodel
    model: "minecraft:block/custom/rocket"         # 可选：生成模型的输出路径
```

```yaml
    state:
      auto_state:                            # 多个自定义方块共享同一个被清空模型的原版方块状态
      type: sugar_cane    id: transparent  transparent: true                      # 清空原版方块状态自身的模型  entity_renderer:                       # 通过实体来渲染方块
      type: item_display
      item: default:my_decoration
```

## 相关页面

- requires → [🧱 方块](page_configuration_block.md)
- depends_on → [🫑 方块实体渲染器](page_configuration_block_states_entity_renderer.md)
- depends_on → [ℹ️ 属性](page_configuration_block_states_properties.md)
