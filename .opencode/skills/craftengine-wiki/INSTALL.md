# 安装 CraftEngine Wiki Skill

## 解压到技能目录（任选其一）

- OpenCode: `~/.config/opencode/skills/craftengine-wiki/`
- Claude Code: `~/.claude/skills/craftengine-wiki/`
- Codex: `~/.codex/skills/craftengine-wiki/`
- 项目内: `<repo>/.opencode/skills/craftengine-wiki/`

解压后目录里必须能看到 `SKILL.md`。

## 自检

```bash
node scripts/selfcheck.mjs
node scripts/liubu.mjs run "怎么做能坐的椅子" default:oak_chair
```

需要 Node.js >= 20。无需再装依赖。
