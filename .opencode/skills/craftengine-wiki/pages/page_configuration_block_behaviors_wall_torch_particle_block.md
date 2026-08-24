---
id: page:configuration_block_behaviors_wall_torch_particle_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/wall_torch_particle_block
aliases: 墙上火把粒子方块, configuration block behaviors wall torch particle block, ✨ 墙上火把粒子方块, 示例
---

# ✨ 墙上火把粒子方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/wall_torch_particle_block
- 连接数：0

## 摘要

本页总览 # ✨ 墙上火把粒子方块 方块实体 墙上火把粒子方块按固定间隔生成粒子效果，类似原版的墙上的火把。`facing` 属性用于确定粒子相对于方块的位置，并随方块朝向自动旋转。 属性名称属性类型是否必需facingdirection是 ## 示例​ `blocks: default:amethyst_wall_torch: behavior: type: wall_torch_particle_block tick_interval: 10 # 粒子生成间隔，单位：刻（默认为 10） particles: # 具体选项见[✨ 粒子效果]页面 - particle: smoke x: 0.5 y: 0.7 z: 0.5 count: 1 offset_x: 0 offset_y: 0 offset_z: 0 speed: 0`

## YAML 片段

```yaml
blocks:  default:amethyst_wall_torch:
    behavior:
      type: wall_torch_particle_block      tick_interval: 10 # 粒子生成间隔，单位：刻（默认为 10）      particles:        # 具体选项见[✨ 粒子效果]页面
      - particle: smoke          x: 0.5          y: 0.7          z: 0.5          count: 1          offset_x: 0          offset_y: 0          offset_z: 0          speed: 0
```

## 相关页面

- （无）
