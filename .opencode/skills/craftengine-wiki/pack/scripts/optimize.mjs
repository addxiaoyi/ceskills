#!/usr/bin/env node
/**
 * 给已有 YAML 提优化建议（不改文件）。
 * 用法: node optimize.mjs <file.yml|->
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = process.argv[2];
if (!arg) {
  console.error('用法: node optimize.mjs <file.yml|->');
  process.exit(1);
}
const text = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');
const lint = spawnSync(process.execPath, [path.join(here, 'lint.mjs'), arg === '-' ? '-' : arg], {
  encoding: 'utf8',
  input: arg === '-' ? text : undefined,
});
let lintJson = {};
try { lintJson = JSON.parse(lint.stdout || '{}'); } catch { lintJson = { raw: lint.stdout }; }

const tips = [];
if (/\bblocks\s*:/.test(text) && !/\bsounds\s*:/.test(text)) {
  tips.push({ tip: '补 sounds（break/step/place），手感会像原版', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/settings' });
}
if (/\bblocks\s*:/.test(text) && !/\btags\s*:/.test(text)) {
  tips.push({ tip: '给 tags: minecraft:mineable/pickaxe 等，否则挖掘速度不对', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/reference/block_tags' });
}
if (/\btype\s*:\s*block_item\b/.test(text) && !/\bitems\s*:/.test(text)) {
  tips.push({ tip: '方块要能放下，需要 items + behavior.type: block_item' });
}
if (/\btype\s*:\s*seat_block\b/.test(text) && !/\bfacing\b/.test(text)) {
  tips.push({ tip: '座椅若要随朝向转，给 facing: horizontal_direction', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block' });
}
if (/\bitems\s*:/.test(text) && !/\bitem_name\s*:/.test(text) && !/\bdata\s*:/.test(text)) {
  tips.push({ tip: '物品建议 data.item_name，否则背包里是原版名' });
}
if (/\brecipe/.test(text) && !/\bresult\s*:/.test(text) && /^\s*recipes\s*:/m.test(text)) {
  tips.push({ tip: '配方需要 result', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/recipe' });
}

console.log(JSON.stringify({
  lint: lintJson,
  optimize: tips,
  ok: lintJson.ok !== false,
}, null, 2));
process.exit(lintJson.ok === false ? 1 : 0);
