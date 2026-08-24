#!/usr/bin/env node
/**
 * 按意图生成可粘贴的 CraftEngine YAML（键名来自 wiki schema）。
 * 用法: node generate.mjs seat default:oak_chair
 *       node generate.mjs block default:topaz_block
 *       node generate.mjs item default:ruby
 *       node generate.mjs furniture default:bench
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
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const kind = (process.argv[2] || '').trim();
let id = process.argv[3] || 'default:example';
if (!kind) {
  console.error('用法: node generate.mjs <block|item|seat|door|crop|falling|furniture|recipe> [id]');
  process.exit(1);
}
if (!id.includes(':')) id = 'default:' + id;
if (!/^[a-z0-9_.-]+:[a-z0-9_./-]+$/i.test(id)) {
  console.error('非法 id，应为 namespace:path ，例如 default:oak_chair');
  process.exit(1);
}

const T = {
  block: () => `blocks:
  ${id}:
    state:
      auto_state: note_block
      model:
        texture: minecraft:block/stone
    settings:
      hardness: 1.5
      resistance: 6.0
      tags:
        - minecraft:mineable/pickaxe
`,
  item: () => `items:
  ${id}:
    material: paper
    texture: minecraft:item/paper
    data:
      item_name: "<white>${id}"
`,
  seat: () => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
items:
  ${id}:
    material: paper
    behavior:
      type: block_item
      block: ${id}
`,
  door: () => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: door_block
`,
  crop: () => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: crop_block
`,
  falling: () => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: falling_block
`,
  furniture: () => `furniture:
  ${id}:
    variants:
      ground:
        elements:
          - item: ${id}
        hitboxes:
          - position: 0,0,0
            type: shulker
        seats:
          - 0,0.35,0
    settings:
      hit_times: 3
items:
  ${id}:
    material: paper
    behavior:
      type: furniture_item
      furniture: ${id}
`,
  recipe: () => `recipes:
  ${id}:
    type: shaped
    pattern:
      - " A "
      - " A "
      - " B "
    ingredients:
      A: minecraft:stick
      B: minecraft:oak_planks
    result: ${id}
`,
};

const fn = T[kind] || T[schema.typos[kind]] || null;
if (!fn) {
  console.error('未知类型。可选: ' + Object.keys(T).join(', '));
  process.exit(1);
}
const yaml = fn();
const wiki = {
  block: 'configuration/block',
  item: 'configuration/item',
  seat: 'configuration/block/behaviors/seat_block',
  door: 'configuration/block/behaviors/door_block',
  crop: 'configuration/block/behaviors/crop_block',
  falling: 'configuration/block/behaviors/falling_block',
  furniture: 'configuration/furniture',
  recipe: 'configuration/recipe',
}[kind];
console.log(JSON.stringify({
  kind,
  id,
  yaml,
  wiki: 'https://ce-pre.gtemc.cn/zh-Hans/' + wiki,
  next: '把 yaml 存成文件后: node lint.mjs <file.yml>',
}, null, 2));
