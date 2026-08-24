/**
 * 中枢 - Wiki 检索
 * 基于 graph.slim.json 进行语义检索
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { QueryResult, QueryHit, GraphData, GraphNode } from './types.js';
import { getPaths, getAliases } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ScoredNode extends GraphNode {
  score: number;
}

function loadGraph(): GraphData {
  const graphPath = getPaths().graph;
  if (!fs.existsSync(graphPath)) {
    throw new Error(`图谱文件不存在: ${graphPath}`);
  }
  return JSON.parse(fs.readFileSync(graphPath, 'utf8'));
}

function scoreNode(node: GraphNode, terms: string[]): number {
  const bag = `${node.label}\n${node.id}\n${node.url || ''}\n${node.yaml || ''}\n${(node.aliases || []).join(' ')}\n${node.body || ''}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    if (node.label.toLowerCase().includes(t)) s += 8;
    if (node.id.toLowerCase().includes(t.replace(/\s/g, '_'))) s += 6;
    if ((node.yaml || '').toLowerCase().includes(t)) s += 4;
    if (bag.includes(t)) s += 2;
  }
  s += Math.min(node.degree || 0, 5);
  return s;
}

function toQueryHit(node: GraphNode, isRelated: boolean = false): QueryHit {
  return {
    id: node.id,
    label: node.label,
    type: node.type,
    url: node.url || '',
    yaml: isRelated ? '' : (node.yaml || '').slice(0, 800),
    page: `pages/${node.id.replace(/[:/\\]/g, '_')}.md`,
  };
}

export function query(question: string): QueryResult {
  const qRaw = question.trim();
  if (!qRaw) {
    throw new Error('查询词不能为空');
  }

  const aliases = getAliases();
  const q = qRaw.toLowerCase();
  const extra = Object.entries(aliases)
    .filter(([k]) => q.includes(k.toLowerCase()))
    .map(([, v]) => v);

  const graph = loadGraph();
  const terms = [...new Set([q, ...q.split(/[\s\u3000\uFF0C\u3001\u3002?？]+/).filter((t) => t.length >= 2), ...extra])];

  const ranked: ScoredNode[] = graph.nodes
    .map((n) => ({ ...n, score: scoreNode(n, terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const hits = ranked.slice(0, 8);
  const related = new Set<string>();

  for (const h of hits) {
    for (const e of graph.edges) {
      if (e.source === h.id) related.add(e.target);
      if (e.target === h.id) related.add(e.source);
    }
  }

  return {
    question: qRaw,
    terms,
    hits: hits.map((h) => toQueryHit(h, false)),
    related: [...related]
      .slice(0, 12)
      .map((id) => {
        const n = graph.nodes.find((x) => x.id === id);
        return n ? toQueryHit(n, true) : { id, label: '', type: '', url: '', yaml: '', page: '' };
      }),
    hint: hits.length
      ? '参考 hits[].page 获取完整 YAML，或访问 url'
      : '未命中，请细化关键词或查阅 INDEX.md',
  };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('query.ts') || process.argv[1]?.endsWith('query.mjs');
if (isMainModule) {
  const q = process.argv.slice(2).join(' ').trim();
  if (!q) {
    console.error('用法: npx tsx src/query.ts <查询词>');
    process.exit(1);
  }
  const result = query(q);
  console.log(JSON.stringify(result, null, 2));
  if (!result.hits.length) process.exit(2);
}