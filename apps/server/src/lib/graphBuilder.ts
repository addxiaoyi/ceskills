import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ExtractionResult } from '@ceskills/shared';

export interface BuiltGraph {
  nodes: (ExtractionResult['nodes'][number] & { community?: number; degree?: number })[];
  edges: ExtractionResult['edges'];
  communities: Record<string, string>;
  stats: { nodeCount: number; edgeCount: number; builtAt: string };
  gods: string[];
  surprises: { source: string; target: string; label: string }[];
}

export async function buildGraph(extraction: ExtractionResult, projectDir: string): Promise<BuiltGraph> {
  const nodes = extraction.nodes.map(n => ({ ...n }));
  const edges = extraction.edges;
  // degree
  const deg = new Map<string, number>();
  for (const e of edges) { deg.set(e.source, (deg.get(e.source)||0)+1); deg.set(e.target, (deg.get(e.target)||0)+1); }
  for (const n of nodes) (n as any).degree = deg.get(n.id) || 0;

  // trivial community: by type
  const typeToCommunity: Record<string, number> = {};
  let next = 0;
  for (const n of nodes) if (!(n.type in typeToCommunity)) typeToCommunity[n.type] = next++;
  for (const n of nodes) (n as any).community = typeToCommunity[n.type] ?? 0;
  const communities: Record<string,string> = {};
  for (const [t, c] of Object.entries(typeToCommunity)) communities[String(c)] = t;

  // god nodes: top degree
  const gods = [...nodes].sort((a,b)=> ( (b as any).degree - (a as any).degree )).slice(0, 10).map(n=> n.id);
  // surprises: edges crossing communities
  const surprises = edges.filter(e => {
    const s = nodes.find(n=>n.id===e.source); const t2 = nodes.find(n=>n.id===e.target);
    return s && t2 && (s as any).community !== (t2 as any).community;
  }).slice(0, 10).map(e=> ({ source: e.source, target: e.target, label: e.label }));

  const built: BuiltGraph = { nodes, edges, communities, stats: { nodeCount: nodes.length, edgeCount: edges.length, builtAt: new Date().toISOString() }, gods, surprises };
  await fs.mkdir(projectDir, { recursive: true });
  await fs.writeFile(path.join(projectDir, 'graph.json'), JSON.stringify(built, null, 2), 'utf-8');
  // simple HTML
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>CraftEngine Graph</title>
  <script src="https://unpkg.com/cytoscape@3.29.4/dist/cytoscape.min.js"></script>
  <style>html,body,#cy{margin:0;height:100%;width:100%} #info{position:absolute;top:8px;left:8px;background:#fff;padding:8px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.2);font:12px sans-serif}</style>
  </head><body><div id="cy"></div><div id="info"><b>CraftEngine Wiki Graph</b><div id="stats"></div><input id="q" placeholder="搜索" style="margin-top:6px;width:200px"></div>
  <script>const data=${JSON.stringify(built)};const els=[...data.nodes.map(n=>({data:{id:n.id,label:n.label,type:n.type, community:n.community}, classes:'node'})), ...data.edges.map((e,i)=>({data:{id:'e'+i, source:e.source, target:e.target, label:e.label}}))];
  const cy=cytoscape({container:document.getElementById('cy'), elements: els, style:[{selector:'node',style:{'label':'data(label)','font-size':8,'width':16,'height':16,'background-color': ele=>['#4f46e5','#06b6d4','#f59e0b','#10b981','#ef4444','#8b5cf6','#ec4899','#14b8a6'][ele.data('community')%8]}},{selector:'edge',style:{'curve-style':'bezier','target-arrow-shape':'triangle','label':'data(label)','font-size':6,'width':1,'line-color':'#cbd5e1','target-arrow-color':'#cbd5e1'}}], layout:{name:'cose', idealEdgeLength:80, nodeRepulsion: 4000}});
  document.getElementById('stats').textContent = data.stats.nodeCount+' nodes / '+data.stats.edgeCount+' edges';
  document.getElementById('q').addEventListener('input', e=>{const q=e.target.value.toLowerCase(); cy.nodes().forEach(n=>{const m=!q||n.data('label').toLowerCase().includes(q)||n.data('id').toLowerCase().includes(q); n.style('opacity', m?1:0.1)});});
  cy.on('tap','node', evt=>{const n=evt.target; alert(n.data('id')+ "\\n"+ n.data('label')+"\\n"+n.data('type'));});
  </script></body></html>`;
  await fs.writeFile(path.join(projectDir, 'graph.html'), html, 'utf-8');

  // report
  const report = `# CraftEngine Wiki Graph Report\n\n- Nodes: ${built.stats.nodeCount}\n- Edges: ${built.stats.edgeCount}\n- Communities: ${Object.keys(communities).length} (${Object.values(communities).join(', ')})\n- God nodes: ${gods.join(', ')}\n- Built: ${built.stats.builtAt}\n\n## Surprises\n${surprises.map(s=>`- ${s.source} --${s.label}--> ${s.target}`).join('\n')}\n`;
  await fs.writeFile(path.join(projectDir, 'GRAPH_REPORT.md'), report, 'utf-8');
  return built;
}
