---
id: page:reference_text_format_chain_arguments
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/text_format/chain_arguments
aliases: 链式参数, reference text format chain arguments, 🔗 链式参数, 简介, 对象, player
---

# 🔗 链式参数

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/text_format/chain_arguments
- 连接数：0

## 摘要

本页总览 # 🔗 链式参数 ## 简介​ 链式参数使用点表示法（通过 `.` 连接），以层级结构访问与对象相关的参数。 举个例子，在一个交互事件中，如果我们能够访问到玩家实例，就可以通过这个对象来获取额外的参数。 通过链式属性访问器，例如： - `player.world` → 获取玩家当前所在的世界 - `world.name` → 获取该世界的名称 我们可以将它们组合成一个参数标签格式，如 ``。这个标签将动态返回玩家当前所在世界的名称。 ## 对象​ ### player​ 参数类型描述x双精度浮点数玩家的 x 坐标y双精度浮点数玩家的 y 坐标z双精度浮点数玩家的 z 坐标pitch双精度浮点数玩家的水平旋转角度yaw双精度浮点数玩家的垂直旋转角度position[#position](#position)玩家的位置block_x整数玩家的 x 坐标block_y整数玩家的 y 坐标block_z整数玩家的 z 坐标food整数玩家的饥饿值saturation单精度浮点数玩家的饱和度name字符串玩家的名称uuid通用唯一识别码玩家的通用唯一识别码world[#world](

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
