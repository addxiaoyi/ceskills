---
id: page:configuration_block_states_entity_renderer
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states/entity_renderer
aliases: 方块实体渲染器, configuration block states entity renderer, 🫑 方块实体渲染器, 它是如何工作的？, 基本用法, 展示实体通用参数
---

# 🫑 方块实体渲染器

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/states/entity_renderer
- 连接数：5

## 摘要

本页总览 # 🫑 方块实体渲染器 ## 它是如何工作的？​ 众所周知，单个方块的变体数量是有限的。以绊线为例，其最多只有 128 种变体。这意味着在不破坏绊线原本功能的前提下，最多只能释放 127 种自定义方块状态。然而，通过移除其中一种状态的纹理使其完全透明，并在方块中心放置展示实体，便能实现近乎无限的自定义方块。 注意需要注意的是，某些原版方块使用了硬编码的渲染器。当方块使用的模型尺寸与完整方块不匹配时，可能会出现透视方块效果，如下图所示。 要配置展示实体，在 `state` 或 `appearances` 的配置部分中添加 `entity_renderer` 选项即可。 ## 基本用法​ `entity_renderer` 需要一个配置部分或列表作为参数。每个配置部分代表一个渲染元素，多个元素可叠加组合。 `# 单个渲染元素（配置部分格式）entity_renderer: type: item_display item: default:sofa# 多个渲染元素（列表格式）entity_renderer: - type: item_display item: default:s

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- depends_on → [⚖️ 条件](page_reference_conditions.md)
