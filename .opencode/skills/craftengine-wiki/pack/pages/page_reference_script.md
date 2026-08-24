---
id: page:reference_script
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/reference/script
aliases: 脚本, reference script, 📜 脚本, 简介, 脚本文件, 在 YAML 中使用脚本
---

# 📜 脚本

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/reference/script
- 连接数：7

## 摘要

本页总览 # 📜 脚本 ## 简介​ CraftEngine 内置 JavaScript 脚本系统。脚本可以被 YAML 引用（作为[函数](/zh-Hans/reference/events#js)和[条件](/zh-Hans/reference/conditions#js)），也可以订阅 Bukkit 事件、注册周期任务、提供自定义 [PlaceholderAPI 变量](/zh-Hans/compatibility/placeholderapi#cejs_id)。 脚本系统默认关闭，请在 `config.yml` 中启用： `scripting: js: # 启用 JavaScript 脚本系统，需要重启服务器才能完全生效 enable: true # JS 引擎实现：graaljs（约 68MB）或 nashorn（约 2.4MB） engine: nashorn # 严格模式：对常见 JS 错误（未声明变量等）抛出异常 strict: true # 仅 GraalJS 适用：Nashorn 兼容模式——bean getter 映射（event.block -> getBlo

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- requires → [📒 参考](page_reference.md)
- depends_on → [🪇 事件](page_reference_events.md)
- depends_on → [⚖️ 条件](page_reference_conditions.md)
- depends_on → [🅿️ 占位符](page_compatibility_placeholderapi.md)
