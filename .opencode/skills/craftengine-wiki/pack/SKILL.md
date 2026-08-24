---
name: craftengine-wiki
description: "CraftEngine 配置助手。先 route 再 query，禁止编造 YAML。覆盖 163 页 Wiki。"
---

# CraftEngine Wiki Skill Pack

```bash
node scripts/liubu.mjs run "怎么做能坐的椅子" default:oak_chair
node scripts/selfcheck.mjs
```

准奏写入 `edicts/*.yml`。封驳只给事由。

1. route → 栏目 + 建议词
2. query → hits.yaml / url / page
3. 读 pages/*.md
4. 回答：做法 + YAML（仅 hits）+ 原文 URL
5. 禁止编造 behavior.type

覆盖：
- Addon: 3
- Config: 48
- Item: 28
- API: 1
- Compat: 14
- Block: 67
- Recipe: 1
- Event: 1
