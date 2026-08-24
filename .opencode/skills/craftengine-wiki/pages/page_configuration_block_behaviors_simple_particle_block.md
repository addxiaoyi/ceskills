---
id: page:configuration_block_behaviors_simple_particle_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/simple_particle_block
aliases: 简单粒子方块, configuration block behaviors simple particle block, ✨ 简单粒子方块, 示例
---

# ✨ 简单粒子方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/simple_particle_block
- 连接数：0

## 摘要

本页总览 # ✨ 简单粒子方块 方块实体 简单粒子方块按固定间隔生成粒子效果。每个粒子配置可自定义效果类型、位置偏移、扩散范围、数量与速度。需要特定参数的粒子类型可使用相应子选项。 ## 示例​ `blocks: default:amethyst_torch: behavior: type: simple_particle_block tick_interval: 10 # 粒子生成间隔，单位：刻（默认为 10） particles: # 具体选项见[✨ 粒子效果]页面 - particle: smoke x: 0.5 y: 0.7 z: 0.5 count: 1 offset_x: 0 offset_y: 0 offset_z: 0 speed: 0`

## YAML 片段

```yaml
blocks:  default:amethyst_torch:
    behavior:
      type: simple_particle_block      tick_interval: 10 # 粒子生成间隔，单位：刻（默认为 10）      particles:        # 具体选项见[✨ 粒子效果]页面
      - particle: smoke          x: 0.5          y: 0.7          z: 0.5          count: 1          offset_x: 0          offset_y: 0          offset_z: 0          speed: 0
```

## 相关页面

- （无）
