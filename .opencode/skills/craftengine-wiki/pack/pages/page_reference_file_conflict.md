---
id: page:reference_file_conflict
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/file_conflict
aliases: 文件冲突, reference file conflict, ⚔️ 文件冲突, 简介, 匹配规则, 与
---

# ⚔️ 文件冲突

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/file_conflict
- 连接数：1

## 摘要

本页总览 # ⚔️ 文件冲突 ## 简介​ 在合并多个资源包时，我们经常会遇到文件冲突，例如 pack.png、sounds.json 等。将它们手动配置到单个文件中会非常繁琐。因此，插件提供了一个冲突处理器，让你能自定义解决冲突的方案。当插件检测到冲突文件时，它会查找第一个符合条件的解决方案。如果没有找到合适的解决方案，插件将在控制台向用户发出警告。 信息冲突处理器的配置位于 `config.yml` 文件中的 `resource-pack.duplicated-files-handler` 部分。 注意本插件不支持着色器的合并，因为这被认为是不稳定的功能。 `duplicated-files-handler: # 解决物品模型冲突 - term: type: any_of terms: - type: parent_path_suffix suffix: "minecraft/items" # 1.21.4+ - type: parent_path_suffix suffix: "minecraft/models/item" # 1.20-1.21.3 resolution: ty

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
