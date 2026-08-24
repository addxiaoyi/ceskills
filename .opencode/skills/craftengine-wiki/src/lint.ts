/**
 * 门下 - YAML 校验
 * 基于 schema.json 校验 behavior.type、必填字段、ID 格式等
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { LintResult, LintIssue } from './types.js';
import { getPaths, getLintConfig, getValidationConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadSchema() {
  const schemaPath = getPaths().schema;
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema 不存在: ${schemaPath}`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

function add(issues: LintIssue[], kinds: { error: number; warn: number; info: number }, level: 'error' | 'warn' | 'info', msg: string, hint: string = '') {
  kinds[level]++;
  issues.push({ level, msg, hint });
}

export function lint(text: string, fileArg: string = '-'): LintResult {
  const schema = loadSchema();
  const lintConfig = getLintConfig();
  const validation = getValidationConfig();

  const issues: LintIssue[] = [];
  const kinds = { error: 0, warn: 0, info: 0 };

  const allBehaviors = new Set([
    ...schema.blockBehaviors,
    ...schema.itemBehaviors,
    ...schema.furnitureBehaviors,
  ]);
  const extraTypes = new Set([
    ...(schema.recipeTypes || []),
    'shulker', 'interaction', 'item_display', 'block_display', 'text_display',
    'minecraft:model', 'model',
  ]);

  const hasBlocks = /^\s*blocks\s*:/m.test(text);
  const hasItems = /^\s*items\s*:/m.test(text);
  const hasFurniture = /^\s*furniture\s*:/m.test(text);
  const hasRecipes = /^\s*recipes\s*:/m.test(text);

  if (!hasBlocks && !hasItems && !hasFurniture && !hasRecipes) {
    add(issues, kinds, 'warn', '未声明任何顶级键 blocks/items/furniture/recipes', schema.wiki || '');
  }

  // 必填字段校验
  if (hasBlocks && !/\b(state|states)\s*:/.test(text)) {
    add(issues, kinds, 'error', 'Block 必须包含 state/states', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block');
  }
  if (hasFurniture && !/\bvariants\s*:/.test(text)) {
    add(issues, kinds, 'error', 'Furniture 必须包含 variants', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture');
  }

  // behavior.type 校验
  const typeRe = /\btype\s*:\s*["']?([A-Za-z0-9_.:-]+)/g;
  const seenTypes: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = typeRe.exec(text))) {
    const t = m[1];
    seenTypes.push(t);
    if (allBehaviors.has(t) || extraTypes.has(t) || t.startsWith('minecraft:')) continue;
    if (schema.typos?.[t]) {
      add(issues, kinds, 'error', `未知 behavior.type: ${t}，建议 ${schema.typos[t]}`, `pnpm skill:query ${schema.typos[t]}`);
    } else if (/_block$|_item$|_furniture$/.test(t)) {
      add(issues, kinds, 'error', `未知 behavior.type: ${t}`, 'pnpm skill:list Block');
    } else {
      add(issues, kinds, 'error', `未知 behavior.type: ${t}，不在白名单中`, 'pnpm skill:list Block');
    }
  }

  // 关联字段校验
  if (/\btype\s*:\s*block_item\b/.test(text) && !/\bblock\s*:/.test(text)) {
    add(issues, kinds, 'error', 'block_item 需要指定 block', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/block_item');
  }
  if (/\btype\s*:\s*furniture_item\b/.test(text) && !/\bfurniture\s*:/.test(text)) {
    add(issues, kinds, 'error', 'furniture_item 需要指定 furniture', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/furniture_item');
  }
  if (/\btype\s*:\s*seat_block\b/.test(text) && !/\bseats\s*:/.test(text)) {
    add(issues, kinds, 'warn', 'seat_block 建议配置 seats', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block');
  }
  if (/\btype\s*:\s*strippable_block\b/.test(text) && !/\bstripped\s*:/.test(text)) {
    add(issues, kinds, 'error', 'strippable_block 必须配置 stripped', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/strippable_block');
  }

  // 数值范围校验
  const hm = text.match(/\bhardness\s*:\s*(-?[\d.]+)/);
  if (hm) {
    const h = Number(hm[1]);
    if (h < 0) add(issues, kinds, 'error', 'hardness 不能为负');
    if (h === 0) add(issues, kinds, 'info', 'hardness: 0 表示不可破坏');
    if (h > 100) add(issues, kinds, 'warn', 'hardness 过大，建议检查');
  }
  const rm = text.match(/\bresistance\s*:\s*(-?[\d.]+)/);
  if (rm && Number(rm[1]) < 0) add(issues, kinds, 'error', 'resistance 不能为负');
  const lm = text.match(/\bluminance\s*:\s*(-?[\d.]+)/);
  if (lm) {
    const v = Number(lm[1]);
    if (v < 0 || v > 15) add(issues, kinds, 'error', 'luminance 必须在 0-15');
  }

  // 占位符检查
  if (/namespace:path|\bmy_block\b|\bmy_item\b|\bxxx\b|\bTODO\b|\bchangeme\b/i.test(text)) {
    add(issues, kinds, 'warn', '发现占位符 namespace:path / my_block / xxx / TODO / changeme，请替换为真实 ID');
  }
  if (/\bbehavior\s*:/.test(text) && !/\btype\s*:/.test(text)) {
    add(issues, kinds, 'error', '声明 behavior 必须包含 type');
  }

  // ID 格式校验
  const idPattern = new RegExp(validation.idPattern);
  const skipKeys = new Set([
    'state', 'states', 'settings', 'behavior', 'behaviors', 'loot', 'events', 'data', 'model',
    'variants', 'material', 'texture', 'seats', 'tags', 'sounds', 'block', 'item', 'furniture',
  ]);

  const lines = text.split(/\r?\n/);
  let inRoot = false;
  for (const line of lines) {
    if (/^(blocks|items|furniture|recipes)\s*:/.test(line)) { inRoot = true; continue; }
    if (inRoot && /^\S/.test(line) && !/^(blocks|items|furniture|recipes)\s*:/.test(line)) inRoot = false;
    const mm = line.match(/^  ([A-Za-z0-9_.:-]+)\s*:/);
    if (!inRoot || !mm) continue;
    const id = mm[1];
    if (skipKeys.has(id) || id.includes(':')) continue;
    if (!idPattern.test(id)) {
      add(issues, kinds, 'error', `顶级 ID 必须符合 namespace:path 格式: ${id}`);
    }
  }

  // block_item 提示配套 items
  if (hasBlocks && !hasItems && /\btype\s*:\s*seat_block\b/.test(text)) {
    add(issues, kinds, 'info', 'seat_block 通常需要配套 items + block_item 以便手持');
  }

  const out: LintResult = {
    ok: kinds.error === 0,
    file: fileArg,
    summary: kinds,
    typesFound: [...new Set(seenTypes)],
    issues,
    wiki: schema.wiki || 'https://ce-pre.gtemc.cn/zh-Hans/configuration',
  };
  return out;
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('lint.ts') || process.argv[1]?.endsWith('lint.mjs');
if (isMainModule) {
  const arg = process.argv[2];
  if (!arg) {
    console.error('用法: npx tsx src/lint.ts <file.yml|->');
    process.exit(1);
  }
  const text = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');
  const result = lint(text, arg);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}