/**
 * 中枢 - YAML 生成
 * 根据 kind 生成符合规范的模板 YAML
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { GenerateResult } from './types.js';
import { getPaths, getValidationConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadSchema() {
  const schemaPath = getPaths().schema;
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema 不存在: ${schemaPath}`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

const T: Record<string, (id: string) => string> = {
  block: (id) => `blocks:
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
  item: (id) => `items:
  ${id}:
    material: paper
    texture: minecraft:item/paper
    data:
      item_name: "<white>${id}"
`,
  seat: (id) => `blocks:
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
  door: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: door_block
`,
  crop: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: crop_block
`,
  falling: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: falling_block
`,
  furniture: (id) => `furniture:
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
  recipe: (id) => `recipes:
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

const WIKI_MAP: Record<string, string> = {
  block: 'configuration/block',
  item: 'configuration/item',
  seat: 'configuration/block/behaviors/seat_block',
  door: 'configuration/block/behaviors/door_block',
  crop: 'configuration/block/behaviors/crop_block',
  falling: 'configuration/block/behaviors/falling_block',
  furniture: 'configuration/furniture',
  recipe: 'configuration/recipe',
};

const VALID_KINDS = Object.keys(T);

export function generate(kind: string, id: string): GenerateResult {
  const normalizedKind = kind.toLowerCase();
  const fn = T[normalizedKind] || T[normalizedKind] || null;
  
  if (!fn) {
    throw new Error(`未知 kind: ${kind}，可选: ${VALID_KINDS.join(', ')}`);
  }

  if (!id.includes(':')) id = 'default:' + id;
  const validation = getValidationConfig();
  const idPattern = new RegExp(validation.idPattern);
  if (!idPattern.test(id)) {
    throw new Error(`ID 必须符合 namespace:path 格式，如 default:oak_chair`);
  }

  const yaml = fn(id);
  const wiki = WIKI_MAP[normalizedKind] || 'configuration';

  return {
    kind: normalizedKind,
    id,
    yaml,
    wiki: `https://ce-pre.gtemc.cn/zh-Hans/${wiki}`,
    next: '请将 YAML 保存到文件后校验: node lint.mjs <file.yml>',
  };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('generate.ts') || process.argv[1]?.endsWith('generate.mjs');
if (isMainModule) {
  const kind = (process.argv[2] || '').trim();
  let id = process.argv[3] || 'default:example';
  if (!kind) {
    console.error('用法: npx tsx src/generate.ts <block|item|seat|door|crop|falling|furniture|recipe> [id]');
    process.exit(1);
  }
  try {
    console.log(JSON.stringify(generate(kind, id), null, 2));
  } catch (e) {
    console.error('错误:', e instanceof Error ? e.message : e);
    process.exit(1);
  }
}