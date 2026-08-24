import { config as loadEnv } from 'dotenv';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { discoverSidebar, crawlPages } from './lib/crawler.js';
import { extractProject } from './lib/extractor.js';
import { buildGraph } from './lib/graphBuilder.js';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
loadEnv({ path: path.join(REPO_ROOT, '.env') });
const DATA_ROOT = path.join(REPO_ROOT, 'data', 'projects');
const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(fastifyStatic, { root: path.resolve(DATA_ROOT), prefix: '/data/' });

app.get('/api/health', async () => ({ ok: true, at: new Date().toISOString() }));

app.get('/api/projects', async () => {
  const entries = await fs.readdir(DATA_ROOT).catch(()=>[] as string[]);
  const projects = [];
  for (const name of entries) {
    const dir = path.join(DATA_ROOT, name);
    const st = await fs.stat(dir).catch(()=>null); if (!st?.isDirectory()) continue;
    const manifest = await fs.readFile(path.join(dir, 'manifest.json'), 'utf-8').then(JSON.parse).catch(()=>null);
    const graph = await fs.readFile(path.join(dir, 'graph.json'), 'utf-8').then(JSON.parse).catch(()=>null);
    projects.push({ id: name, manifest, stats: graph?.stats || null });
  }
  return { projects };
});

app.post('/api/discover', async (req) => {
  const { baseUrl, locale } = (req.body as any) || {};
  if (!baseUrl) return { error: 'baseUrl required' };
  const sidebar = await discoverSidebar(baseUrl, locale || 'zh-Hans');
  return sidebar;
});

