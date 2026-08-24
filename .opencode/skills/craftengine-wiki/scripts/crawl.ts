#!/usr/bin/env tsx
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { discoverSidebar, crawlPages } from '../../../apps/server/src/lib/crawler.js';

const args = Object.fromEntries(process.argv.slice(2).map((a,i,arr)=> a.startsWith('--') ? [a.replace(/^--/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), arr[i+1]?.startsWith('--')? 'true': arr[i+1]] : []).filter(x=>x.length));
const cmd = process.argv[2]?.startsWith('--') ? 'crawl' : process.argv[2] || 'crawl';
const baseUrl = (args as any).url || (args as any).baseUrl || 'https://ce-pre.gtemc.cn';
const locale = (args as any).locale || 'zh-Hans';
const projectId = (args as any).project || 'craftengine-wiki';
const projectDir = path.resolve(`data/projects/${projectId}`);

if (cmd === 'discover') {
  const sidebar = await discoverSidebar(baseUrl, locale);
  await fs.mkdir(projectDir, { recursive: true });
  const out = (args as any).output || path.join(projectDir, 'sidebar-map.json');
  await fs.mkdir(path.dirname(path.resolve(out)), { recursive: true });
  await fs.writeFile(path.resolve(out), JSON.stringify(sidebar, null, 2), 'utf-8');
  console.log(`discovered ${sidebar.flat.length} pages -> ${out}`);
  process.exit(0);
}

if (cmd === 'crawl' || cmd === 'update') {
  await fs.mkdir(path.join(projectDir, 'raw', locale), { recursive: true });
  const sidebar = await discoverSidebar(baseUrl, locale);
  await fs.writeFile(path.join(projectDir, 'sidebar-map.json'), JSON.stringify(sidebar,null,2));
  console.log(`sidebar: ${sidebar.flat.length} pages`);
  const { manifest } = await crawlPages(sidebar, {
    baseUrl, locale, concurrency: Number((args as any).concurrency||3), delayMs: 400, timeoutMs: 30000,
    outputDir: path.join(projectDir, 'raw', locale),
    onProgress: (ev)=> console.log(`[${ev.current}/${ev.total}] ${ev.status} ${ev.url}`)
  });
  await fs.writeFile(path.join(projectDir, 'manifest.json'), JSON.stringify(manifest,null,2));
  console.log('crawl done');
}
