---
id: page:reference_particle_effect
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/particle_effect
aliases: 粒子效果, reference particle effect, ✨ 粒子效果, 简介, 通用参数, 特殊选项
---

# ✨ 粒子效果

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/particle_effect
- 连接数：1

## 摘要

本页总览 # ✨ 粒子效果 ## 简介​ CraftEngine 支持通过配置生成粒子效果。不同粒子类型除了通用参数外，可能还需要指定额外的特殊选项。 ## 通用参数​ 必填： `particle: minecraft:end_rod # 粒子类型; 字符串; 粒子 ID` 可选： `x: 0 # 生成位置相对 X轴偏移; 数字; 默认为 0y: 0 # 生成位置相对 Y轴偏移; 数字; 默认为 0z: 0 # 生成位置相对 Z 轴偏移; 数字; 默认为 0count: 5 # 每次生成的粒子数量; 整数; 默认为 1offset_x: 0.3 # X 方向随机扩散范围; 数字; 默认为 0offset_y: 0.3 # Y 方向随机扩散范围; 数字; 默认为 0offset_z: 0.3 # Z 方向随机扩散范围; 数字; 默认为 0speed: 0 # 粒子速度; 数字; 默认为 0` ## 特殊选项​ ### 方块粒子​ 适用的 `particle` 类型：`minecraft:block`、`minecraft:falling_dust`、`minecraft:dust_pil

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
