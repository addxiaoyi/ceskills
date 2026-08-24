'use client';

import { useEffect, useRef, useState } from 'react';

export default function GraphPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<{ nodeCount: number; edgeCount: number } | null>(null);
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState('正在打开地图…');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    let cy: any;
    let cancelled = false;
    (async () => {
      const g = await fetch('/backend/api/graph?projectId=craftengine-wiki')
        .then((r) => r.json())
        .catch(() => null);
      if (cancelled) return;
      const nodes = Array.isArray(g?.nodes) ? g.nodes : [];
      const edges = Array.isArray(g?.edges) ? g.edges : [];
      if (!g || g.error || !nodes.length) {
        setEmpty(true);
        setMsg('还没有地图。先回首页点「开始抓取」。');
        setStats({ nodeCount: 0, edgeCount: 0 });
        return;
      }
      if (!ref.current) return;
      setEmpty(false);
      setStats(g.stats || { nodeCount: nodes.length, edgeCount: edges.length });
      setMsg('拖动画布，滚轮缩放，点圆点看名字。');
      const cytoscape = (await import('cytoscape')).default;
      const coseBilkent = (await import('cytoscape-cose-bilkent')).default;
      cytoscape.use(coseBilkent);
      const els = [
        ...nodes.map((n: any) => ({
          data: { id: n.id, label: n.label, type: n.type, community: n.community || 0 },
        })),
        ...edges
          .filter((e: any) => e.source && e.target)
          .map((e: any, i: number) => ({
            data: { id: 'e' + i, source: e.source, target: e.target, label: e.label },
          })),
      ];
      cy = cytoscape({
        container: ref.current,
        elements: els,
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              'font-size': 8,
              width: 18,
              height: 18,
              'background-color': (ele: any) =>
                ['#2f6b4f', '#c45c26', '#e8c36a', '#4b7d8a', '#8b5a2b', '#6b4f8a', '#3d6b3d', '#b45309'][
                  (ele.data('community') || 0) % 8
                ],
              color: '#1c1914',
              'text-wrap': 'wrap',
              'text-max-width': '80px',
            },
          },
          {
            selector: 'edge',
            style: {
              'curve-style': 'bezier',
              'target-arrow-shape': 'triangle',
              width: 1.2,
              'line-color': '#cbbfa8',
              'target-arrow-color': '#cbbfa8',
            },
          },
        ],
        layout: { name: 'cose-bilkent', idealEdgeLength: 80, nodeRepulsion: 4800 } as any,
      });
      (window as any).cy = cy;
      cy.on('tap', 'node', (evt: any) => {
        const n = evt.target;
        setMsg(`${n.data('label')} · ${n.data('type') || ''} · ${n.data('id')}`);
      });
    })();
    return () => {
      cancelled = true;
      try {
        cy?.destroy();
      } catch {}
    };
  }, []);

  useEffect(() => {
    const cy = (window as any).cy;
    if (!cy) return;
    const v = q.toLowerCase();
    cy.nodes().forEach((n: any) => {
      const m =
        !v ||
        String(n.data('label') || '').toLowerCase().includes(v) ||
        String(n.data('id') || '').toLowerCase().includes(v);
      n.style('opacity', m ? 1 : 0.12);
    });
  }, [q]);

  return (
    <div className="space-y-3">
      <div className="card flex flex-wrap items-center gap-2 p-3">
        <input
          placeholder="搜：椅子、方块、配方…"
          className="min-w-[200px] flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="text-xs font-bold text-black/50">
          {stats ? `${stats.nodeCount} 个点 / ${stats.edgeCount} 条线` : '…'}
        </span>
        <a href="/" className="btn-ghost">
          回首页
        </a>
      </div>
      {msg && (
        <div className="rounded-2xl bg-[#fff6d8] px-4 py-2 text-sm font-bold text-[#6b4a12]">{msg}</div>
      )}
      {empty && (
        <a href="/" className="btn-primary">
          去抓取 Wiki
        </a>
      )}
      <div ref={ref} style={{ height: '70vh' }} className="card overflow-hidden" />
    </div>
  );
}
