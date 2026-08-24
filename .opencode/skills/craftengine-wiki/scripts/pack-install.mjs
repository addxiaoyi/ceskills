#!/usr/bin/env node
/**
 * 打一份可安装的 skill 包（zip）。
 * 结构符合 Agent Skills：根目录必须有 SKILL.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(skillRoot, '../../..');
const srcPack = path.join(skillRoot, 'pack');
const srcSkill = path.join(skillRoot, 'SKILL.md');
const dist = path.join(root, 'dist');
const staging = path.join(dist, 'craftengine-wiki');
const zipPath = path.join(dist, 'craftengine-wiki-skill.zip');

if (!fs.existsSync(path.join(srcPack, 'SKILL.md'))) {
  console.error('先跑 pnpm export-skill');
  process.exit(1);
}

fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    if (name === 'applied') continue;
    const a = path.join(from, name);
    const b = path.join(to, name);
    const st = fs.statSync(a);
    if (st.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

copyDir(srcPack, staging);
fs.copyFileSync(srcSkill, path.join(staging, 'SKILL.md'));
fs.copyFileSync(path.join(root, '.opencode/skills/craftengine-wiki/skill-rules.json'), path.join(staging, 'skill-rules.json'));

const installMd = `# 安装 CraftEngine Wiki Skill

## 解压到技能目录（任选其一）

- OpenCode: \`~/.config/opencode/skills/craftengine-wiki/\`
- Claude Code: \`~/.claude/skills/craftengine-wiki/\`
- Codex: \`~/.codex/skills/craftengine-wiki/\`
- 项目内: \`<repo>/.opencode/skills/craftengine-wiki/\`

解压后目录里必须能看到 \`SKILL.md\`。

## 自检

\`\`\`bash
node scripts/selfcheck.mjs
node scripts/liubu.mjs run "怎么做能坐的椅子" default:oak_chair
\`\`\`

需要 Node.js >= 20。无需再装依赖。
`;
fs.writeFileSync(path.join(staging, 'INSTALL.md'), installMd);

fs.rmSync(zipPath, { force: true });
const zip = spawnSync(
  'tar',
  ['-a', '-c', '-f', zipPath, '-C', dist, 'craftengine-wiki'],
  { encoding: 'utf8' },
);
if (zip.status !== 0) {
  const ps = spawnSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${staging}' -DestinationPath '${zipPath}' -Force`],
    { encoding: 'utf8' },
  );
  if (ps.status !== 0) {
    console.error(zip.stderr || ps.stderr);
    process.exit(1);
  }
}

const pages = fs.readdirSync(path.join(staging, 'pages')).length;
const st = fs.statSync(zipPath);
console.log(
  JSON.stringify(
    {
      zip: zipPath,
      bytes: st.size,
      pages,
      install: '解压到 ~/.config/opencode/skills/craftengine-wiki/',
    },
    null,
    2,
  ),
);
