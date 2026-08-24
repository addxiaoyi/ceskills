---
id: page:getting_start_first_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_block
aliases: 第一个方块, getting start first block, 🧱 第一个方块, 第 1 步：最简方块, 刚才写的是什么, 第 2 步：让它像真方块——有硬度、有声音
---

# 🧱 第一个方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/first_block
- 连接数：1

## 摘要

本页总览 # 🧱 第一个方块 现在做一个能放进世界的方块。 ## 第 1 步：最简方块​ [⬇ 下载黄玉方块贴图](/zh-Hans/assets/files/topaz_block-711341d9638235c3c99751f8a9e1c8b6.png)，放到： `resourcepack/assets/tutorial/textures/block/topaz_block.png` `items: tutorial:topaz_block: material: paper behavior: type: block_item block: state: auto_state: note_block texture: tutorial:block/topaz_block` `/ce reload all/ce item get tutorial:topaz_block` 右键地面——方块出现了。 ### 刚才写的是什么​ 先看最外层。这个条目写在 `items:` 下——和之前做物品一样。多出来的就是 `behavior`： - `type: block_item` — 告诉 C

## YAML 片段

```yaml
items:  tutorial:topaz_block:
      material: paper
    behavior:
      type: block_item
      block:
    state:
      auto_state: note_block
      texture: tutorial:block/topaz_block
```

```yaml
items:  tutorial:topaz_block:
      material: paper
    behavior:
      type: block_item
      block:
    state:
      auto_state: note_block
      texture: tutorial:block/topaz_block
    settings:
      hardness: 4.5
      sounds:            break: minecraft:block.stone.break            step: minecraft:block.stone.step            place: minecraft:block.stone.place            hit: minecraft:block.stone.hit            fall: minecraft:block.stone.fall
      tags:
      - minecraft:mineable/pickaxe
```

```yaml
    state:
      auto_state: note_block
      texture: tutorial:block/topaz_block
```

```yaml
    state:
      auto_state: note_block
    model:    path: tutorial:block/topaz_block      # 多张时必须指定    textures:
      - tutorial:block/topaz_block_top    # 顶面
      - tutorial:block/topaz_block_side   # 侧面
```

## 相关页面

- （无）
