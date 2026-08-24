#!/usr/bin/env node
/**
 * 准奏后回写配置。只接受门下已副署的 YAML。
 * 用法:
 *   node apply.mjs edicts/xxx.yml [目标.yml]
 *   node apply.mjs - 目标.yml   # stdin
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
const dest = process.argv[3];
if (!src) {
  console.error('用法: node apply.mjs <准奏.yml|-> [目标.yml]');
  process.exit(1);
}

const yaml = src === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(src, 'utf8');
const lint = spawnSync(process.execPath, [path.join(here, 'lint.mjs'), '-'], {
  encoding: 'utf8',
  input: yaml,
});
let lintJson = {};
try {
  lintJson = JSON.parse(lint.stdout || '{}');
} catch {
  lintJson = { ok: false, issues: [{ level: 'error', msg: 'lint 无法解析' }] };
}
if (!lintJson.ok) {
  console.log(JSON.stringify({ ok: false, step: '门下封驳', lint: lintJson }, null, 2));
  process.exit(1);
}

const pack = path.resolve(here, '..');
const outDir = dest
  ? path.dirname(path.resolve(dest))
  : path.join(pack, 'applied');
fs.mkdirSync(outDir, { recursive: true });
const outFile = dest
  ? path.resolve(dest)
  : path.join(outDir, path.basename(src === '-' ? 'stdin.yml' : src));

if (fs.existsSync(outFile)) {
  fs.copyFileSync(outFile, outFile + '.bak');
}
fs.writeFileSync(outFile, yaml.endsWith('\n') ? yaml : yaml + '\n');

console.log(
  JSON.stringify(
    {
      ok: true,
      step: '工部营造 · 已落档',
      file: outFile,
      backup: fs.existsSync(outFile + '.bak') ? outFile + '.bak' : null,
      bytes: Buffer.byteLength(yaml),
    },
    null,
    2,
  ),
);
