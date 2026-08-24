#!/usr/bin/env tsx
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { extractProject } from '../../../apps/server/src/lib/extractor.js';
const args = Object.fromEntries(process.argv.slice(2).map((a,i,arr)=> a.startsWith('--') ? [a.replace(/^--/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), arr[i+1]?.startsWith('--')? 'true': arr[i+1]] : []).filter(x=>x.length));
const projectId = (args as any).project || 'craftengine-wiki';
const projectDir = path.resolve(`data/projects/${projectId}`);
const res = await extractProject(projectDir, (ev)=> console.log(ev));
await fs.writeFile(path.join(projectDir, '.graphify_extract.json'), JSON.stringify(res,null,2));
console.log(`extracted ${res.nodes.length} nodes ${res.edges.length} edges`);
