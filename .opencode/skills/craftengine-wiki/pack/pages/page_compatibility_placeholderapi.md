---
id: page:compatibility_placeholderapi
type: Compat
url: https://ce-pre.gtemc.cn/zh-Hans/compatibility/placeholderapi
aliases: 占位符, compatibility placeholderapi, 🅿️ 占位符, %image_%, %image_mm_<命名空间>:<路径>:[行]:[列]%, %image_md_<命名空间>:<路径>:[行]:[列]%
---

# 🅿️ 占位符

- 类型：Compat
- 原文：https://ce-pre.gtemc.cn/zh-Hans/compatibility/placeholderapi
- 连接数：6

## 摘要

本页总览 # 🅿️ 占位符 危险请先查看[注意事项](/zh-Hans/reference/text_format#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) ## %image_%​ `image` 占位符用于根据给定的标识符返回对应图像的原始 Unicode 字符及其关联字体。 警告`row` 和 `column` 都是可选的，但如果使用其中一个，就必须同时使用另一个。 ### %image_mm_<命名空间>:<路径>:[行]:[列]%​ 返回 `minimessage` 格式的图像。 ### %image_md_<命名空间>:<路径>:[行]:[列]%​ 返回 `minedown` 格式的图像。 ### %image_raw_<命名空间>:<路径>:[行]:[列]%​ 返回原始图像字符 ## %shift_%​ `shift` 占位符用于获取偏移字符，常用于菜单标题对齐等操作。 ### %shift_mm_<数值>%​ 返回 `minimessage` 格式的偏移字符 ### %shift_md_<数值>%​ 返回 `minedown` 格式的

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [🤝 兼容性](page_compatibility.md)
- depends_on → [✏️ 文本格式](page_reference_text_format.md)
- depends_on → [🖼️ 图像](page_configuration_image.md)
- depends_on → [📜 脚本](page_reference_script.md)
