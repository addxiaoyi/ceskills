---
id: page:getting_start_items
type: Item
url: https://ce-pre.gtemc.cn/zh-Hans/getting_start/items
aliases: 第一个物品, getting start items, 🗡️ 第一个物品, 第 1 步：三行配置，拿到物品, 这段 YAML 每个字是什么意思, 第 2 步：给它一个名字
---

# 🗡️ 第一个物品

- 类型：Item
- 原文：https://ce-pre.gtemc.cn/zh-Hans/getting_start/items
- 连接数：3

## 摘要

本页总览 # 🗡️ 第一个物品 上一章用 `/ce resource create` 建好了 `tutorial` 包。现在在里面做出第一个自定义物品。 打开上一章建的 `configuration/items.yml`（如果还没建，翻回[认识项目](/zh-Hans/getting_start/project_structure)看第 2 步）。用记事本或 VS Code 打开，把下面的内容一字不改复制进去。 ## 第 1 步：三行配置，拿到物品​ 把下面内容写入 `items.yml`： `items: tutorial:diamond: material: diamond` 然后保存文件。在游戏里输入： `/ce reload config` 看到绿色的成功提示后，接着输入： `/ce item get tutorial:diamond` 你的背包里多了一颗钻石。🎉 这就是你做的第一个自定义物品！ ### 这段 YAML 每个字是什么意思​ 逐行解释： - `items:` — "下面我要开始定义物品了" - `tutorial:diamond:` — "这个物品叫 `tut

## YAML 片段

```yaml
items:  tutorial:diamond:
      material: diamond
```

```yaml
items:  tutorial:diamond:
      material: diamond
    data:      item_name: "闪亮的钻石"      lore:
      - "一颗被 CraftEngine 魔法加持的钻石"
```

## 相关页面

- requires → [👋 入门指南](page_getting_start.md)
- depends_on → [🗂️ 认识项目](page_getting_start_project_structure.md)
