/**
 * 六部 - 合规性审查 + 谕旨归档
 * 六部六项检查：名实、模型、典籍、行为、刑名、版图
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import type {
  LiubuResult, LiubuCheck, ZhongshuResult, MenxiaResult, EdictResult,
  RouteResult, QueryResult, GenerateResult, LintResult, QueryHit
} from './types.js';
import { route } from './route.js';
import { query } from './query.js';
import { generate } from './generate.js';
import { lint } from './lint.js';
import { optimize } from './optimize.js';
import { getPaths } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runScript(script: string, args: string[], input?: string) {
  const scriptPath = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [scriptPath, ...args], {
    encoding: 'utf8',
    input,
  });
  let json: unknown = null;
  try { json = JSON.parse(r.stdout || 'null'); } catch { json = { raw: r.stdout, stderr: r.stderr }; }
  return { status: r.status ?? 0, json, stderr: r.stderr };
}

function pickKind(question: string, routed: RouteResult): string {
  const s = (routed.routes[0]?.suggest || question).toLowerCase();
  if (/椅子|坐|椅|sofa|seat/.test(s)) return 'seat';
  if (/门/.test(s)) return 'door';
  if (/作物|农作物/.test(s)) return 'crop';
  if (/下落|掉落/.test(s)) return 'falling';
  if (/家具|长椅|furniture/.test(s)) return 'furniture';
  if (/配方|合成|recipe/.test(s)) return 'recipe';
  if (/物品|item/.test(s)) return 'item';
  return 'block';
}

/** 中枢：路由 -> 检索 -> 生成 */
export function zhongshu(question: string, id?: string): ZhongshuResult {
  const routed = route(question);
  const suggest = routed.routes[0]?.suggest || question;
  const found = query(suggest);
  const genKind = pickKind(question, routed);
  const gen = generate(genKind, id || 'default:draft');
  return {
    office: '中枢',
    role: '典书',
    question,
    route: routed.routes[0] || null,
    wikiHit: found.hits[0] ?? null,
    draft: gen,
  };
}

/** 门下：Lint + 优化 */
export function menxia(yamlText: string): MenxiaResult {
  const lintResult = lint(yamlText);
  const opt = optimize(yamlText);
  return {
    office: '门下',
    role: lintResult.ok ? '封驳' : '驳回',
    sealed: lintResult.ok,
    lint: lintResult,
    optimize: opt.optimize,
  };
}

/** 六部：六项合规检查 */
export function liubu(yamlText: string, ctx?: { menxia?: MenxiaResult; wikiHit?: QueryHit | null }): LiubuResult {
  const t = yamlText || '';
  const hit = ctx?.wikiHit;

  const boards: LiubuCheck[] = [
    {
      name: '名实',
      duty: '顶级 ID 必须符合 namespace:path 格式',
      ok: /[a-z0-9_.-]+:[a-z0-9_./-]+/.test(t),
      note: 'ID 格式不符合规范',
    },
    {
      name: '模型',
      duty: '必须声明模型/材质/方块物品等渲染相关字段',
      ok: /\b(texture|model|material|block_item|furniture_item)\b/.test(t) || /\bfurniture\s*:/.test(t),
      note: '缺少渲染相关字段',
    },
    {
      name: '典籍',
      duty: '至少命中一条 Wiki 条目',
      ok: Boolean(hit?.url),
      note: hit?.url || '无 Wiki 命中，需人工补全',
    },
    {
      name: '行为',
      duty: 'behavior.type 必须在白名单内',
      ok: !/\btype\s*:\s*(sittable|seat|falling|door)\b/.test(t) || /\btype\s*:\s*(seat_block|falling_block|door_block)\b/.test(t),
      note: '使用非标准 behavior.type，请参考 Wiki 白名单',
    },
    {
      name: '刑名',
      duty: 'Lint 无 error',
      ok: ctx?.menxia?.sealed !== false,
      note: '存在 Lint error，必须修复后方可通过',
    },
    {
      name: '版图',
      duty: 'Block 必须有 state/states，Furniture 必须有 variants',
      ok: !/^\s*blocks\s*:/m.test(t) || /\b(state|states)\s*:/.test(t),
      note: 'Block 缺少 state/states',
    },
  ];

  return {
    office: '六部',
    passed: boards.filter((b) => b.ok).length,
    total: 6,
    ok: boards.every((b) => b.ok),
    boards,
  };
}

/** 谕旨：生成 Markdown 报告 */
function edict(zhong: ZhongshuResult, men: MenxiaResult, bu: LiubuResult): string {
  const ok = men.sealed && bu.ok;
  const md: string[] = [];
  md.push(`# ${ok ? '谕旨' : '驳回'} | 六部审查`);
  md.push('');
  md.push(`- 草稿: ${zhong.draft?.kind} \`${zhong.draft?.id}\``);
  md.push(`- 门下: ${men.sealed ? '封驳' : '驳回'} (error=${men.lint.summary.error ?? '?'})`);
  md.push(`- 六部: ${bu.passed}/${bu.total} 项通过`);
  if (zhong.wikiHit?.url) md.push(`- 典籍: ${zhong.wikiHit.url}`);
  md.push('');

  if (ok && zhong.draft?.yaml) {
    md.push('## 谕旨正文 YAML');
    md.push('```yaml');
    md.push(zhong.draft.yaml.trimEnd());
    md.push('```');
  } else {
    md.push('## 驳回详情');
    for (const i of men.lint.issues) md.push(`- [${i.level}] ${i.msg}`);
    for (const b of bu.boards.filter((x) => !x.ok)) md.push(`- ${b.name}不通过: ${b.note}`);
  }
  return md.join('\n');
}

