# ceskills

抓取 [CraftEngine Wiki](https://ce-pre.gtemc.cn/zh-Hans/)（163 页），做成可给 Agent 安装的 Skill：查文档、生成 YAML、审核漏洞、三省六部落档。

仓库：https://github.com/addxiaoyi/ceskills

## 安装 Skill（给 Agent 用）

安装包：[`craftengine-wiki-skill.zip`](./craftengine-wiki-skill.zip)

解压后目录里必须有 `SKILL.md`，放到：

| 环境 | 路径 |
|------|------|
| OpenCode | `~/.config/opencode/skills/craftengine-wiki/` |
| Claude Code | `~/.claude/skills/craftengine-wiki/` |
| 本仓库 | `.opencode/skills/craftengine-wiki/` |

```bash
# 解压后自检（需要 Node >= 20，无需再装依赖）
node scripts/selfcheck.mjs
node scripts/liubu.mjs run "怎么做能坐的椅子" default:oak_chair
```

或从本仓库直接用：

```bash
git clone https://github.com/addxiaoyi/ceskills.git
cd ceskills
pnpm install
pnpm skill:check
```

## 三省六部（改配置 / 生成 / 审核）

```
中书拟旨 → 门下封驳 → 六部会签 → 准奏落档 → apply 写盘
```

```bash
pnpm skill:liubu run "怎么做能坐的椅子" default:oak_chair
pnpm skill:status
pnpm skill:apply .opencode/skills/craftengine-wiki/pack/edicts/<最新>.yml
```

| 你要 | 命令 |
|------|------|
| 问怎么配 | `pnpm skill:answer "怎么做能坐的椅子"` |
| 生成 YAML | `pnpm skill:gen seat default:oak_chair` |
| 审核漏洞 | `pnpm skill:lint 文件.yml` |
| 优化建议 | `pnpm skill:opt 文件.yml` |
| 查 Wiki | `pnpm skill:query 座椅` |
| 列某类 | `pnpm skill:list Block` |
| 重新打包 zip | `pnpm skill:pack` |

`ok: false` 只给发还事由，不把草稿当成品。`behavior.type` 必须用 Wiki 全名（`seat_block` 不是 `seat`）。

## WebUI（抓 Wiki + 图谱）

```bash
pnpm install
cp .env.example .env          # 可选 GEMINI_API_KEY
pnpm --filter @ceskills/server dev   # :3001
pnpm --filter @ceskills/web dev      # :3000
```

打开 http://localhost:3000 ：抓取 Wiki → 提问 → 看图谱 → 呈奏（三省六部）。

## 目录

```
.opencode/skills/craftengine-wiki/
  SKILL.md                 # Agent 入口
  pack/                    # 离线 163 页 + 脚本 + schema
  scripts/                 # 导出 / 打包
apps/web                   # Next.js
apps/server                # Fastify 爬虫 / 抽取 / 建图
craftengine-wiki-skill.zip # 可安装包
```

## 许可

MIT
