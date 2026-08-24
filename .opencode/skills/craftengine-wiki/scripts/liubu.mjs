#!/usr/bin/env node
/**
 * 三省六部：中书拟旨 → 门下封驳 → 六部落地。
 *
 * 用法:
 *   node liubu.mjs draft  "怎么做能坐的椅子"     # 中书：查 wiki + 拟 YAML
 *   node liubu.mjs review file.yml               # 门下：lint + 优化，有 error 则封还
 *   node liubu.mjs issue  file.yml               # 六部会签：吏户礼兵刑工
 *   node liubu.mjs run    "怎么做能坐的椅子" [id] # 全流程
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const cmd = process.argv[2];
const rest = process.argv.slice(3);

function run(script, args, input) {
  const r = spawnSync(process.execPath, [path.join(here, script), ...args], {
    encoding: 'utf8',
    input,
  });
  let json = null;
  try { json = JSON.parse(r.stdout || 'null'); } catch { json = { raw: r.stdout, stderr: r.stderr }; }
  return { status: r.status ?? 0, json, stderr: r.stderr };
}

function zhongshu(question, id) {
  const routed = run('route.mjs', [question]).json;
  const suggest = routed?.routes?.[0]?.suggest || question;
  const found = run('query.mjs', [suggest]).json;
  const genKind = pickKind(question, routed);
  const gen = run('generate.mjs', [genKind, id || 'default:draft']).json;
  return {
    office: '中书省',
    role: '拟旨',
    question,
    route: routed?.routes?.[0] || null,
    wikiHit: found?.hits?.[0] || null,
    draft: gen,
  };
}

function menxia(yamlText) {
  const lint = run('lint.mjs', ['-'], yamlText).json;
  const opt = run('optimize.mjs', ['-'], yamlText).json;
  const sealed = lint?.ok === true;
  return {
    office: '门下省',
    role: sealed ? '副署通过' : '封驳发还',
    sealed,
    lint,
    optimize: opt?.optimize || [],
  };
}

function liubu(yamlText, ctx) {
  const t = yamlText || '';
  const hit = ctx?.wikiHit;
  const boards = [
    {
      name: '吏部',
      duty: '名籍（namespace:path）',
      ok: /[a-z0-9_.-]+:[a-z0-9_./-]+/.test(t),
      note: '条目必须带命名空间',
    },
    {
      name: '户部',
      duty: '资源（贴图/模型/物品绑定）',
      ok: /\b(texture|model|material|block_item|furniture_item)\b/.test(t) || /\bfurniture\s*:/.test(t),
      note: '方块要能放下或有外观',
    },
    {
      name: '礼部',
      duty: '典章（对照 Wiki）',
      ok: Boolean(hit?.url),
      note: hit?.url || '无 Wiki 出处则礼部不画押',
    },
    {
      name: '兵部',
      duty: '行为（behavior.type）',
      ok: !/\btype\s*:\s*(sittable|seat|falling|door)\b/.test(t) || /\btype\s*:\s*(seat_block|falling_block|door_block)\b/.test(t),
      note: '禁止短名 type，必须用 wiki 全名',
    },
    {
      name: '刑部',
      duty: '问责（lint error）',
      ok: ctx?.menxia?.sealed !== false,
      note: '有 error 则刑部驳回',
    },
    {
      name: '工部',
      duty: '营造（state/variants 结构）',
      ok: !/^\s*blocks\s*:/m.test(t) || /\b(state|states)\s*:/.test(t),
      note: '方块必须有 state',
    },
  ];
  return {
    office: '尚书省六部',
    passed: boards.filter((b) => b.ok).length,
    total: 6,
    ok: boards.every((b) => b.ok),
    boards,
  };
}

function pickKind(q, routed) {
  const s = (routed?.routes?.[0]?.suggest || q).toLowerCase();
  if (/座|椅|坐|seat/.test(s)) return 'seat';
  if (/门|door/.test(s)) return 'door';
  if (/作物|crop/.test(s)) return 'crop';
  if (/下落|falling/.test(s)) return 'falling';
  if (/家具|furniture/.test(s)) return 'furniture';
  if (/配方|recipe/.test(s)) return 'recipe';
  if (/物品|item/.test(s)) return 'item';
  return 'block';
}

function edict(zhong, men, bu) {
  const ok = men.sealed && bu.ok;
  const md = [];
  md.push(`# ${ok ? '准奏' : '封驳'} · 三省六部`);
  md.push('');
  md.push(`- 中书：${zhong.draft?.kind} \`${zhong.draft?.id}\``);
  md.push(`- 门下：${men.sealed ? '副署' : '封还'}（error=${men.lint?.summary?.error ?? '?'}）`);
  md.push(`- 六部：${bu.passed}/${bu.total} 画押`);
  if (zhong.wikiHit?.url) md.push(`- 礼部出处：${zhong.wikiHit.url}`);
  md.push('');
  if (ok && zhong.draft?.yaml) {
    md.push('## 准予施行的 YAML');
    md.push('```yaml');
    md.push(zhong.draft.yaml.trimEnd());
    md.push('```');
  } else {
    md.push('## 发还事由');
    for (const i of men.lint?.issues || []) md.push(`- [${i.level}] ${i.msg}`);
    for (const b of bu.boards.filter((x) => !x.ok)) md.push(`- ${b.name}未画押：${b.note}`);
  }
  return md.join('\n');
}

if (!cmd || !['draft', 'review', 'issue', 'run', 'apply', 'status'].includes(cmd)) {
  console.error('用法: node liubu.mjs <draft|review|issue|run|apply|status> ...');
  process.exit(1);
}

if (cmd === 'draft') {
  const q = rest.join(' ') || '自定义方块';
  const z = zhongshu(q, 'default:draft');
  console.log(JSON.stringify(z, null, 2));
  process.exit(0);
}

if (cmd === 'review') {
  const file = rest[0];
  if (!file) { console.error('review 需要文件或 -'); process.exit(1); }
  const text = file === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(file, 'utf8');
  const m = menxia(text);
  console.log(JSON.stringify(m, null, 2));
  process.exit(m.sealed ? 0 : 1);
}

if (cmd === 'issue') {
  const file = rest[0];
  if (!file) { console.error('issue 需要文件或 -'); process.exit(1); }
  const text = file === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(file, 'utf8');
  const m = menxia(text);
  const b = liubu(text, { menxia: m, wikiHit: { url: 'local' } });
  console.log(JSON.stringify({ menxia: m, liubu: b }, null, 2));
  process.exit(b.ok ? 0 : 1);
}

function archiveDir() {
  const pack = path.resolve(here, '..');
  return path.join(pack, 'edicts');
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

if (cmd === 'run') {
  const q = rest.filter((a) => !a.includes(':') && a !== '--save').join(' ') || rest[0] || '自定义方块';
  const id = rest.find((a) => a.includes(':')) || 'default:draft';
  const z = zhongshu(q, id);
  const yaml = z.draft?.yaml || '';
  const m = menxia(yaml);
  const b = liubu(yaml, { menxia: m, wikiHit: z.wikiHit });
  const ok = m.sealed && b.ok;
  const text = edict(z, m, b);
  const out = { ok, zhongshu: z, menxia: m, liubu: b, edict: text };
  if (ok) {
    const dir = archiveDir();
    fs.mkdirSync(dir, { recursive: true });
    const base = `${stamp()}_${(id || 'draft').replace(/[^\w.-]+/g, '_')}`;
    fs.writeFileSync(path.join(dir, base + '.yml'), yaml);
    fs.writeFileSync(path.join(dir, base + '.md'), text + '\n');
    out.saved = path.join(dir, base + '.yml');
  }
  console.log(JSON.stringify(out, null, 2));
  process.exit(ok ? 0 : 1);
}

if (cmd === 'apply') {
  const file = rest[0];
  const dest = rest[1];
  if (!file) {
    console.error('apply 需要准奏 yml，可选目标路径');
    process.exit(1);
  }
  const r = run('apply.mjs', dest ? [file, dest] : [file]);
  console.log(JSON.stringify(r.json, null, 2));
  process.exit(r.status);
}

if (cmd === 'status') {
  const dir = archiveDir();
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.yml')).sort().reverse()
    : [];
  console.log(JSON.stringify({ office: '尚书省', edicts: files.slice(0, 20), dir }, null, 2));
  process.exit(0);
}