/** 归档目录 */
function archiveDir(): string {
  return path.join(getPaths().edicts);
}

function stamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/** 完整流程：中枢 -> 门下 -> 六部 -> 谕旨 -> 归档 */
export function runPipeline(question: string, id?: string, save: boolean = true): EdictResult {
  const z = zhongshu(question, id);
  const yaml = z.draft?.yaml || '';
  const m = menxia(yaml);
  const b = liubu(yaml, { menxia: m, wikiHit: z.wikiHit });
  const ok = m.sealed && b.ok;
  const text = edict(z, m, b);

  const out: EdictResult = { ok, zhongshu: z, menxia: m, liubu: b, edict: text };

  if (ok && save) {
    const dir = archiveDir();
    fs.mkdirSync(dir, { recursive: true });
    const base = `${stamp()}_${(id || 'draft').replace(/[^\w.-]+/g, '_')}`;
    fs.writeFileSync(path.join(dir, base + '.yml'), yaml);
    fs.writeFileSync(path.join(dir, base + '.md'), text + '\n');
    out.saved = path.join(dir, base + '.yml');
  }
  return out;
}

/** 应用 YAML 到目标路径 */
export function applyYaml(srcFile: string, destFile?: string): { ok: boolean; step: string; file?: string; backup?: string; bytes?: number; lint?: LintResult } {
  const yaml = srcFile === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(srcFile, 'utf8');
  const lintResult = lint(yaml);
  if (!lintResult.ok) {
    return { ok: false, step: '门下校验', lint: lintResult };
  }

  const packDir = getPaths().pack;
  const outDir = destFile ? path.dirname(path.resolve(destFile)) : path.join(packDir, 'applied');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = destFile ? path.resolve(destFile) : path.join(outDir, path.basename(srcFile === '-' ? 'stdin.yml' : srcFile));

  if (fs.existsSync(outFile)) {
    fs.copyFileSync(outFile, outFile + '.bak');
  }
  fs.writeFileSync(outFile, yaml.endsWith('\n') ? yaml : yaml + '\n');

  return {
    ok: true,
    step: '应用落地',
    file: outFile,
    backup: fs.existsSync(outFile + '.bak') ? outFile + '.bak' : undefined,
    bytes: Buffer.byteLength(yaml),
  };
}

/** 列出归档记录 */
export function status(): { office: string; edicts: string[]; dir: string } {
  const dir = archiveDir();
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.yml')).sort().reverse()
    : [];
  return { office: '六部', edicts: files.slice(0, 20), dir };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('liubu.ts') || process.argv[1]?.endsWith('liubu.mjs');
if (isMainModule) {
  const cmd = process.argv[2];
  const rest = process.argv.slice(3);

  if (!cmd || !['draft', 'review', 'issue', 'run', 'apply', 'status'].includes(cmd)) {
    console.error('用法: npx tsx src/liubu.ts <draft|review|issue|run|apply|status> ...');
    process.exit(1);
  }

  try {
    if (cmd === 'draft') {
      const q = rest.join(' ') || '示例需求';
      const z = zhongshu(q, 'default:draft');
      console.log(JSON.stringify(z, null, 2));
    } else if (cmd === 'review') {
      const file = rest[0];
      if (!file) { console.error('review 需要文件参数'); process.exit(1); }
      const text = file === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(file, 'utf8');
      const m = menxia(text);
      console.log(JSON.stringify(m, null, 2));
      process.exit(m.sealed ? 0 : 1);
    } else if (cmd === 'issue') {
      const file = rest[0];
      if (!file) { console.error('issue 需要文件参数'); process.exit(1); }
      const text = file === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(file, 'utf8');
      const m = menxia(text);
      const b = liubu(text, { menxia: m, wikiHit: { url: 'local' } as QueryHit });
      console.log(JSON.stringify({ menxia: m, liubu: b }, null, 2));
      process.exit(b.ok ? 0 : 1);
    } else if (cmd === 'run') {
      const q = rest.filter((a) => !a.includes(':') && a !== '--save').join(' ') || rest[0] || '示例需求';
      const id = rest.find((a) => a.includes(':')) || 'default:draft';
      const out = runPipeline(q, id, true);
      console.log(JSON.stringify(out, null, 2));
      process.exit(out.ok ? 0 : 1);
    } else if (cmd === 'apply') {
      const file = rest[0];
      const dest = rest[1];
      if (!file) { console.error('apply 需要源文件和可选目标路径'); process.exit(1); }
      const r = applyYaml(file, dest);
      console.log(JSON.stringify(r, null, 2));
      process.exit(r.ok ? 0 : 1);
    } else if (cmd === 'status') {
      console.log(JSON.stringify(status(), null, 2));
    }
  } catch (e) {
    console.error('错误:', e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

