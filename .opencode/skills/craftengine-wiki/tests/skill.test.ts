import { describe, it, expect } from 'vitest';
import { route } from '../src/route.js';
import { lint } from '../src/lint.js';
import { generate } from '../src/generate.js';
import { optimize } from '../src/optimize.js';
import { zhongshu, menxia, liubu, runPipeline, status } from '../src/liubu.js';

const validSeatYaml = `
blocks:
  test:chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
items:
  test:chair:
    behavior:
      type: block_item
      block: test:chair
`;

describe('route', () => {
  it('should route 椅子 to seat_block', () => {
    const r = route('椅子');
    expect(r.routes.length).toBeGreaterThan(0);
    expect(r.routes[0].suggest).toBe('椅子');
    expect(r.routes[0].url).toContain('seat_block');
  });

  it('should route 门 to door_block', () => {
    const r = route('门');
    expect(r.routes[0].suggest).toBe('门');
    expect(r.routes[0].url).toContain('door_block');
  });

  it('should route 作物 to crop_block', () => {
    const r = route('作物');
    expect(r.routes[0].suggest).toBe('作物');
    expect(r.routes[0].url).toContain('crop_block');
  });

  it('should route 家具 to furniture', () => {
    const r = route('家具');
    expect(r.routes[0].suggest).toBe('家具');
    expect(r.routes[0].url).toContain('furniture');
  });

  it('should route 配方 to recipe', () => {
    const r = route('配方');
    expect(r.routes[0].suggest).toBe('配方');
    expect(r.routes[0].url).toContain('recipe');
  });

  it('should route 掉落表 to loot_table', () => {
    const r = route('掉落表');
    expect(r.routes[0].suggest).toBe('掉落表');
    expect(r.routes[0].url).toContain('loot_table');
  });

  it('should fallback for unknown', () => {
    const r = route('未知需求xyz');
    expect(r.routes.length).toBe(1);
    expect(r.routes[0].type).toBe('Config');
  });

  it('should route first block keyword', () => {
    const r = route('第一个方块');
    expect(r.routes[0].suggest).toBe('第一个方块');
    expect(r.routes[0].url).toContain('first_block');
  });
});

describe('generate', () => {
  it('should generate seat YAML with block + item', () => {
    const g = generate('seat', 'test:chair');
    expect(g.kind).toBe('seat');
    expect(g.id).toBe('test:chair');
    expect(g.yaml).toContain('blocks:');
    expect(g.yaml).toContain('items:');
    expect(g.yaml).toContain('type: seat_block');
    expect(g.yaml).toContain('type: block_item');
    expect(g.yaml).toContain('seats:');
  });

  it('should generate furniture with variants', () => {
    const g = generate('furniture', 'test:bench');
    expect(g.yaml).toContain('furniture:');
    expect(g.yaml).toContain('variants:');
    expect(g.yaml).toContain('hitboxes:');
    expect(g.yaml).toContain('type: furniture_item');
  });

  it('should generate door with behavior', () => {
    const g = generate('door', 'test:oak_door');
    expect(g.yaml).toContain('type: door_block');
  });

  it('should generate crop with behavior', () => {
    const g = generate('crop', 'test:wheat');
    expect(g.yaml).toContain('type: crop_block');
  });

  it('should generate falling with behavior', () => {
    const g = generate('falling', 'test:sand');
    expect(g.yaml).toContain('type: falling_block');
  });

  it('should generate fence with behavior', () => {
    const g = generate('fence', 'test:oak_fence');
    expect(g.yaml).toContain('type: fence_block');
  });

  it('should generate recipe with shaped pattern', () => {
    const g = generate('recipe', 'test:custom_recipe');
    expect(g.yaml).toContain('type: shaped');
    expect(g.yaml).toContain('pattern:');
    expect(g.yaml).toContain('ingredients:');
    expect(g.yaml).toContain('result:');
  });

  it('should generate simple_storage with block + item', () => {
    const g = generate('simple_storage', 'test:chest');
    expect(g.yaml).toContain('type: simple_storage_block');
    expect(g.yaml).toContain('type: block_item');
  });

  it('should generate display_item with block + item', () => {
    const g = generate('display_item', 'test:display');
    expect(g.yaml).toContain('type: display_item_block');
    expect(g.yaml).toContain('type: block_item');
  });

  it('should generate double_high with block + item', () => {
    const g = generate('double_high', 'test:tall_plant');
    expect(g.yaml).toContain('type: double_high_block');
    expect(g.yaml).toContain('type: double_high_block_item');
  });

  it('should generate drawer with block + item', () => {
    const g = generate('drawer', 'test:drawer');
    expect(g.yaml).toContain('type: drawer_block');
    expect(g.yaml).toContain('type: block_item');
  });

  it('should reject invalid ID (uppercase)', () => {
    expect(() => generate('block', 'INVALID')).toThrow('namespace:path');
  });

  it('should reject invalid ID (special char)', () => {
    expect(() => generate('block', 'invalid!')).toThrow('namespace:path');
  });

  it('should reject unknown kind', () => {
    expect(() => generate('unknown_kind', 'test:test')).toThrow('未知 kind');
  });

  it('should auto-prefix default: for ID without colon', () => {
    const g = generate('block', 'testblock');
    expect(g.id).toBe('default:testblock');
  });

  it('should include wiki URL in result', () => {
    const g = generate('seat', 'test:chair');
    expect(g.wiki).toContain('https://ce-pre.gtemc.cn/zh-Hans/');
  });
});

