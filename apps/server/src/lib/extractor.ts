import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { ExtractionResult, GraphEdge, GraphNode } from '@ceskills/shared';

function hash(s: string) {
  return createHash('sha256').update(s).digest('hex');
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9:_\-\u4e00-\u9fff]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'page';
}

function parseFrontMatter(content: string): { meta: Record<string, string>; body: string } {
  if (!content.startsWith('---')) return { meta: {}, body: content };
  const end = content.indexOf('\n---', 3);
  if (end < 0) return { meta: {}, body: content };
  const raw = content.slice(3, end).trim();
  const body = content.slice(end + 4);
  const meta: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, '');
  }
  return { meta, body };
}

function typeFromPath(file: string, title: string): GraphNode['type'] {
  const p = file.replace(/\\/g, '/').toLowerCase();
  if (p.includes('configuration_block') || p.includes('/block')) return 'Block';
  if (p.includes('configuration_item') || p.includes('/item')) return 'Item';
  if (p.includes('configuration_recipe') || p.includes('recipe')) return 'Recipe';
  if (p.includes('configuration_furniture') || p.includes('furniture')) return 'Block';
  if (p.includes('reference_events') || p.includes('/events')) return 'Event';
  if (p.includes('/api')) return 'API';
  if (p.includes('compatibility')) return 'Compat';
  if (p.includes('/addon')) return 'Addon';
  if (p.includes('configuration')) return 'Config';
  if (title.includes('方块') || title.includes('座椅') || title.includes('家具')) return 'Block';
  if (title.includes('物品')) return 'Item';
  return 'Config';
}

const ROOT_KEYS = new Set(['blocks', 'items', 'recipes', 'furniture']);
const L1_KEYS = new Set(['behavior', 'behaviors', 'settings', 'state', 'states', 'events', 'loot', 'data', 'model', 'variants']);
const L2_KEYS = new Set([
  'type', 'seats', 'hardness', 'sounds', 'tags', 'auto_state', 'stripped', 'block', 'item',
  'material', 'texture', 'bottom_block_tags', 'solid_block', 'item_name', 'lore', 'components',
]);

