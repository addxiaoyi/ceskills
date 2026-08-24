#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const pack = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fail = [];
const ok = [];
const must = (cond, msg) => (cond ? ok : fail).push(msg);

const catalog = JSON.parse(fs.readFileSync(path.join(pack, 'catalog.json'), 'utf8'));
const graph = JSON.parse(fs.readFileSync(path.join(pack, 'graph.slim.json'), 'utf8'));
const index = fs.readFileSync(path.join(pack, 'INDEX.md'), 'utf8');
const pagesDir = path.join(pack, 'pages');
const pages = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'));

must(graph.nodes.length >= 150, '覆盖几乎全站 nodes>=150 实际 ' + graph.nodes.length);
must(graph.edges.length >= 100, 'edges>=100 实际 ' + graph.edges.length);
must(pages.length === graph.nodes.length, `pages=${pages.length} == nodes=${graph.nodes.length}`);
must(Object.keys(catalog.types || {}).length >= 6, '类型>=6');
must(index.includes('Block') && index.includes('Item'), 'INDEX 含 Block/Item');
must(fs.existsSync(path.join(pack, 'SKILL.md')), 'SKILL.md');
must(fs.existsSync(path.join(pack, 'scripts', 'query.mjs')), 'query.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'route.mjs')), 'route.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'answer.mjs')), 'answer.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'list.mjs')), 'list.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'lint.mjs')), 'lint.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'generate.mjs')), 'generate.mjs');
must(fs.existsSync(path.join(pack, 'schema.json')), 'schema.json');
must(fs.existsSync(path.join(pack, 'scripts', 'optimize.mjs')), 'optimize.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'liubu.mjs')), 'liubu.mjs');
must(fs.existsSync(path.join(pack, 'scripts', 'apply.mjs')), 'apply.mjs');

const ids = new Set(graph.nodes.map((n) => n.id));
let dangling = 0;
for (const e of graph.edges) if (!ids.has(e.source) || !ids.has(e.target)) dangling++;
must(dangling === 0, '无悬空边 实际 ' + dangling);

const required = [
  'configuration_block',
  'configuration_item',
  'configuration_furniture',
  'getting_start',
  'reference_events',
  'seat_block',
  'compatibility',
  'addon',
];
for (const r of required) {
  must(
    graph.nodes.some((n) => n.id.includes(r) || (n.url || '').includes(r.replace(/_/g, '/'))),
    '覆盖 ' + r,
  );
}

const yamlPages = graph.nodes.filter((n) => (n.yaml || '').includes('\n') && /behavior|items:|blocks:/.test(n.yaml));
must(yamlPages.length >= 20, '至少 20 页有可用 YAML 实际 ' + yamlPages.length);

function probe(term) {
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', 'query.mjs'), term], {
    encoding: 'utf8',
  });
  if (r.status !== 0 && r.status !== 2) return { term, ok: false, n: 0, err: r.stderr };
  try {
    const j = JSON.parse(r.stdout);
    return { term, ok: (j.hits || []).length > 0, n: (j.hits || []).length };
  } catch {
    return { term, ok: false, n: 0 };
  }
}
const probes = ['座椅', '第一个方块', '物品', '家具', '事件', '兼容', '配方', '安装', '门', '作物'].map(probe);
for (const p of probes) must(p.ok, `检索「${p.term}」有命中 n=${p.n}`);

function probeAnswer(term) {
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', 'answer.mjs'), term], { encoding: 'utf8' });
  if (r.status && r.status !== 2) return { term, ok: false };
  try {
    const j = JSON.parse(r.stdout);
    return { term, ok: Boolean(j.hit && j.markdown) };
  } catch {
    return { term, ok: false };
  }
}
must(probeAnswer('怎么做能坐的椅子').ok, 'answer.mjs 能回答座椅');

function probeGen() {
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', 'generate.mjs'), 'seat', 'default:oak_chair'], { encoding: 'utf8' });
  try {
    const j = JSON.parse(r.stdout);
    if (!j.yaml || !j.yaml.includes('seat_block')) return { ok: false };
    const lint = spawnSync(process.execPath, [path.join(pack, 'scripts', 'lint.mjs'), '-'], { encoding: 'utf8', input: j.yaml });
    const l = JSON.parse(lint.stdout || '{}');
    return { ok: l.ok === true };
  } catch {
    return { ok: false };
  }
}
must(probeGen().ok, 'generate+lint 座椅配置通过');

function probeBad() {
  const bad = 'blocks:\n  chair:\n    behavior:\n      type: sittable\n';
  const lint = spawnSync(process.execPath, [path.join(pack, 'scripts', 'lint.mjs'), '-'], { encoding: 'utf8', input: bad });
  try {
    const l = JSON.parse(lint.stdout || '{}');
    return { ok: l.ok === false && (l.issues || []).some((i) => i.level === 'error') };
  } catch {
    return { ok: false };
  }
}
must(probeBad().ok, 'lint 能拦住错误 type / 缺 state / 缺命名空间');

function probeLiubu() {
  const r = spawnSync(
    process.execPath,
    [path.join(pack, 'scripts', 'liubu.mjs'), 'run', '怎么做能坐的椅子', 'default:oak_chair'],
    { encoding: 'utf8' },
  );
  try {
    const j = JSON.parse(r.stdout || '{}');
    return { ok: j.ok === true && j.liubu?.passed === 6 && /准奏/.test(j.edict || '') };
  } catch {
    return { ok: false };
  }
}
must(probeLiubu().ok, '三省六部 run 座椅准奏且六部全画押');

function probeApply() {
  const dir = path.join(pack, 'edicts');
  if (!fs.existsSync(dir)) return { ok: false };
  const yml = fs.readdirSync(dir).filter((f) => f.endsWith('.yml')).sort().reverse()[0];
  if (!yml) return { ok: false };
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', 'apply.mjs'), path.join(dir, yml)], {
    encoding: 'utf8',
  });
  try {
    const j = JSON.parse(r.stdout || '{}');
    return { ok: j.ok === true && Boolean(j.file) };
  } catch {
    return { ok: false };
  }
}
must(probeApply().ok, 'apply 能把准奏 yml 落档');

function probeStatus() {
  const r = spawnSync(process.execPath, [path.join(pack, 'scripts', 'liubu.mjs'), 'status'], { encoding: 'utf8' });
  try {
    const j = JSON.parse(r.stdout || '{}');
    return { ok: Array.isArray(j.edicts) };
  } catch {
    return { ok: false };
  }
}
must(probeStatus().ok, 'liubu status 能列出准奏档');

const report = {
  ok: fail.length === 0,
  passed: ok.length,
  failed: fail.length,
  fail,
  counts: {
    nodes: graph.nodes.length,
    edges: graph.edges.length,
    pages: pages.length,
    yamlPages: yamlPages.length,
    types: catalog.counts,
  },
  probes,
};
console.log(JSON.stringify(report, null, 2));
process.exit(fail.length ? 1 : 0);