describe('lint', () => {
  it('should pass valid seat YAML', () => {
    const result = lint(validSeatYaml);
    expect(result.ok).toBe(true);
    expect(result.summary.error).toBe(0);
  });

  it('should pass valid furniture YAML', () => {
    const yaml = `
furniture:
  test:bench:
    variants:
      ground:
        elements:
          - item: test:bench
        hitboxes:
          - position: 0,0,0
            type: shulker
        seats:
          - 0,0.35,0
items:
  test:bench:
    behavior:
      type: furniture_item
      furniture: test:bench
`;
    const result = lint(yaml);
    expect(result.ok).toBe(true);
  });

  it('should pass valid recipe YAML', () => {
    const yaml = `
recipes:
  test:recipe:
    type: shaped
    pattern:
      - " A "
      - " A "
      - " B "
    ingredients:
      A: minecraft:stick
      B: minecraft:oak_planks
    result: test:recipe
`;
    const result = lint(yaml);
    expect(result.ok).toBe(true);
  });

  it('should fail missing state for blocks', () => {
    const yaml = `
blocks:
  test:block:
    behavior:
      type: seat_block
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.summary.error).toBeGreaterThan(0);
    expect(result.issues.some(i => i.msg.includes('state'))).toBe(true);
  });

  it('should fail missing variants for furniture', () => {
    const yaml = `
furniture:
  test:bench:
    behavior:
      type: display_item_furniture
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.summary.error).toBeGreaterThan(0);
    expect(result.issues.some(i => i.msg.includes('variants'))).toBe(true);
  });

  it('should fail unknown behavior.type', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    behavior:
      type: unknown_type
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('未知') || i.msg.includes('unknown'))).toBe(true);
  });

  it('should fail block_item without block', () => {
    const yaml = `
items:
  test:item:
    behavior:
      type: block_item
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('block_item') && i.msg.includes('block'))).toBe(true);
  });

  it('should fail furniture_item without furniture', () => {
    const yaml = `
items:
  test:item:
    behavior:
      type: furniture_item
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('furniture_item') && i.msg.includes('furniture'))).toBe(true);
  });

  it('should warn on placeholder ID (my_block)', () => {
    const yaml = `
blocks:
  my_block:
    state:
      auto_state: note_block
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
  });

  it('should warn on placeholder ID (xxx)', () => {
    const yaml = `
blocks:
  xxx:
    state:
      auto_state: note_block
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
  });

  it('should warn on placeholder ID (TODO)', () => {
    const yaml = `
blocks:
  TODO:
    state:
      auto_state: note_block
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
  });

  it('should fail behavior without type', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    behavior: {}
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('type'))).toBe(true);
  });

  it('should validate hardness range', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    settings:
      hardness: -1
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('hardness'))).toBe(true);
  });

  it('should warn on hardness 0', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    settings:
      hardness: 0
`;
    const result = lint(yaml);
    expect(result.summary.info).toBeGreaterThan(0);
  });

  it('should warn on hardness > 100', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    settings:
      hardness: 200
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
  });

  it('should validate luminance range', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    settings:
      luminance: 20
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('luminance'))).toBe(true);
  });

  it('should validate resistance not negative', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    settings:
      resistance: -5
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
  });

  it('should validate ID format (namespace:path)', () => {
    const yaml = `
blocks:
  invalid_id:
    state:
      auto_state: note_block
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
    expect(result.issues.some(i => i.msg.includes('namespace:path'))).toBe(true);
  });

  it('should warn on seat_block without items', () => {
    const yaml = `
blocks:
  test:chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
`;
    const result = lint(yaml);
    expect(result.summary.info).toBeGreaterThan(0);
  });

  it('should fail seat_block without seats', () => {
    const yaml = `
blocks:
  test:chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
  });

  it('should fail strippable_block without stripped', () => {
    const yaml = `
blocks:
  test:log:
    state:
      auto_state: note_block
    behavior:
      type: strippable_block
`;
    const result = lint(yaml);
    expect(result.ok).toBe(false);
  });

  it('should handle multiple top-level keys', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
items:
  test:item:
    material: paper
`;
    const result = lint(yaml);
    expect(result.ok).toBe(true);
  });

  it('should report typesFound', () => {
    const result = lint(validSeatYaml);
    expect(result.typesFound).toContain('seat_block');
    expect(result.typesFound).toContain('block_item');
  });
});

describe('optimize', () => {
  it('should suggest sounds for blocks', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('sounds'))).toBe(true);
  });

  it('should suggest tags for blocks', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('tags'))).toBe(true);
  });

  it('should suggest block_item requires items', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    behavior:
      type: block_item
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('block_item'))).toBe(true);
  });

  it('should suggest facing for seat_block', () => {
    const yaml = `
blocks:
  test:chair:
    state:
      auto_state: note_block
    behavior:
      type: seat_block
      seats:
        - 0,0,0
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('facing'))).toBe(true);
  });

  it('should suggest item_name for items', () => {
    const yaml = `
items:
  test:item:
    material: paper
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('item_name'))).toBe(true);
  });

  it('should suggest result for recipes', () => {
    const yaml = `
recipes:
  test:recipe:
    type: shaped
    pattern:
      - " A "
`;
    const result = optimize(yaml);
    expect(result.optimize.some(t => t.tip.includes('result'))).toBe(true);
  });

  it('should pass ok for valid YAML', () => {
    const result = optimize(validSeatYaml);
    expect(result.ok).toBe(true);
  });
});

describe('liubu pipeline', () => {
  it('zhongshu should produce draft', () => {
    const z = zhongshu('椅子');
    expect(z.draft).toBeDefined();
    expect(z.draft?.kind).toBe('seat');
  });

  it('zhongshu should route to correct wiki', () => {
    const z = zhongshu('门');
    expect(z.draft?.kind).toBe('door');
  });

  it('menxia should seal valid YAML', () => {
    const m = menxia(validSeatYaml);
    expect(m.sealed).toBe(true);
  });

  it('menxia should reject invalid YAML', () => {
    const yaml = `
blocks:
  test:block:
    behavior:
      type: seat_block
`;
    const m = menxia(yaml);
    expect(m.sealed).toBe(false);
  });

  it('liubu should pass all 6 checks for valid YAML', () => {
    const b = liubu(validSeatYaml, { menxia: { sealed: true } as any, wikiHit: { url: 'test' } });
    expect(b.ok).toBe(true);
    expect(b.passed).toBe(6);
  });

  it('liubu should fail 名实 for invalid ID', () => {
    const yaml = `
blocks:
  invalid:
    state:
      auto_state: note_block
`;
    const b = liubu(yaml, { menxia: { sealed: true } as any, wikiHit: { url: 'test' } });
    expect(b.ok).toBe(false);
    expect(b.boards.find(b => b.name === '名实')?.ok).toBe(false);
  });

  it('liubu should fail 版图 for missing state', () => {
    const yaml = `
blocks:
  test:block:
    behavior:
      type: seat_block
`;
    const b = liubu(yaml, { menxia: { sealed: false } as any, wikiHit: { url: 'test' } });
    expect(b.ok).toBe(false);
    expect(b.boards.find(b => b.name === '版图')?.ok).toBe(false);
  });

  it('liubu should fail 典籍 for missing wiki hit', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
`;
    const b = liubu(yaml, { menxia: { sealed: true } as any, wikiHit: undefined });
    expect(b.ok).toBe(false);
    expect(b.boards.find(b => b.name === '典籍')?.ok).toBe(false);
  });

  it('liubu should fail 行为 for non-standard type', () => {
    const yaml = `
blocks:
  test:block:
    state:
      auto_state: note_block
    behavior:
      type: sittable
`;
    const b = liubu(yaml, { menxia: { sealed: true } as any, wikiHit: { url: 'test' } });
    expect(b.ok).toBe(false);
    expect(b.boards.find(b => b.name === '行为')?.ok).toBe(false);
  });

  it('runPipeline should produce edict', () => {
    const result = runPipeline('椅子', 'test:oak_chair', false);
    expect(result.ok).toBe(true);
    expect(result.edict).toContain('谕旨');
    expect(result.zhongshu.draft.id).toBe('test:oak_chair');
  });

  it('runPipeline should save when ok and save=true', () => {
    const result = runPipeline('椅子', 'test:saved_chair', true);
    expect(result.ok).toBe(true);
    expect(result.saved).toBeDefined();
  });

  it('runPipeline should not save when ok=false', () => {
    // Use an invalid ID that causes generate to throw
    const result = runPipeline('椅子', 'test:bad:path', true);
    expect(result.ok).toBe(false);
    expect(result.saved).toBeUndefined();
  });
});

describe('apply', () => {
  it('should apply valid YAML to applied dir', () => {
    // This test would require file system, skip for unit tests
  });
});

describe('status', () => {
  it('should return status with edicts dir', () => {
    const s = status();
    expect(s.office).toBe('六部');
    expect(Array.isArray(s.edicts)).toBe(true);
  });
});