function prettyYaml(raw: string): string {
  let s = raw.replace(/\r/g, '').trim();
  if (!s) return '';
  s = s.replace(/#.*/g, (c) => c.replace(/\s+/g, ' '));
  const keys = [...ROOT_KEYS, ...L1_KEYS, ...L2_KEYS];
  for (const k of keys) s = s.replace(new RegExp(`\\s+(${k}):`, 'g'), `\n$1:`);
  s = s.replace(/\s+-\s+/g, '\n- ');
  const lines = s.split('\n').map((l) => l.trim()).filter(Boolean);
  const out: string[] = [];
  let indent = 0;
  for (const line of lines) {
    const key = line.split(':')[0];
    if (ROOT_KEYS.has(key)) indent = 0;
    else if (/^[a-z0-9_]+:[a-z0-9_./-]+/i.test(line) && !line.startsWith('-')) indent = 1;
    else if (L1_KEYS.has(key)) indent = 2;
    else if (L2_KEYS.has(key) || line.startsWith('- ')) indent = 3;
    else indent = Math.min(indent + 1, 5);
    out.push('  '.repeat(indent) + line);
  }
  return out.join('\n').slice(0, 2500);
}

function extractYamlSnippets(body: string): string[] {
  const bits = [...body.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
  const hits = bits.filter((b) =>
    /^(blocks|items|recipes|furniture)\s*:/.test(b.trim()) ||
    /\b(behavior|behaviors|auto_state|material)\s*:/.test(b),
  );
  return hits.map(prettyYaml).filter((y) => y.split('\n').length >= 2);
}

function parentIdFromFile(file: string): string | null {
  const name = path.basename(file, '.md');
  const parts = name.split('_');
  if (parts.length < 2) return null;
  parts.pop();
  return `page:${slugify(parts.join('_'))}`;
}

export async function extractFromMarkdown(mdPath: string, sourceUrl: string): Promise<ExtractionResult> {
  const content = await fs.readFile(mdPath, 'utf-8');
  const { meta, body } = parseFrontMatter(content);
  const title = (meta.title || path.basename(mdPath, '.md')).replace(/"/g, '');
  const url = meta.source_url || sourceUrl;
  const fileId = `page:${slugify(path.basename(mdPath, '.md'))}`;
  const type = typeFromPath(mdPath, title);
  const yamlBits = extractYamlSnippets(body);
  const heading = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1].replace(/​/g, '').trim());
  const aliases = [
    title.replace(/[^\u4e00-\u9fffA-Za-z0-9]+/g, ''),
    path.basename(mdPath, '.md').replace(/_/g, ' '),
    ...(heading.slice(0, 4)),
  ].filter(Boolean);
  const node: GraphNode = {
    id: fileId,
    label: title,
    type,
    properties: {
      url,
      headings: heading.slice(0, 8),
      yaml: yamlBits[0] || '',
      yamls: yamlBits.slice(0, 4),
      aliases,
      body: body.slice(0, 4000),
      file: path.basename(mdPath),
    },
    confidence: 0.9,
    evidence: body.replace(/\s+/g, ' ').trim().slice(0, 500),
    source_location: url,
  };
  const nodes: GraphNode[] = [node];
  const edges: GraphEdge[] = [];

  const parent = parentIdFromFile(mdPath);
  if (parent && parent !== fileId) {
    edges.push({
      source: fileId,
      target: parent,
      label: 'requires',
      type: 'EXTRACTED',
      confidence: 0.8,
      evidence: 'path hierarchy',
      source_location: url,
    });
  }

  const linkRe = /\]\((\/zh-Hans\/[^)#]+)/g;
  let lm: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((lm = linkRe.exec(body))) {
    const slug = 'page:' + slugify(lm[1].replace(/^\/zh-Hans\//, '').replace(/\//g, '_'));
    if (slug === fileId || seen.has(slug)) continue;
    seen.add(slug);
    edges.push({
      source: fileId,
      target: slug,
      label: 'depends_on',
      type: 'EXTRACTED',
      confidence: 0.7,
      evidence: lm[1],
      source_location: url,
    });
  }

  return { nodes, edges, hyperedges: [] };
}

export async function extractProject(projectDir: string, onProgress?: (ev: any) => void): Promise<ExtractionResult> {
  const rawDir = path.join(projectDir, 'raw');
  const files: string[] = [];
  async function walk(dir: string) {
    const ents = await fs.readdir(dir, { withFileTypes: true }).catch(() => [] as any);
    for (const e of ents) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith('.md')) files.push(p);
    }
  }
  await walk(rawDir);
  const all: ExtractionResult = { nodes: [], edges: [], hyperedges: [] };
  let i = 0;
  for (const f of files) {
    i++;
    const rel = path.relative(projectDir, f);
    onProgress?.({ current: i, total: files.length, file: rel, status: 'extracting' });
    try {
      const r = await extractFromMarkdown(f, `file://${rel}`);
      all.nodes.push(...r.nodes);
      all.edges.push(...r.edges);
      onProgress?.({ current: i, total: files.length, file: rel, status: `ok +${r.nodes.length}n` });
    } catch (e: any) {
      onProgress?.({ current: i, total: files.length, file: rel, status: 'error ' + String(e?.message).slice(0, 80) });
    }
  }
  const nodeIds = new Set(all.nodes.map((n) => n.id));
  all.edges = all.edges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target));
  const seenN = new Set<string>();
  all.nodes = all.nodes.filter((n) => (seenN.has(n.id) ? false : (seenN.add(n.id), true)));
  await fs.writeFile(
    path.join(projectDir, '.extract_cache.json'),
    JSON.stringify({ at: new Date().toISOString(), counts: { nodes: all.nodes.length, edges: all.edges.length } }, null, 2),
  );
  return all;
}
