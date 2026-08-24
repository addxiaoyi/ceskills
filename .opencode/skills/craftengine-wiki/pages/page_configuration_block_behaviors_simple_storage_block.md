---
id: page:configuration_block_behaviors_simple_storage_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/simple_storage_block
aliases: 简单存储方块, configuration block behaviors simple storage block, 📦 简单存储方块, 示例
---

# 📦 简单存储方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/simple_storage_block
- 连接数：0

## 摘要

本页总览 # 📦 简单存储方块 方块实体 简单存储方块是类似箱子的容器，可自定义行数。右键可打开容器界面以存储物品。比较器可检测该容器，并根据其填充程度输出 0–15 的红石信号。 可选的 `open` 属性用于反映容器的开关状态——适合在方块模型中显示打开或关闭的视觉效果。 属性名称属性类型是否必需openboolean否 ## 示例​ `blocks: default:safe_block: behavior: type: simple_storage_block title: "保险柜" # 容器标题，支持 MiniMessage 格式（默认为 ""） rows: 1 # 行数，1~6（默认为 1） has_signal: true # 根据填充比例输出比较器信号（默认为 true） allow_input: true # 允许放入物品（默认为 true） allow_output: true # 允许取出物品（默认为 true） data_key: "craftengine:simple_storage" # 持久化数据的 NBT 键（默认为 "craftengine:sim

## YAML 片段

```yaml
blocks:  default:safe_block:
    behavior:
      type: simple_storage_block      title: "保险柜"                           # 容器标题，支持 MiniMessage 格式（默认为 ""）      rows: 1                                  # 行数，1~6（默认为 1）      has_signal: true                         # 根据填充比例输出比较器信号（默认为 true）      allow_input: true                        # 允许放入物品（默认为 true）      allow_output: true                       # 允许取出物品（默认为 true）      data_key: "craftengine:simple_storage"   # 持久化数据的 NBT 键（默认为 "craftengine:simple_storage"）
      sounds:        open: minecraft:block.iron_trapdoor.open     # 容器打开时播放的音效（可选）        close: minecraft:block.iron_trapdoor.close   # 容器关闭时播放的音效（可选）
```

## 相关页面

- （无）
