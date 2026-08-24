#!/usr/bin/env node
/**
 * 审核 CraftEngine YAML：未知 behavior、缺必填、ID、危险设置。
 * 用法: node lint.mjs <file.yml|->
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = [
  path.join(here, 'schema.json'),
  path.join(here, '../schema.json'),
  path.join(here, '../../scripts/schema.json'),
].find((p) => fs.existsSync(p));
if (!schemaPath) {
  console.error('找不到 schema.json');
  process.exit(1);
}
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const arg = process.argv[2];
if (!arg) {
  console.error('用法: node lint.mjs <file.yml>  或  type file.yml | node lint.mjs -');
  process.exit(1);
}
const text = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');

const issues = [];
const kinds = { error: 0, warn: 0, info: 0 };
function add(level, msg, hint) {
  kinds[level]++;
  issues.push({ level, msg, hint: hint || '' });
}

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
  add('warn', '看不出顶层 blocks/items/furniture/recipes', 'https://ce-pre.gtemc.cn/zh-Hans/configuration');
}

if (hasBlocks && !/\b(state|states)\s*:/.test(text)) {
  add('error', '方块缺少必填 state/states', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block');
}
if (hasFurniture && !/\bvariants\s*:/.test(text)) {
  add('error', '家具缺少必填 variants', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/furniture');
}

const typeRe = /\btype\s*:\s*["']?([A-Za-z0-9_.:-]+)/g;
const seenTypes = [];
let m;
while ((m = typeRe.exec(text))) {
  const t = m[1];
  seenTypes.push(t);
  if (allBehaviors.has(t) || extraTypes.has(t) || t.startsWith('minecraft:')) continue;
  if (schema.typos[t]) {
    add('error', `未知 type: ${t}，应为 ${schema.typos[t]}`, 'pnpm skill:query ' + schema.typos[t]);
  } else if (/_block$|_item$|_furniture$/.test(t)) {
    add('error', `未知 behavior.type: ${t}`, 'pnpm skill:list Block');
  }
}

if (/\btype\s*:\s*block_item\b/.test(text) && !/\bblock\s*:/.test(text)) {
  add('error', 'block_item 必须指定 block', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/block_item');
}
if (/\btype\s*:\s*furniture_item\b/.test(text) && !/\bfurniture\s*:/.test(text)) {
  add('error', 'furniture_item 必须指定 furniture', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/item/behaviors/furniture_item');
}
if (/\btype\s*:\s*seat_block\b/.test(text) && !/\bseats\s*:/.test(text)) {
  add('warn', 'seat_block 建议配置 seats', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block');
}
if (/\btype\s*:\s*strippable_block\b/.test(text) && !/\bstripped\s*:/.test(text)) {
  add('error', 'strippable_block 需要 stripped', 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/strippable_block');
}

const hm = text.match(/\bhardness\s*:\s*(-?[\d.]+)/);
if (hm) {
  const h = Number(hm[1]);
  if (h < 0) add('error', 'hardness 不能为负');
  if (h === 0) add('info', 'hardness: 0 会瞬间破坏');
  if (h > 100) add('warn', 'hardness 过大，可能挖不动');
}
const rm = text.match(/\bresistance\s*:\s*(-?[\d.]+)/);
if (rm && Number(rm[1]) < 0) add('error', 'resistance 不能为负');
const lm = text.match(/\bluminance\s*:\s*(-?[\d.]+)/);
if (lm) {
  const v = Number(lm[1]);
  if (v < 0 || v > 15) add('error', 'luminance 必须在 0–15');
}

if (/namespace:path|\bmy_block\b|\bmy_item\b|\bxxx\b|\bTODO\b|\bchangeme\b/i.test(text)) {
  add('warn', '还留着示例占位符（my_block / xxx / TODO）');
}
if (/\bbehavior\s*:/.test(text) && !/\btype\s*:/.test(text)) {
  add('error', '写了 behavior 但没有 type');
}

const skipKeys = new Set([
  'state', 'states', 'settings', 'behavior', 'behaviors', 'loot', 'events', 'data', 'model',
  'variants', 'material', 'texture', 'seats', 'tags', 'sounds', 'block', 'item', 'furniture',
]);
const idRe = /^(?:blocks|items|furniture|recipes)\s*:\s*$/m;
const lines = text.split(/\r?\n/);
let inRoot = false;
for (const line of lines) {
  if (/^(blocks|items|furniture|recipes)\s*:/.test(line)) { inRoot = true; continue; }
  if (inRoot && /^\S/.test(line) && !/^(blocks|items|furniture|recipes)\s*:/.test(line)) inRoot = false;
  const mm = line.match(/^  ([A-Za-z0-9_.:-]+)\s*:/);
  if (!inRoot || !mm) continue;
  const id = mm[1];
  if (skipKeys.has(id) || id.includes(':')) continue;
  add('error', `条目 ID 缺少命名空间: ${id}（应为 namespace:path）`);
}

if (hasBlocks && !hasItems && /\btype\s*:\s*seat_block\b/.test(text)) {
  add('info', '座椅方块通常还要配 items + block_item 才能放下去');
}

const out = {
  ok: kinds.error === 0,
  file: arg,
  summary: kinds,
  typesFound: [...new Set(seenTypes)],
  issues,
  wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration',
};
console.log(JSON.stringify(out, null, 2));
process.exit(kinds.error ? 1 : 0);
