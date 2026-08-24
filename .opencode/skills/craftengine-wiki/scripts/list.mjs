#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pack = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const typeFilter = (process.argv[2] || '').trim();
const g = JSON.parse(fs.readFileSync(path.join(pack, 'graph.slim.json'), 'utf8'));
const nodes = typeFilter
  ? g.nodes.filter((n) => n.type.toLowerCase() === typeFilter.toLowerCase() || n.id.includes(typeFilter))
  : g.nodes;
const out = nodes.map((n) => ({
  id: n.id,
  label: n.label,
  type: n.type,
  url: n.url,
  hasYaml: Boolean(n.yaml),
}));
console.log(JSON.stringify({ filter: typeFilter || null, count: out.length, pages: out }, null, 2));
