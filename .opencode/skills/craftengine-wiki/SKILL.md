---
name: craftengine-wiki
description: "CraftEngine 维基技能 -- 让 AI 通过六部工作流（中枢->门下->六部->谕旨）自动完成：意图路由 -> Wiki 检索 -> YAML 生成 -> 校验优化 -> 合规性审查 -> 归档落盘。"
---

# CraftEngine Wiki 技能

核心目录：`.opencode/skills/craftengine-wiki/pack/`

```
意图 -> 中枢(路由/检索/生成) -> 门下(Lint/优化) -> 六部(6 项合规审查) -> 谕旨(归档落盘)
```

## 快速开始

```bash
pnpm skill:liubu draft "需求描述"           # 生成草稿 YAML
pnpm skill:liubu review file.yml           # Lint + 优化建议
pnpm skill:liubu issue file.yml            # 完整合规性审查
pnpm skill:liubu run "需求描述" [id]        # 全流程：通过则落盘 edicts/
pnpm skill:liubu apply edicts/xxx.yml [out] # 应用到目标目录
pnpm skill:liubu status                    # 查看已归档
```

| 阶段 | 命令 | 产出 |
|------|------|------|
| 中枢 | `liubu draft` | 路由命中 Wiki URL + 草稿 YAML |
| 门下 | `liubu review` | Lint 结果 + 优化建议 |
| 六部 | `liubu issue` | 6 项检查逐项通过/不通过 |
| 归档 | `liubu run` | `ok:true` 才写入 `pack/edicts/*.yml` + `.md` |
| 落地 | `liubu apply` | 校验后写入 `pack/applied/` 或指定路径 |
| 状态 | `liubu status` | 列出最近 20 条 edicts |

归档产物：`pack/edicts/*.yml` + `*.md` 必须成对存在，`.md` 记录审查过程供复盘。

## 核心约束

1. `behavior.type` 必须在 schema 白名单内
2. Block 必须有 `state/states`，Furniture 必须有 `variants`
3. 无 Wiki 命中时需标记需人工补全
4. ID 必须符合 `namespace:path` 格式
5. `ok: false` 时禁止落盘，仅输出错误清单供修正