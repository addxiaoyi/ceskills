/**
 * 中枢 - YAML 生成
 * 根据 kind 生成符合规范的模板 YAML
 */
import type { GenerateResult } from './types.js';
import { getValidationConfig } from './config.js';

/** 简单行为方块模板：所有仅替换 behavior type 的方块共用此工厂 */
function simpleBlock(type: string): (id: string) => string {
  return (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: ${type}
`;
}

/** 带配套物品的方块模板（block_item） */
function blockWithItem(type: string, itemType = 'block_item'): (id: string) => string {
  return (id) => `blocks:
  ${id}:
    state:
      auto_state: note_block
    behavior:
      type: ${type}
items:
  ${id}:
    behavior:
      type: ${itemType}
      block: ${id}
`;
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

  // ---- simpleBlock 系列 ----
  door: simpleBlock('door_block'),
  crop: simpleBlock('crop_block'),
  falling: simpleBlock('falling_block'),
  fence: simpleBlock('fence_block'),
  fence_gate: simpleBlock('fence_gate_block'),
  wall: simpleBlock('wall_block'),
  wall_block: simpleBlock('wall_block'),
  lamp: simpleBlock('lamp_block'),
  trapdoor: simpleBlock('trapdoor_block'),
  stairs: simpleBlock('stairs_block'),
  slab: simpleBlock('slab_block'),
  button: simpleBlock('button_block'),
  pressure_plate: simpleBlock('pressure_plate_block'),
  grass: simpleBlock('grass_block'),
  sapling: simpleBlock('sapling_block'),
  leaves: simpleBlock('leaves_block'),

  // ---- blockWithItem 系列 ----
  simple_storage: blockWithItem('simple_storage_block'),
  display_item: blockWithItem('display_item_block'),
  drawer: blockWithItem('drawer_block'),
  double_high: blockWithItem('double_high_block', 'double_high_block_item'),
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
  wall_block: 'configuration/block/behaviors/wall_block',
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
};

const VALID_KINDS = Object.keys(T);

export function generate(kind: string, id: string): GenerateResult {
  const normalizedKind = kind.toLowerCase();
  const fn = T[normalizedKind] ?? null;

  if (!fn) {
    const suggestions = VALID_KINDS
      .filter(k => k.startsWith(normalizedKind) || normalizedKind.startsWith(k))
      .slice(0, 5);
    const hint = suggestions.length > 0 ? `, 相似: ${suggestions.join(', ')}` : '';
    throw new Error(`未知 kind: ${kind}，可选: ${VALID_KINDS.join(', ')}${hint}`);
  }

  let finalId = id;
  if (!id.includes(':')) {
    // 如果用户传了不带冒号的 ID，自动添加 default: 前缀
    finalId = `default:${id}`;
  }
  // 验证最终的 ID 格式（包含前缀后）
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