app.post('/api/crawl', async (req, reply) => {
  const { baseUrl = 'https://ce-pre.gtemc.cn', locale = 'zh-Hans', projectId = 'craftengine-wiki', concurrency = 3 } = (req.body as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  await fs.mkdir(path.join(projectDir, 'raw'), { recursive: true });
  reply.raw.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const send = (obj:any) => reply.raw.write(`data: ${JSON.stringify(obj)}\n\n`);
  try {
    send({ step: 'discover', status: 'started', baseUrl, locale });
    const sidebar = await discoverSidebar(baseUrl, locale);
    await fs.writeFile(path.join(projectDir, 'sidebar-map.json'), JSON.stringify(sidebar, null, 2));
    send({ step: 'discover', status: 'done', pages: sidebar.flat.length });
    const { manifest } = await crawlPages(sidebar, {
      baseUrl, locale, concurrency, delayMs: 400, timeoutMs: 30000,
      outputDir: path.join(projectDir, 'raw', locale),
      onProgress: (ev) => send({ step: 'crawl', ...ev }),
    });
    await fs.writeFile(path.join(projectDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
    send({ step: 'crawl', status: 'done', manifest });
  } catch (e:any) { send({ step: 'error', message: String(e?.message||e) }); }
  finally { reply.raw.end(); }
  return reply;
});

app.post('/api/extract', async (req, reply) => {
  const { projectId = 'craftengine-wiki' } = (req.body as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  reply.raw.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const send = (obj:any) => reply.raw.write(`data: ${JSON.stringify(obj)}\n\n`);
  try {
    send({ step: 'extract', status: 'started' });
    const extraction = await extractProject(projectDir, (ev)=> send({ step: 'extract', ...ev }));
    await fs.writeFile(path.join(projectDir, '.graphify_extract.json'), JSON.stringify(extraction, null, 2));
    send({ step: 'extract', status: 'done', nodes: extraction.nodes.length, edges: extraction.edges.length });
  } catch (e:any) { send({ step: 'error', message: String(e?.message||e) }); }
  finally { reply.raw.end(); }
  return reply;
});

app.post('/api/build', async (req) => {
  const { projectId = 'craftengine-wiki' } = (req.body as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  const extraction = JSON.parse(await fs.readFile(path.join(projectDir, '.graphify_extract.json'), 'utf-8'));
  const built = await buildGraph(extraction, projectDir);
  return built;
});

app.post('/api/pipeline', async (req, reply) => {
  const { baseUrl = 'https://ce-pre.gtemc.cn', locale='zh-Hans', projectId='craftengine-wiki' } = (req.body as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  await fs.mkdir(path.join(projectDir, 'raw'), { recursive: true });
  reply.raw.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const send=(o:any)=> reply.raw.write(`data: ${JSON.stringify(o)}\n\n`);
  try {
    send({ step: 'discover', status: 'started' });
    const sidebar = await discoverSidebar(baseUrl, locale);
    await fs.writeFile(path.join(projectDir, 'sidebar-map.json'), JSON.stringify(sidebar,null,2));
    send({ step: 'discover', status: 'done', pages: sidebar.flat.length });
    const { manifest } = await crawlPages(sidebar, { baseUrl, locale, concurrency: 3, delayMs: 400, timeoutMs: 30000, outputDir: path.join(projectDir,'raw',locale), onProgress:(ev)=> send({step:'crawl',...ev}) });
    await fs.writeFile(path.join(projectDir,'manifest.json'), JSON.stringify(manifest,null,2));
    send({ step: 'crawl', status: 'done' });
    const extraction = await extractProject(projectDir, (ev)=> send({step:'extract',...ev}));
    await fs.writeFile(path.join(projectDir,'.graphify_extract.json'), JSON.stringify(extraction,null,2));
    send({ step: 'extract', status: 'done', nodes: extraction.nodes.length });
    const built = await buildGraph(extraction, projectDir);
    send({ step: 'build', status: 'done', stats: built.stats });
    send({ step: 'export', status: 'started' });
    const { spawnSync } = await import('node:child_process');
    const exp = spawnSync('pnpm', ['export-skill'], {
      encoding: 'utf8',
      cwd: REPO_ROOT,
      shell: true,
    });
    send({
      step: 'export',
      status: exp.status === 0 ? 'done' : 'error',
      message: (exp.stdout || exp.stderr || '').slice(-400),
    });
    send({ step: 'done', stats: built.stats });
  } catch(e:any){ send({step:'error', message:String(e?.message||e)}); }
  finally { reply.raw.end(); }
  return reply;
});

app.get('/api/graph', async (req) => {
  const { projectId='craftengine-wiki' } = (req.query as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  const g = await fs.readFile(path.join(projectDir,'graph.json'),'utf-8').then(JSON.parse).catch(()=>null);
  if (!g) return { error: 'graph not built' }; return g;
});

app.post('/api/query', async (req) => {
  const { projectId='craftengine-wiki', question='' } = (req.body as any) || {};
  const projectDir = path.join(DATA_ROOT, projectId);
  const g = await fs.readFile(path.join(projectDir,'graph.json'),'utf-8').then(JSON.parse).catch(()=>null);
  if (!g) return { error: 'graph not found' };
  const q = String(question).toLowerCase();
  const hits = g.nodes.filter((n:any)=> n.label.toLowerCase().includes(q) || n.id.toLowerCase().includes(q) || JSON.stringify(n.properties).toLowerCase().includes(q)).slice(0,10);
  const related = new Set<string>();
  for (const h of hits) for (const e of g.edges) if (e.source===h.id) related.add(e.target); else if (e.target===h.id) related.add(e.source);
  // simple YAML example from hit
  let yaml_example = hits[0]?.properties?.yaml || hits[0]?.properties?.code || hits[0]?.properties?.snippet || '';
  // if LLM available, synthesize better answer
  let answer = hits.length ? `找到 ${hits.length} 个相关实体：${hits.map((h:any)=>h.label+'('+h.type+')').join(', ')}。` : '未找到直接匹配，建议在WebUI中搜索。';
  if (process.env.GEMINI_API_KEY && hits.length) {
    try {
      const ctx = hits.slice(0,5).map((h:any)=> `${h.id} ${h.label} ${JSON.stringify(h.properties).slice(0,400)}`).join('\n');
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ contents:[{role:'user', parts:[{text:`你是CraftEngine专家。问题: ${question}\n上下文:\n${ctx}\n请给出简洁可操作的回答，若有YAML配置请给出示例。`}]}], generationConfig:{temperature:0.3}})
      });
      const j:any = await r.json(); const t=j.candidates?.[0]?.content?.parts?.[0]?.text; if (t) answer = t;
    } catch {}
  }
  return { answer, evidence: hits.map((h:any)=>({ node:h.id, quote: String(h.evidence||'').slice(0,500), url: h.source_location })), related: [...related].slice(0,10), yaml_example, confidence: hits[0]?.confidence || 0.6 };
});

app.get('/api/edicts', async () => {
  const dir = path.join(REPO_ROOT, '.opencode/skills/craftengine-wiki/pack/edicts');
  const files = await fs.readdir(dir).catch(() => [] as string[]);
  const ymls = files.filter((f) => f.endsWith('.yml')).sort().reverse().slice(0, 20);
  return { dir, edicts: ymls };
});

app.post('/api/apply', async (req, reply) => {
  const { file, dest } = (req.body as any) || {};
  if (!file) return reply.code(400).send({ ok: false, error: 'file required' });
  const { spawnSync } = await import('node:child_process');
  const script = path.join(REPO_ROOT, '.opencode/skills/craftengine-wiki/pack/scripts/apply.mjs');
  const src = path.isAbsolute(file) ? file : path.join(REPO_ROOT, '.opencode/skills/craftengine-wiki', file.replace(/^pack\//, 'pack/'));
  const args = dest ? [src, dest] : [src];
  const r = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  try {
    const j = JSON.parse(r.stdout || '{}');
    return reply.code(j.ok ? 200 : 422).send(j);
  } catch {
    return reply.code(500).send({ ok: false, error: r.stderr || r.stdout });
  }
});

app.post('/api/liubu', async (req, reply) => {
  const { question = '自定义方块', id = 'default:draft' } = (req.body as any) || {};
  const { spawnSync } = await import('node:child_process');
  const script = path.join(REPO_ROOT, '.opencode/skills/craftengine-wiki/pack/scripts/liubu.mjs');
  const r = spawnSync(process.execPath, [script, 'run', String(question), String(id)], { encoding: 'utf8' });
  try {
    const j = JSON.parse(r.stdout || '{}');
    return reply.code(j.ok ? 200 : 422).send(j);
  } catch {
    return reply.code(500).send({ ok: false, error: r.stderr || r.stdout || 'liubu failed' });
  }
});

const PORT = Number(process.env.PORT || 3001);
app.listen({ port: PORT, host: '0.0.0.0' }).then(()=> console.log(`server listening ${PORT}`));
