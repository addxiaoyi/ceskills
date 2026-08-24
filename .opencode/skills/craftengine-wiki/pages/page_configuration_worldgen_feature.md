---
id: page:configuration_worldgen_feature
type: Config
url: https://ce-pre.gtemc.cn/zh-Hans/configuration/worldgen_feature
aliases: 世界生成地物, configuration worldgen feature, 🌍 世界生成地物, 简介, 使用数据包生成器, 理解结构
---

# 🌍 世界生成地物

- 类型：Config
- 原文：https://ce-pre.gtemc.cn/zh-Hans/configuration/worldgen_feature
- 连接数：0

## 摘要

本页总览 # 🌍 世界生成地物 ## 简介​ 世界生成地物用于在游戏中生成树木、矿石、花草等自然结构。 核心概念有两个： 概念控制什么示例已配置地物（Configured Feature）单个地物长什么样。树的形状：树干高度、树叶形态等。已放置地物（Placed Feature）地物在世界中如何出现。生成在哪些生物群系、稀有度、每区块尝试次数。 ## 使用数据包生成器​ 要编写 CraftEngine 世界生成配置，你需要使用数据包生成器。直接手写这些配置通常是不现实的，语法出错的概率非常高。第一步就是打开 [misode 生成器](https://misode.github.io/worldgen/placed-feature/)，然后将输出格式更改为 YAML。 ## 理解结构​ 打开生成器后，第一步就是把它切换到你的服务器所在的 Minecraft 版本。版本不匹配是地物配置无法工作的最常见原因之一。 一个已放置地物有两个根键： - `feature` —— 即已配置地物。它可以是引用其他已配置地物的字符串，也可以是直接定义地物的对象。 - `placement` —— 即已放

## YAML 片段

```yaml
blocks:
      - 'default:ore_a'
      - 'minecraft:stone'
```

## 相关页面

- （无）
