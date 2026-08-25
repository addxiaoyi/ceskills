/**
 * 中枢 - 意图路由
 * 根据关键词将用户问题路由到对应的 Wiki 页面
 */
import type { RouteResult } from './types.js';
import { getWikiConfig } from './config.js';

const RULES: Array<{ re: RegExp; type: string; suggest: string; path: string }> = [
  { re: /椅子|坐|椅|sofa|seat/i, type: 'Block', suggest: '椅子', path: 'configuration/block/behaviors/seat_block' },
  { re: /门/i, type: 'Block', suggest: '门', path: 'configuration/block/behaviors/door_block' },
  { re: /作物|农作物|crop/i, type: 'Block', suggest: '作物', path: 'configuration/block/behaviors/crop_block' },
  { re: /掉落表|战利品|loot表|loot/i, type: 'Config', suggest: '掉落表', path: 'reference/loot_table' },
  { re: /下落|掉落|falling/i, type: 'Block', suggest: '下落', path: 'configuration/block/behaviors/falling_block' },
  { re: /家具|长椅|furniture|bench/i, type: 'Block', suggest: '家具', path: 'configuration/furniture' },
  { re: /第一个方块|新手方块/i, type: 'Block', suggest: '第一个方块', path: 'getting_start/first_block' },
  { re: /第一个物品|新手物品/i, type: 'Item', suggest: '第一个物品', path: 'getting_start/items' },
  { re: /物品|item/i, type: 'Item', suggest: '物品', path: 'configuration/item' },
  { re: /配方|合成|recipe/i, type: 'Recipe', suggest: '配方', path: 'configuration/recipe' },
  { re: /事件|event/i, type: 'Event', suggest: '事件', path: 'reference/events' },
  { re: /条件/i, type: 'Config', suggest: '条件', path: 'reference/conditions' },
  { re: /兼容|papi|mythic|skript/i, type: 'Compat', suggest: '兼容', path: 'compatibility' },
  { re: /安装|重载|installation/i, type: 'Config', suggest: '安装', path: 'getting_start/installation' },
  { re: /模板|template/i, type: 'Config', suggest: '模板', path: 'reference/template' },
  { re: /行为|behavior/i, type: 'Block', suggest: '行为', path: 'configuration/block/behaviors' },
  { re: /纹理|模型|texture|model/i, type: 'Item', suggest: '物品模型', path: 'configuration/item/models' },
  { re: /api|接口/i, type: 'API', suggest: 'API', path: 'api' },
  { re: /插件|addon|模组/i, type: 'Addon', suggest: '插件', path: 'addon' },
];

export function route(question: string): RouteResult {
  const q = question.trim();
  if (!q) {
    throw new Error('问题不能为空');
  }

  const wiki = getWikiConfig();
  const hits = RULES.filter((r) => r.re.test(q));

  return {
    question: q,
    routes: hits.length
      ? hits.map((h) => ({
          type: h.type,
          suggest: h.suggest,
          url: `${wiki.baseUrl}/${h.path}`,
          query: `npx tsx src/query.ts "${h.suggest}"`,
        }))
      : [
          {
            type: 'Config',
            suggest: q.slice(0, 12),
            url: wiki.indexUrl,
            query: `npx tsx src/query.ts "${q}"`,
          },
        ],
  };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('route.ts') || process.argv[1]?.endsWith('route.mjs');
if (isMainModule) {
  const q = process.argv.slice(2).join(' ').trim();
  if (!q) {
    console.error('用法: npx tsx src/route.ts <问题>');
    process.exit(1);
  }
  console.log(JSON.stringify(route(q), null, 2));
}