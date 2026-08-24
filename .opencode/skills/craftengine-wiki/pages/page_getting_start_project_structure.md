---
id: page:getting_start_project_structure
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/project_structure
aliases: 认识项目, getting start project structure, 🗂️ 认识项目, 插件目录长什么样, 什么是"包", 什么是命名空间
---

# 🗂️ 认识项目

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/project_structure
- 连接数：3

## 摘要

本页总览 # 🗂️ 认识项目 上一章装好了插件。现在看看 CraftEngine 的文件长什么样，然后用一条命令建好我们教程的工作区。 ## 插件目录长什么样​ 打开 `plugins/CraftEngine/`，你会看到这些： CraftEnginegeneratedlibsresourcestranslationscommands.ymlconfig.yml 目前重点是 `resources/` 文件夹——你做的所有物品、方块、家具都放在这里面。 ## 什么是"包"​ 在 CraftEngine 里，你的创作按"包"来组织。一个包就是 `resources/` 下的一个文件夹，里面包含： - `configuration/` —— 放 `.yml` 配置文件。物品怎么定义、方块什么属性，全写在这里 - `resourcepack/` —— 放模型文件（`.json`）、贴图文件（`.png`）、音效文件（`.ogg`）。结构和原版 Minecraft 资源包一样 - `pack.yml` —— 包的"身份证"：叫什么、谁做的、用哪个命名空间 💡 文件夹名以 `.` 开头（比如

## YAML 片段

```yaml
# 本页没有抽出 YAML，请打开原文 URL
```

## 相关页面

- （无）
