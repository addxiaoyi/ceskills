---
id: page:configuration_block_behaviors_surface_spreading_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/surface_spreading_block
aliases: 表面扩散方块, configuration block behaviors surface spreading block, 🌿 表面扩散方块, 属性, 示例
---

# 🌿 表面扩散方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/surface_spreading_block
- 连接数：0

## 摘要

本页总览 # 🌿 表面扩散方块 表面扩散方块会随时间向相邻方块扩散，就像原版草在泥土上蔓延一样。每个随机刻它会尝试把附近的 `base_block` 转化为自身——而如果它所在的位置已无法存活（光照被遮挡或上方有水），就会退化回 `base_block`。 只有当目标方块上方光照在配置范围内且无水时，才会向其扩散。 ## 属性​ 属性名称属性类型是否必需作用snowyboolean否记录顶部是否有雪，用于切换到覆雪状态 备注`snowy` 为可选属性。若声明，当顶部有雪时方块会自动将其置为 `true`——便于切换到覆雪的材质，类似原版草方块。 ## 示例​ `blocks: default:grass_block: behavior: type: surface_spreading_block light_requirement: 9 # 扩散所需的最低光照（默认为 0） max_light_requirement: 15 # 扩散所需的最高光照（默认为 15） base_block: minecraft:dirt # 本方块向其扩散、且无法存活时退化成的方块（默认为 minecr

## YAML 片段

```yaml
blocks:  default:grass_block:
    behavior:
      type: surface_spreading_block      light_requirement: 9          # 扩散所需的最低光照（默认为 0）      max_light_requirement: 15     # 扩散所需的最高光照（默认为 15）      base_block: minecraft:dirt    # 本方块向其扩散、且无法存活时退化成的方块（默认为 minecraft:dirt）
```

## 相关页面

- （无）
