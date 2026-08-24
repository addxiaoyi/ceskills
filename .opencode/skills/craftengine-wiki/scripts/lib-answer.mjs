#!/usr/bin/env node
/**
 * 一问一答：route → query → 拼出 Agent 可直接用的答案。
 * 用法: node answer.mjs "怎么做能坐的椅子"
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pack = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const q = process.argv.slice(2).join(' ').trim();
if (!q) {
  console.error('用法: node answer.mjs <问题>');
  process.exit(1);
}

function run(script, arg) {
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', script), arg], {
    encoding: 'utf8',
  });
  if (r.status && r.status !== 2) {
    throw new Error(r.stderr || `${script} failed ${r.status}`);
  }
  try {
    return JSON.parse(r.stdout);
  } catch {
    return { raw: r.stdout, error: r.stderr };
  }
}

const routed = run('route.mjs', q);
const suggest = routed.routes?.[0]?.suggest || q;
const found = run('query.mjs', suggest);
const top = found.hits?.[0];

const md = [];
md.push(`# ${q}`);
md.push('');
if (!top) {
  md.push('没检索到直接页面。请换更短关键词，或打开 INDEX.md。');
} else {
  md.push(`**推荐页**：${top.label}（${top.type}）`);
  md.push(`**原文**：${top.url}`);
  md.push('');
  md.push('## 怎么做');
  md.push(`按 Wiki「${top.label}」配置。下面 YAML 来自检索结果，不要改键名。`);
  md.push('');
  if (top.yaml) {
    md.push('```yaml');
    md.push(top.yaml);
    md.push('```');
  } else {
    md.push('_本页没有抽出 YAML，请打开原文。_');
  }
  if (found.related?.length) {
    md.push('');
    md.push('## 相关');
    for (const r of found.related.slice(0, 6)) {
      md.push(`- ${r.label} — ${r.url}`);
    }
  }
}
md.push('');
md.push('---');
md.push('禁止编造 `behavior.type` 或配置键。');

const out = {
  question: q,
  suggest,
  route: routed.routes?.[0] || null,
  hit: top || null,
  related: found.related || [],
  markdown: md.join('\n'),
};
console.log(JSON.stringify(out, null, 2));
if (!top) process.exit(2);
