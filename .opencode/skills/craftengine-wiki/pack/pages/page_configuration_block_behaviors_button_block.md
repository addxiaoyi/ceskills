---
id: page:configuration_block_behaviors_button_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/button_block
aliases: 按钮方块, configuration block behaviors button block, 🔘 按钮方块, 属性, 示例
---

# 🔘 按钮方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/button_block
- 连接数：1

## 摘要

本页总览 # 🔘 按钮方块 按钮方块是一种红石电源。被按下时激活并输出信号，片刻后自动弹起关闭。 可由以下方式触发： - 玩家对着按钮使用 - 射出去的箭和投掷出的三叉戟落在按钮上 - 风弹命中产生风暴 按钮激活时会[强充能](https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E7%94%B5%E8%B7%AF/%E5%85%85%E8%83%BD%E4%B8%8E%E6%BF%80%E6%B4%BB#%E5%85%85%E8%83%BD%EF%BC%88Charging%EF%BC%89)自身附着的红石导体至充能等级15。 ## 属性​ 按钮本身只需要一个开或关的状态。[强充能](https://zh.minecraft.wiki/w/%E7%BA%A2%E7%9F%B3%E7%94%B5%E8%B7%AF/%E5%85%85%E8%83%BD%E4%B8%8E%E6%BF%80%E6%B4%BB#%E5%85%85%E8%83%BD%EF%BC%88Charging%EF%BC%89)自身附着的红石导体依赖于[➡️ 水平面定向附着方块]

## YAML 片段

```yaml
blocks:  default:palm_button:
    behaviors:
      - type: face_attached_horizontal_directional_block        attached_block_tags:
      - minecraft:dirt
      - type: button_block        ticks_to_stay_pressed: 30        # 按钮保持激活的时长，单位：刻（默认为 30）        can_be_activated_by_arrows: true # 落在按钮上的箭或三叉戟是否让它保持激活（默认为 true）
      sounds:          on: minecraft:block.wooden_button.click_on   # 按钮激活的音效（可选）          off: minecraft:block.wooden_button.click_off  # 按钮取消激活的音效（可选）
```

## 相关页面

- depends_on → [➡️ 水平面定向附着方块](page_configuration_block_behaviors_face_attached_horizontal_directional_block.md)
