---
id: page:configuration_block_behaviors_hangable_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/hangable_block
aliases: 可悬挂方块, configuration block behaviors hangable block, 🚟 可悬挂方块, 示例
---

# 🚟 可悬挂方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/hangable_block
- 连接数：0

## 摘要

本页总览 # 🚟 可悬挂方块 可悬挂方块既可放置于地面，也可悬挂在方块下方，就像原版灯笼。放置时会根据周围环境自动选择有效的放置方式。当对应方向的支撑方块被移除时，该方块会自动破坏。 属性名称属性类型是否必需hangingboolean是waterloggedboolean否 ## 示例​ `blocks: default:lantern: behavior: type: hangable_block`

## YAML 片段

```yaml
blocks:  default:lantern:
    behavior:
      type: hangable_block
```

## 相关页面

- （无）
