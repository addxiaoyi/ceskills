---
id: page:reference_events
type: Event
url: https://ce-pre.gtemc.cn/zh-Hans/reference/events
aliases: 事件, reference events, 🪇 事件, 简介, 🧨 事件触发器, 物品
---

# 🪇 事件

- 类型：Event
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/events
- 连接数：12

## 摘要

本页总览 # 🪇 事件 ## 简介​ `events` 部分决定了哪些物品/家具/方块将在特定事件中执行预定义行为。在 `events` 部分下，您需要指定一个事件触发器，例如 `"right_click"` 表示右键点击动作。在事件触发器下方，您必须传递一个动作列表及其对应的类型。例如，`command` 用于执行特定命令。 `events: - on: right_click functions: - type: command command: say 1 conditions: - type: permission permission: "craftengine.admin" - type: command command: say 2 conditions: [] - on: - attack - left_click functions: - type: command command: say 3` ## 🧨 事件触发器​ ### 物品​ - break - right_click - left_click - consume - pick_up - attack

## YAML 片段

```yaml
items:  default:bench:
    events: # ❌️      right_click:
      - type: command
    behavior:
      type: furniture_item
furniture:
    events: # ✅️          right_click:
      - type: command
```

## 相关页面

- requires → [📒 参考](page_reference.md)
- depends_on → [✨ 粒子效果](page_reference_particle_effect.md)
- depends_on → [📜 脚本](page_reference_script.md)
