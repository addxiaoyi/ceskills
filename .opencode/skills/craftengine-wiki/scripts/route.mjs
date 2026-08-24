#!/usr/bin/env node
/**
 * 把自然语言问题路由到 wiki 栏目 + 建议检索词。
 * 用法: node route.mjs "怎么做能坐的椅子"
 */
const q = process.argv.slice(2).join(' ').trim();
if (!q) {
  console.error('用法: node route.mjs <问题>');
  process.exit(1);
}

const RULES = [
  { re: /坐|椅|座|sofa|seat/i, type: 'Block', suggest: '座椅', path: 'configuration/block/behaviors/seat_block' },
  { re: /门|door/i, type: 'Block', suggest: '门', path: 'configuration/block/behaviors/door_block' },
  { re: /作物|crop|生长/i, type: 'Block', suggest: '作物', path: 'configuration/block/behaviors/crop_block' },
  { re: /下落|falling|沙子/i, type: 'Block', suggest: '下落', path: 'configuration/block/behaviors/falling_block' },
  { re: /家具|furniture|bench/i, type: 'Block', suggest: '家具', path: 'configuration/furniture' },
  { re: /第一个方块|做方块|自定义方块/i, type: 'Block', suggest: '第一个方块', path: 'getting_start/first_block' },
  { re: /第一个物品|做物品/i, type: 'Item', suggest: '第一个物品', path: 'getting_start/items' },
  { re: /物品|item|剑|工具/i, type: 'Item', suggest: '物品', path: 'configuration/item' },
  { re: /配方|合成|recipe/i, type: 'Recipe', suggest: '配方', path: 'configuration/recipe' },
  { re: /战利品|loot|掉落/i, type: 'Config', suggest: '战利品', path: 'reference/loot_table' },
  { re: /事件|event|点击|破坏/i, type: 'Event', suggest: '事件', path: 'reference/events' },
  { re: /条件|condition/i, type: 'Config', suggest: '条件', path: 'reference/conditions' },
  { re: /兼容|papi|mythic|skript/i, type: 'Compat', suggest: '兼容', path: 'compatibility' },
  { re: /安装|reload|入门/i, type: 'Config', suggest: '安装', path: 'getting_start/installation' },
  { re: /模板|template/i, type: 'Config', suggest: '模板', path: 'reference/template' },
  { re: /行为|behavior/i, type: 'Block', suggest: '方块行为', path: 'configuration/block/behaviors' },
  { re: /模型|贴图|texture|model/i, type: 'Item', suggest: '物品模型', path: 'configuration/item/models' },
  { re: /api|接口/i, type: 'API', suggest: 'api', path: 'api' },
  { re: /附加|addon|模组/i, type: 'Addon', suggest: '附加组件', path: 'addon' },
];

const hits = RULES.filter((r) => r.re.test(q));
const out = {
  question: q,
  routes: hits.length
    ? hits.map((h) => ({
        type: h.type,
        suggest: h.suggest,
        url: `https://ce-pre.gtemc.cn/zh-Hans/${h.path}`,
        query: `node scripts/query.mjs "${h.suggest}"`,
      }))
    : [
        {
          type: 'Config',
          suggest: q.slice(0, 12),
          url: 'https://ce-pre.gtemc.cn/zh-Hans/configuration',
          query: `node scripts/query.mjs "${q}"`,
        },
      ],
};
console.log(JSON.stringify(out, null, 2));
