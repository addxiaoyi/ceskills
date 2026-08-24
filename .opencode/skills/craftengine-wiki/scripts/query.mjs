#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pack = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const qRaw = process.argv.slice(2).join(' ').trim();
if (!qRaw) {
  console.error('用法: node query.mjs <关键词或问题>');
  process.exit(1);
}

const ALIAS = {
  椅子: 'seat',
  座椅: 'seat',
  可坐: 'seat',
  坐下: 'seat',
  沙发: 'sofa',
  方块: 'block',
  物品: 'item',
  家具: 'furniture',
  配方: 'recipe',
  合成: 'recipe',
  事件: 'events',
  兼容: 'compatibility',
  入门: 'getting_start',
  安装: 'installation',
  重载: 'reload',
  第一个方块: 'first_block',
  第一个物品: 'items',
  门: 'door',
  作物: 'crop',
  下落: 'falling',
  战利品: 'loot',
  掉落: 'loot',
  条件: 'condition',
  模板: 'template',
  行为: 'behavior',
  模型: 'model',
  贴图: 'texture',
  附加: 'addon',
  yaml: 'behavior',
};

const q = qRaw.toLowerCase();
const extra = Object.entries(ALIAS)
  .filter(([k]) => q.includes(k.toLowerCase()))
  .map(([, v]) => v);

const g = JSON.parse(fs.readFileSync(path.join(pack, 'graph.slim.json'), 'utf8'));
const terms = [...new Set([q, ...q.split(/[\s，。？?、]+/).filter((t) => t.length >= 2), ...extra])];

function score(n) {
  const bag = `${n.label}\n${n.id}\n${n.url || ''}\n${n.yaml || ''}\n${(n.aliases || []).join(' ')}\n${n.body || ''}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    if (n.label.toLowerCase().includes(t)) s += 8;
    if (n.id.toLowerCase().includes(t.replace(/\s/g, '_'))) s += 6;
    if ((n.yaml || '').toLowerCase().includes(t)) s += 4;
    if (bag.includes(t)) s += 2;
  }
  s += Math.min(n.degree || 0, 5);
  return s;
}

const ranked = g.nodes.map((n) => ({ n, s: score(n) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
const hits = ranked.slice(0, 8).map((x) => x.n);
const related = new Set();
for (const h of hits) {
  for (const e of g.edges) {
    if (e.source === h.id) related.add(e.target);
    if (e.target === h.id) related.add(e.source);
  }
}

const out = {
  question: qRaw,
  terms,
  hits: hits.map((h) => ({
    id: h.id,
    label: h.label,
    type: h.type,
    url: h.url,
    yaml: (h.yaml || '').slice(0, 800),
    page: `pages/${h.id.replace(/[:/\\]/g, '_')}.md`,
  })),
  related: [...related].slice(0, 12).map((id) => {
    const n = g.nodes.find((x) => x.id === id);
    return n ? { id: n.id, label: n.label, type: n.type, url: n.url } : { id };
  }),
  hint: hits.length
    ? '打开 hits[].page 读全文 YAML；回答必须带 url。'
    : '无命中。换更短关键词，或读 INDEX.md。',
};
console.log(JSON.stringify(out, null, 2));
if (!hits.length) process.exit(2);
