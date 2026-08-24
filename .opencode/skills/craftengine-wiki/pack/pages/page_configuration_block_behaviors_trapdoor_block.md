---
id: page:configuration_block_behaviors_trapdoor_block
type: Block
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/trapdoor_block
aliases: 活板门方块, configuration block behaviors trapdoor block, 🪟 活板门方块, 示例
---

# 🪟 活板门方块

- 类型：Block
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/trapdoor_block
- 连接数：0

## 摘要

本页总览 # 🪟 活板门方块 活板门方块是可开合的铰链面板。可通过玩家交互、红石或风弹切换状态。 - 手： 右键点击开关。 - 红石： 相邻信号激活时打开，信号切断时关闭。 - 风弹： 风弹爆炸可切换活板门状态。 放置时活板门会自动检测周围红石信号与当前位置的水体状态——若被红石信号激活则变为开启状态，若放置在水中则含水。 属性名称属性类型是否必需openboolean是poweredboolean是halfsingle_block_half是facinghorizontal_direction是waterloggedboolean否 ## 示例​ `blocks: default:palm_trapdoor: behavior: type: trapdoor_block can_open_with_hand: true # 允许右键点击切换（默认为 true） can_open_by_wind_charge: true # 允许风弹切换（默认为 true） sounds: open: block.wooden_trapdoor.open # 打开时播放的音效（可选） close:

## YAML 片段

```yaml
blocks:  default:palm_trapdoor:
    behavior:
      type: trapdoor_block      can_open_with_hand: true        # 允许右键点击切换（默认为 true）      can_open_by_wind_charge: true   # 允许风弹切换（默认为 true）
      sounds:        open: block.wooden_trapdoor.open     # 打开时播放的音效（可选）        close: block.wooden_trapdoor.close   # 关闭时播放的音效（可选）
```

## 相关页面

- （无）
