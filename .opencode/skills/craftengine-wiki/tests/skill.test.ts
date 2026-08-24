import { describe, it, expect } from 'vitest';
import { route } from '../src/route.js';
import { lint } from '../src/lint.js';
import { generate } from '../src/generate.js';
import { optimize } from '../src/optimize.js';
import { zhongshu, menxia, liubu, runPipeline } from '../src/liubu.js';

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

  it('should fallback for unknown', () => {
    const r = route('未知需求xyz');
    expect(r.routes.length).toBe(1);
    expect(r.routes[0].type).toBe('Config');
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
  });

  it('should generate furniture with variants', () => {
    const g = generate('furniture', 'test:bench');
    expect(g.yaml).toContain('furniture:');
    expect(g.yaml).toContain('variants:');
    expect(g.yaml).toContain('hitboxes:');
  });

  it('should reject invalid ID', () => {
    // 'INVALID' (uppercase) is not valid per namespace pattern
    expect(() => generate('block', 'INVALID')).toThrow('namespace:path');
    // 'invalid!' (special char) is not valid per path pattern
    expect(() => generate('block', 'invalid!')).toThrow('namespace:path');
  });
});

describe('lint', () => {
  it('should pass valid seat YAML', () => {
    const yaml = `
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
    const result = lint(yaml);
    expect(result.ok).toBe(true);
    expect(result.summary.error).toBe(0);
  });

  it('should fail missing state', () => {
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

  it('should warn on placeholder ID', () => {
    const yaml = `
blocks:
  my_block:
    state:
      auto_state: note_block
`;
    const result = lint(yaml);
    expect(result.summary.warn).toBeGreaterThan(0);
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
});

describe('liubu pipeline', () => {
  it('zhongshu should produce draft', () => {
    const z = zhongshu('椅子');
    expect(z.draft).toBeDefined();
    expect(z.draft?.kind).toBe('seat');
  });

  it('menxia should seal valid YAML', () => {
    const yaml = `
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
    const m = menxia(yaml);
    expect(m.sealed).toBe(true);
  });

  it('liubu should pass all 6 checks for valid YAML', () => {
    const yaml = `
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
    const b = liubu(yaml, { menxia: { sealed: true } as any, wikiHit: { url: 'test' } });
    expect(b.ok).toBe(true);
    expect(b.passed).toBe(6);
  });

  it('runPipeline should produce edict', () => {
    const result = runPipeline('椅子', 'test:oak_chair', false);
    expect(result.ok).toBe(true);
    expect(result.edict).toContain('谕旨');
    expect(result.zhongshu.draft.id).toBe('test:oak_chair');
  });
});