---
id: page:reference_conditions
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/conditions
aliases: 条件, reference conditions, ⚖️ 条件, any_of, all_of, inverted
---

# ⚖️ 条件

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/conditions
- 连接数：9

## 摘要

本页总览 # ⚖️ 条件 提示在条件类型前添加 `!` 可反转判断逻辑，例如：`type: "!permission"permission: "craftengine.admin"` ### any_of​ 满足任意条件即可。 `type: any_ofterms: - type: xxx - type: xxx` ### all_of​ 所有条件都必须满足。 `type: all_ofterms: - type: xxx - type: xxx` ### inverted​ 对当前条件的结果值取反。 `type: invertedterm: type: xxx` ### falling_block​ 检测掉落物是否由下落的方块掉落 `type: falling_block` ### survives_explosion​ 以 `1/爆炸半径` 的概率返回成功。需要上下文提供参数进行检测，若未提供则总是通过。 `type: survives_explosion` ### has_item​ 检查是否有手持物品 `type: has_item` ### match_item​ 检查手持物

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [📒 参考](page_reference.md)
- depends_on → [📜 脚本](page_reference_script.md)
