---
id: page:reference_number_format
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/number_format
aliases: 数字格式, reference number format, 🔢 数字格式, 常量, 均匀随机数, 表达式
---

# 🔢 数字格式

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/number_format
- 连接数：4

## 摘要

本页总览 # 🔢 数字格式 警告这些数字格式在大多数地方都适用，除了早期开发的物品数据部分。我们将在下一次物品系统重构时尝试重新设计数字支持，以便更好地处理随机化物品。 ### 常量​ 提供一个固定的数值。 `type: constantvalue: 1` 提示在大多数情况下，您可以使用以下简写形式。`count: type: constant value: 1`->`count: 1` ### 均匀随机数​ 在给定范围内提供一个随机数。 `type: uniformmin: 1max: 3` 提示在大多数情况下，您可以使用以下简写形式。`count: type: uniform min: 1 max: 3`->`count: 1~3``min` 和 `max` 也都支持嵌套使用 `提供数字的标签`.`count: type: uniform min: type: uniform min: 2 max: 7 max: "*5~*10"` ### 表达式​ [https://ezylang.github.io/EvalEx/references/references.html](htt

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
