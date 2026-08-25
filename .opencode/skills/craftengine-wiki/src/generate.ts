/**
 * 中枢 - YAML 生成
 * 根据 kind 生成符合规范的模板 YAML
 */
import type { GenerateResult } from './types.js';
import { getValidationConfig } from './config.js';

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
  fence: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: fence_block
`,
  fence_gate: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: fence_gate_block
`,
  wall: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: wall_block
`,
  lamp: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: lamp_block
`,
  trapdoor: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: trapdoor_block
`,
  stairs: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: stairs_block
`,
  slab: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: slab_block
`,
  button: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: button_block
`,
  pressure_plate: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: pressure_plate_block
`,
  wall_block: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: wall_block
`,
  grass: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: grass_block
`,
  sapling: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: sapling_block
`,
  leaves: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: leaves_block
`,
  simple_storage: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: simple_storage_block
items:
  ${id}:
    behavior:
      type: block_item
      block: ${id}
`,
  display_item: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: display_item_block
items:
  ${id}:
    behavior:
      type: block_item
      block: ${id}
`,
  double_high: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: double_high_block
items:
  ${id}:
    behavior:
      type: double_high_block_item
      block: ${id}
`,
  drawer: (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: drawer_block
items:
  ${id}:
    behavior:
      type: block_item
      block: ${id}
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
  fence: 'configuration/block/behaviors/fence_block',
  fence_gate: 'configuration/block/behaviors/fence_gate_block',
  wall: 'configuration/block/behaviors/wall_block',
  lamp: 'configuration/block/behaviors/lamp_block',
  trapdoor: 'configuration/block/behaviors/trapdoor_block',
  stairs: 'configuration/block/behaviors/stairs_block',
  slab: 'configuration/block/behaviors/slab_block',
  button: 'configuration/block/behaviors/button_block',
  pressure_plate: 'configuration/block/behaviors/pressure_plate_block',
  sapling: 'configuration/block/behaviors/sapling_block',
  leaves: 'configuration/block/behaviors/leaves_block',
  simple_storage: 'configuration/block/behaviors/simple_storage_block',
  display_item: 'configuration/block/behaviors/display_item_block',
  double_high: 'configuration/block/behaviors/double_high_block',
  drawer: 'configuration/block/behaviors/drawer_block',
  grass: 'configuration/block/behaviors/grass_block',
  wall_block: 'configuration/block/behaviors/wall_block',
};

const VALID_KINDS = Object.keys(T);

export function generate(kind: string, id: string): GenerateResult {
  const normalizedKind = kind.toLowerCase();
  const fn = T[normalizedKind] || null;
  
  if (!fn) {
    const suggestions = VALID_KINDS
      .filter(k => k.startsWith(normalizedKind) || normalizedKind.startsWith(k))
      .slice(0, 5);
    const hint = suggestions.length > 0 ? `, 相似: ${suggestions.join(', ')}` : '';
    throw new Error(`未知 kind: ${kind}，可选: ${VALID_KINDS.join(', ')}${hint}`);
  }

  const finalId = id.includes(':') ? id : `default:${id}`;
  const validation = getValidationConfig();
  const idPattern = new RegExp(validation.idPattern);
  if (!idPattern.test(finalId)) {
    throw new Error(`ID 必须符合 namespace:path 格式，如 default:oak_chair`);
  }

  const yaml = fn(finalId);
  const wiki = WIKI_MAP[normalizedKind] || 'configuration';

  return {
    kind: normalizedKind,
    id: finalId,
    yaml,
    wiki: `https://ce-pre.gtemc.cn/zh-Hans/${wiki}`,
    next: '请将 YAML 保存到文件后校验: npx tsx src/lint.ts <file.yml>',
  };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('generate.ts') || process.argv[1]?.endsWith('generate.mjs');
if (isMainModule) {
  const kind = (process.argv[2] || '').trim();
  const idArg = process.argv[3] || 'default:example';
  if (!kind) {
    console.error(`用法: npx tsx src/generate.ts <kind> [id]\n可选 kind: ${VALID_KINDS.join(', ')}`);
    process.exit(1);
  }
  try {
    console.log(JSON.stringify(generate(kind, idArg), null, 2));
  } catch (e) {
    console.error('错误:', e instanceof Error ? e.message : e);
    process.exit(1);
  }
}