#!/usr/bin/env tsx
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { discoverSidebar, crawlPages } from '../../../apps/server/src/lib/crawler.js';
import { extractProject } from '../../../apps/server/src/lib/extractor.js';
import { buildGraph } from '../../../apps/server/src/lib/graphBuilder.js';

const baseUrl = 'https://ce-pre.gtemc.cn';
const locale = 'zh-Hans';
const projectId = 'craftengine-wiki';
const projectDir = path.resolve(`data/projects/${projectId}`);

await fs.mkdir(path.join(projectDir, 'raw', locale), { recursive: true });
console.log('discover...');
const sidebar = await discoverSidebar(baseUrl, locale);
await fs.writeFile(path.join(projectDir, 'sidebar-map.json'), JSON.stringify(sidebar, null, 2));
console.log(`pages: ${sidebar.flat.length}`);
const { manifest } = await crawlPages(sidebar, {
  baseUrl,
  locale,
  concurrency: 3,
  delayMs: 300,
  timeoutMs: 30000,
  outputDir: path.join(projectDir, 'raw', locale),
  onProgress: (ev) => console.log(`[${ev.current}/${ev.total}] ${ev.status} ${ev.url}`),
});
await fs.writeFile(path.join(projectDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('extract...');
const extraction = await extractProject(projectDir, (ev) => console.log(ev));
await fs.writeFile(path.join(projectDir, '.graphify_extract.json'), JSON.stringify(extraction, null, 2));
console.log('build...');
const built = await buildGraph(extraction, projectDir);
console.log(`done ${built.stats.nodeCount} nodes / ${built.stats.edgeCount} edges`);
console.log(`open ${path.join(projectDir, 'graph.html')}`);
