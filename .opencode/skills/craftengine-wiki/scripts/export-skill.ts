#!/usr/bin/env tsx
/**
 * 把已抓 Wiki + 图谱打成可给 Agent 复用的 skill 包。
 * 输出：.opencode/skills/craftengine-wiki/pack/
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(process.cwd().includes('apps') ? '../../' : '.');
const PROJECT = path.join(ROOT, 'data/projects/craftengine-wiki');
const PACK = path.join(ROOT, '.opencode/skills/craftengine-wiki/pack');

type Node = {
  id: string;
  label: string;
  type: string;
  degree?: number;
  properties?: {
    url?: string;
    file?: string;
    yaml?: string;
    yamls?: string[];
    headings?: string[];
    aliases?: string[];
    body?: string;
  };
  source_location?: string;
  evidence?: string;
};
type Edge = { source: string; target: string; label: string };
type Graph = { nodes: Node[]; edges: Edge[]; gods?: string[]; surprises?: any[]; stats?: any };

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[:/\\?%*|"]/g, '_')
    .replace(/[^a-z0-9_\-\u4e00-\u9fff]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
}

async function main() {
  const graph: Graph = JSON.parse(await fs.readFile(path.join(PROJECT, 'graph.json'), 'utf-8'));
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];
  if (!nodes.length) throw new Error('graph.json 为空，先跑抽取+建图');

  const edictsTmp = path.join(ROOT, '.opencode/skills/craftengine-wiki/.edicts-keep');
  const edictsSrc = path.join(PACK, 'edicts');
  try {
    await fs.rm(edictsTmp, { recursive: true, force: true });
    await fs.cp(edictsSrc, edictsTmp, { recursive: true });
  } catch {}
  await fs.rm(PACK, { recursive: true, force: true });
  await fs.mkdir(path.join(PACK, 'pages'), { recursive: true });
  await fs.mkdir(path.join(PACK, 'scripts'), { recursive: true });

  const byType: Record<string, Node[]> = {};
  for (const n of nodes) (byType[n.type] ||= []).push(n);
  for (const k of Object.keys(byType)) {
    byType[k].sort((a, b) => (b.degree || 0) - (a.degree || 0) || a.label.localeCompare(b.label, 'zh'));
  }

  const catalog = {
    generatedAt: graph.stats?.builtAt || new Date().toISOString(),
    wiki: 'https://ce-pre.gtemc.cn/zh-Hans/',
    counts: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])),
    gods: graph.gods || [],
    types: Object.fromEntries(
      Object.entries(byType).map(([k, v]) => [
        k,
        v.map((n) => ({
          id: n.id,
          label: n.label,
          url: n.properties?.url || n.source_location,
          file: n.properties?.file,
          degree: n.degree || 0,
        })),
      ]),
    ),
  };
  await fs.writeFile(path.join(PACK, 'catalog.json'), JSON.stringify(catalog, null, 2));

  const adj = new Map<string, { to: string; label: string }[]>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push({ to: e.target, label: e.label });
  }

  const indexLines = [
    '# CraftEngine Wiki 目录（Agent 用）',
    '',
    `生成时间：${catalog.generatedAt}`,
    `页面：${nodes.length} · 关系：${edges.length}`,
    '',
    '查询：`node pack/scripts/query.mjs "<关键词>"`',
    '自检：`node pack/scripts/selfcheck.mjs`',
    '',
  ];
  for (const [type, list] of Object.entries(byType)) {
    indexLines.push(`## ${type}（${list.length}）`, '');
    for (const n of list) {
      const pageFile = `pages/${slug(n.id)}.md`;
      indexLines.push(`- [${n.label}](${pageFile}) — ${n.properties?.url || ''}`);
    }
    indexLines.push('');
  }
  await fs.writeFile(path.join(PACK, 'INDEX.md'), indexLines.join('\n'));

  for (const n of nodes) {
    const related = (adj.get(n.id) || [])
      .map((x) => {
        const t = nodes.find((nn) => nn.id === x.to);
        return t ? `- ${x.label} → [${t.label}](${slug(t.id)}.md)` : '';
      })
      .filter(Boolean);
    const yamls = (n.properties?.yamls?.length ? n.properties.yamls : [n.properties?.yaml || '']).filter(Boolean);
    const yamlBlock = yamls.length
      ? yamls.map((y) => '```yaml\n' + y + '\n```').join('\n\n')
      : '```yaml\n# 本页没有抽出 YAML，请打开原文 URL\n```';
    const md = `---
id: ${n.id}
type: ${n.type}
url: ${n.properties?.url || n.source_location || ''}
aliases: ${(n.properties?.aliases || []).join(', ')}
---

# ${n.label}

- 类型：${n.type}
- 原文：${n.properties?.url || n.source_location || ''}
- 连接数：${n.degree || 0}

## 摘要

${(n.evidence || '').trim() || '（无摘要）'}

## YAML 片段

${yamlBlock}

## 相关页面

${related.join('\n') || '- （无）'}
`;
    await fs.writeFile(path.join(PACK, 'pages', `${slug(n.id)}.md`), md);
  }

  const slimGraph = {
    nodes: nodes.map((n) => ({
      id: n.id,
      label: n.label,
      type: n.type,
      url: n.properties?.url || n.source_location,
      yaml: n.properties?.yaml || '',
      aliases: n.properties?.aliases || [],
      body: (n.properties?.body || n.evidence || '').slice(0, 2500),
      degree: n.degree || 0,
    })),
    edges,
  };
  await fs.writeFile(path.join(PACK, 'graph.slim.json'), JSON.stringify(slimGraph));
  const scriptsDir = path.join(path.dirname(fileURLToPath(import.meta.url)));
  await fs.copyFile(path.join(scriptsDir, 'lib-query.mjs'), path.join(PACK, 'scripts/query.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-selfcheck.mjs'), path.join(PACK, 'scripts/selfcheck.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-route.mjs'), path.join(PACK, 'scripts/route.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-answer.mjs'), path.join(PACK, 'scripts/answer.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-list.mjs'), path.join(PACK, 'scripts/list.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-lint.mjs'), path.join(PACK, 'scripts/lint.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-generate.mjs'), path.join(PACK, 'scripts/generate.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'schema.json'), path.join(PACK, 'schema.json'));
  await fs.copyFile(path.join(scriptsDir, 'lib-optimize.mjs'), path.join(PACK, 'scripts/optimize.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-liubu.mjs'), path.join(PACK, 'scripts/liubu.mjs'));
  await fs.copyFile(path.join(scriptsDir, 'lib-apply.mjs'), path.join(PACK, 'scripts/apply.mjs'));
  try {
    await fs.cp(edictsTmp, path.join(PACK, 'edicts'), { recursive: true });
    await fs.rm(edictsTmp, { recursive: true, force: true });
  } catch {
    await fs.mkdir(path.join(PACK, 'edicts'), { recursive: true });
  }

  const skillMd = `---
name: craftengine-wiki
description: "CraftEngine 配置助手。先 route 再 query，禁止编造 YAML。覆盖 ${nodes.length} 页 Wiki。"
---

# CraftEngine Wiki Skill Pack

\`\`\`bash
node scripts/liubu.mjs run "怎么做能坐的椅子" default:oak_chair
node scripts/selfcheck.mjs
\`\`\`

准奏写入 \`edicts/*.yml\`。封驳只给事由。

1. route → 栏目 + 建议词
2. query → hits.yaml / url / page
3. 读 pages/*.md
4. 回答：做法 + YAML（仅 hits）+ 原文 URL
5. 禁止编造 behavior.type

覆盖：
${Object.entries(catalog.counts).map(([k, v]) => `- ${k}: ${v}`).join('\n')}
`;
  await fs.writeFile(path.join(PACK, 'SKILL.md'), skillMd);

  console.log(JSON.stringify({ pack: PACK, nodes: nodes.length, edges: edges.length, pages: nodes.length, types: catalog.counts }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
