---
id: page:compatibility_datapack
type: Compat
url: https://ce-pre.gtemc.cn/zh-Hans/compatibility/datapack
aliases: 数据包, compatibility datapack, 📦️ 数据包, 方块状态提供器, 已配置的地物, 战利品
---

# 📦️ 数据包

- 类型：Compat
- 原文：https://ce-pre.gtemc.cn/zh-Hans/compatibility/datapack
- 连接数：2

## 摘要

本页总览 # 📦️ 数据包 信息访问 [https://misode.github.io/](https://misode.github.io/) 获取最佳数据包开发体验。译者注：网站的右上角的地球图案点击拉到最下面可以切换为简体中文。 ## 方块状态提供器​ CraftEngine 允许你在数据包里使用自定义方块，这样就能使用数据包生成地形、树木，矿脉等。 下面是一个基于 Minecraft 1.21.4 的树配置示例: `{ "type": "minecraft:tree", "config": { "ignore_vines": true, "force_dirt": false, "minimum_size": { "type": "minecraft:two_layers_feature_size", "min_clipped_height": 10, "limit": 1, "lower_size": 0, "upper_size": 2 }, "dirt_provider": { "type": "minecraft:simple_state_provider", "s

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🤝 兼容性](page_compatibility.md)
- depends_on → [🐚 命令](page_reference_commands.md)
