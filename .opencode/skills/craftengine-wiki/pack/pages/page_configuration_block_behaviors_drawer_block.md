---
id: page:configuration_block_behaviors_drawer_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/drawer_block
aliases: 抽屉方块, configuration block behaviors drawer block, 🗄️ 抽屉方块, 属性, 示例
---

# 🗄️ 抽屉方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/drawer_block
- 连接数：0

## 摘要

本页总览 # 🗄️ 抽屉方块 方块实体 抽屉方块是一种存储容器，只能存放一种物品，但能大量存储该物品。它会记住首次存入的物品类型，此后只接受相同物品。 - 右键点击：放入手中物品 - 右键双击（0.5 秒内）：将物品栏中的所有相同物品全部放入 - 左键点击：取出一个物品 - 潜行 + 左键点击：取出一组物品 ## 属性​ 若配置了 `facing` 属性可让抽屉朝向特定方向，以便展示的物品模型能够随朝向旋转。 属性名称属性类型是否必需facingdirection否 ## 示例​ `blocks: default:drawer_block: behavior: type: drawer_block max_stacks: 20 # 抽屉最多可容纳的物品组数（默认为 32） has_signal: true # 是否允许比较器根据容器填充比例输出对应信号（默认为 true） allow_input: true # 是否允许漏斗放入物品（默认为 true） allow_output: true # 是否允许漏斗取出物品（默认为 true） item_position: 0,0,-0.52

## YAML 片段

```yaml
blocks:  default:drawer_block:
    behavior:
      type: drawer_block      max_stacks: 20                    # 抽屉最多可容纳的物品组数（默认为 32）      has_signal: true                  # 是否允许比较器根据容器填充比例输出对应信号（默认为 true）      allow_input: true                 # 是否允许漏斗放入物品（默认为 true）      allow_output: true                # 是否允许漏斗取出物品（默认为 true）      item_position: 0,0,-0.52          # 展示物品的位置偏移（默认为 0.5,0.5,0.5）      text_position: 0,-0.4,-0.52       # 数量文本的位置偏移（默认为 0.5,0.5,0.5）      item_scale: 0.6,0.6,0.6           # 展示物品的缩放（默认为 0.5,0.5,0.5）      text_scale: 0.5,0.5,0.5           # 数量文本的缩放（默认为 0.5,0.5,0.5）      data_key: "craftengine:drawer"    # 持久化抽屉数据的 NBT 键（默认为 "craftengine:drawer"）      compatible_mode: false            # 与其他存储插件的兼容模式（默认为 false）
      sounds:        put: minecraft:block.decorated_pot.insert       # 放入物品的音效（可选）        take: minecraft:block.decorated_pot.insert_fail  # 取出物品的音效（可选）
```

## 相关页面

- （无）
