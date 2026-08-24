---
id: page:reference_text_format
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/text_format
aliases: 文本格式, reference text format, ✏️ 文本格式, MiniMessage, 注意事项, 附加标签
---

# ✏️ 文本格式

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/text_format
- 连接数：3

## 摘要

本页总览 # ✏️ 文本格式 ## MiniMessage​ 在配置插件中的物品名称、提示框中所显示的描述信息、GUI 等内容时，请使用 MiniMessage 格式。[https://docs.papermc.io/adventure/minimessage/format/](https://docs.papermc.io/adventure/minimessage/format/) 任何有意义的标签都可以在其生效的位置被转义。在纯文本中，标签起始字符（`<`）可以通过前置反斜杠（`\`）进行转义。在带引号的字符串中，起始引号字符（`'` 或 `"`）也可以被转义。在这两种情况下，转义符本身也可以被转义以输出字面上的反斜杠。为简单起见，未加引号的标签参数不能使用转义字符。在不支持转义的上下文中，转义字符会作为普通字符原样输出。在支持转义的上下文中，如需输出反斜杠，应通过双反斜杠（`\\`）来实现。 ## 注意事项​ 危险译者注：不要把 `<`、 `>`、`[`、`]` 以及 `_` 写进去了请整个替换例如： `%image_mm_<命名空间>:<路径>%` 如果你的图片在配置文件中定

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- depends_on → [🔢 数字格式](page_reference_number_format.md)
