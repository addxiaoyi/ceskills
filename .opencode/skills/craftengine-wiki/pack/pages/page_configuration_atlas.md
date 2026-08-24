---
id: page:configuration_atlas
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/atlas
aliases: 图集Atlas, configuration atlas, 🗂️ 图集（Atlas）, 基础示例, 来源类型, directory
---

# 🗂️ 图集（Atlas）

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/atlas
- 连接数：1

## 摘要

本页总览 # 🗂️ 图集（Atlas） 信息绝大多数资源包都不需要配置 Atlas。CraftEngine 会验证常见的方块和物品图集，并可自动修复相关问题。只有在你有特殊的资源包需求时才需要手动配置，例如向原版图集加入纹理、创建自定义精灵图集，或使用原版的高级精灵来源。 Atlas 用于告诉 Minecraft：某个图集中有哪些可用的纹理精灵。CraftEngine 会读取资源包 `configuration/` 目录下配置文件中的 `atlases:`，并将结果写入： `assets/<命名空间>/atlases/<图集 ID>.json` 相同图集 ID 可以分散定义在多个配置文件中；CraftEngine 会按加载顺序合并它们的来源。 ## 基础示例​ 下面的配置与 Minecraft 默认的 `minecraft:blocks` 图集一致。纹理路径不需要写 `textures/` 前缀和 `.png` 后缀。 `atlases: minecraft:blocks: sources: - type: directory source: block prefix: block/

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [⚙️ 配置](page_configuration.md)
