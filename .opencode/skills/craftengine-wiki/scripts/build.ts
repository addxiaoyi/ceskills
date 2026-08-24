#!/usr/bin/env tsx
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { buildGraph } from '../../../apps/server/src/lib/graphBuilder.js';
const args = Object.fromEntries(process.argv.slice(2).map((a,i,arr)=> a.startsWith('--') ? [a.replace(/^--/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), arr[i+1]?.startsWith('--')? 'true': arr[i+1]] : []).filter(x=>x.length));
const projectId = (args as any).project || 'craftengine-wiki';
const projectDir = path.resolve(`data/projects/${projectId}`);
let extraction: any;
if ((args as any).query) {
  const g = JSON.parse(await fs.readFile(path.join(projectDir,'graph.json'),'utf-8'));
  const q = String((args as any).query).toLowerCase();
  const hits = g.nodes.filter((n:any)=> n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)).slice(0,10);
  console.log(JSON.stringify({ hits, count: hits.length }, null, 2));
  process.exit(0);
}
try { extraction = JSON.parse(await fs.readFile(path.join(projectDir,'.graphify_extract.json'),'utf-8')); } catch { console.error('no .graphify_extract.json, run extract first'); process.exit(1); }
const built = await buildGraph(extraction, projectDir);
console.log(`built ${built.stats.nodeCount} nodes`);
