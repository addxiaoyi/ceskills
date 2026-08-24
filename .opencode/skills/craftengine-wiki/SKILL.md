---
name: craftengine-wiki
description: "CraftEngine 配置按三省六部闭环办事。用户要改/生成/审核/优化/落档 YAML、方块物品家具配方时必须使用。中书拟旨、门下封驳、六部会签、工部落档。禁止编造 behavior.type。"
---

# CraftEngine · 三省六部闭环

离线包：`.opencode/skills/craftengine-wiki/pack/`

```
抓 Wiki → 抽图谱 → 导出 skill
     ↓
中书拟旨 → 门下封驳 → 六部会签 → 准奏落档 → 工部 apply
```

## 一条龙

```bash
pnpm skill:liubu run "怎么做能坐的椅子" default:oak_chair
pnpm skill:apply pack/edicts/<最新>.yml   # 可选：写到你的配置目录
pnpm skill:check
```

| 环节 | 命令 | 不过关怎么办 |
|------|------|----------------|
| 中书 | `liubu draft` | 换关键词再拟 |
| 门下 | `liubu review file.yml` | 按 issues 改，禁止硬过 |
| 六部 | `liubu issue file.yml` | 缺画押的部补齐 |
| 准奏 | `liubu run` | `ok:true` 才给 YAML |
| 落档 | `apply.mjs` | lint 失败不写盘 |
| 列表 | `liubu status` | 看最近准奏 |
| 自检 | `skill:check` | 42+ 项全过 |

准奏文件：`pack/edicts/*.yml` + `*.md`。封驳只给事由。

## 硬规矩

1. `behavior.type` 只能是 schema 全名。
2. 方块必有 `state`；家具必有 `variants`。
3. 键名来自 Wiki hits。
4. 回答带原文 URL。
5. `ok: false` 不得把草稿当成品。
