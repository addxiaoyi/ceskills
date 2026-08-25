/**
 * 门下 - 优化建议
 * 基于 Lint 结果给出改进建议
 */
import * as fs from 'node:fs';
import type { OptimizeResult, OptimizeTip } from './types.js';
import { lint } from './lint.js';

export function optimize(text: string, fileArg: string = '-'): OptimizeResult {
  const lintResult = lint(text, fileArg);
  const tips: OptimizeTip[] = [];

  if (/\bblocks\s*:/.test(text) && !/\bsounds\s*:/.test(text)) {
    tips.push({ tip: '建议补充 sounds (break/step/place) 提升手感', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/settings' });
  }
  if (/\bblocks\s*:/.test(text) && !/\btags\s*:/.test(text)) {
    tips.push({ tip: '建议添加 tags: minecraft:mineable/pickaxe 等标签', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/reference/block_tags' });
  }
  if (/\btype\s*:\s*block_item\b/.test(text) && !/\bitems\s*:/.test(text)) {
    tips.push({ tip: 'block_item 必须配套 items + behavior.type: block_item' });
  }
  if (/\btype\s*:\s*seat_block\b/.test(text) && !/\bfacing\b/.test(text)) {
    tips.push({ tip: 'seat_block 建议添加 facing: horizontal_direction 支持转向', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/block/behaviors/seat_block' });
  }
  if (/\bitems\s*:/.test(text) && !/\bitem_name\s*:/.test(text) && !/\bdata\s*:/.test(text)) {
    tips.push({ tip: '物品建议配置 data.item_name 自定义显示名' });
  }
  if (/\brecipe/.test(text) && !/\bresult\s*:/.test(text) && /^\s*recipes\s*:/m.test(text)) {
    tips.push({ tip: '配方必须包含 result', wiki: 'https://ce-pre.gtemc.cn/zh-Hans/configuration/recipe' });
  }

  return {
    lint: lintResult,
    optimize: tips,
    ok: lintResult.ok !== false,
  };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('optimize.ts') || process.argv[1]?.endsWith('optimize.mjs');
if (isMainModule) {
  const arg = process.argv[2];
  if (!arg) {
    console.error('用法: npx tsx src/optimize.ts <file.yml|->');
    process.exit(1);
  }
  const text = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');
  console.log(JSON.stringify(optimize(text, arg), null, 2));
  process.exit(0);
}