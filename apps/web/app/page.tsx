'use client';

import { useEffect, useMemo, useState } from 'react';

type Step = 'idle' | 'discover' | 'crawl' | 'extract' | 'build' | 'done' | 'error';

const STEP_COPY: Record<string, string> = {
  idle: '还没开始。点下面的大按钮就行。',
  discover: '正在找 Wiki 有哪些页面…',
  crawl: '正在把文档一页页搬回来…',
  extract: '正在从文档里抽出配置知识点…',
  build: '正在把知识点连成图谱…',
  done: '做好了！可以去提问，或打开图谱看看。',
  error: '中途卡住了。看一眼下面的说明，再点一次按钮。',
};

function humanize(ev: any): string {
  if (!ev) return '';
  if (ev.step === 'discover' && ev.status === 'started') return '开始查找目录';
  if (ev.step === 'discover' && ev.status === 'done') return `找到 ${ev.pages ?? ''} 个页面`;
  if (ev.step === 'crawl' && ev.status === 'ok') return `已保存 ${ev.current}/${ev.total}`;
  if (ev.step === 'crawl' && String(ev.status || '').startsWith('error')) return `这一页失败了：${ev.url || ''}`;
  if (ev.step === 'crawl' && ev.status === 'done') return '文档搬完了';
  if (ev.step === 'extract' && ev.status === 'started') return '开始抽取知识点';
  if (ev.step === 'extract' && ev.status === 'done') return `抽出 ${ev.nodes ?? 0} 个知识点`;
  if (ev.step === 'extract' && ev.file) return `正在读 ${String(ev.file).split(/[\\/]/).pop()}`;
  if (ev.step === 'build' && ev.status === 'done') return `图谱完成：${ev.stats?.nodeCount ?? 0} 个点`;
  if (ev.step === 'done') return '全部完成';
  if (ev.step === 'error') return `出错：${ev.message || '未知错误'}`;
  return '';
}

function LiubuCard({ ready }: { ready: boolean }) {
  const [q, setQ] = useState('怎么做能坐的椅子');
  const [id, setId] = useState('default:oak_chair');
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<any>(null);
  const [edicts, setEdicts] = useState<string[]>([]);
  useEffect(() => {
    fetch('/backend/api/edicts')
      .then((r) => r.json())
      .then((j) => setEdicts(j.edicts || []))
      .catch(() => {});
  }, [out]);
  async function run() {
    setBusy(true);
    try {
      const r = await fetch('/backend/api/liubu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, id }),
      });
      setOut(await r.json());
    } finally {
      setBusy(false);
    }
  }
  const boards = out?.liubu?.boards || [];
  return (
    <section className="card p-6">
      <h2 className="display text-xl font-bold">三省六部 · 拟旨到准奏</h2>
      <p className="text-sm text-black/60">中书拟 YAML，门下 lint，六部画押。不过关只给发还事由。</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input className="flex-1 rounded-full border border-black/10 px-4 py-2 text-sm" value={q} onChange={(e) => setQ(e.target.value)} disabled={!ready || busy} />
        <input className="sm:w-48 rounded-full border border-black/10 px-4 py-2 text-sm" value={id} onChange={(e) => setId(e.target.value)} disabled={!ready || busy} />
        <button className="btn-primary" disabled={!ready || busy} onClick={run}>
          {busy ? '会签中…' : '呈奏'}
        </button>
      </div>
      {out && (
        <div className="mt-4 space-y-3">
          <div className={`rounded-2xl px-4 py-2 text-sm font-extrabold ${out.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
            {out.ok ? '准奏' : '封驳'} · 六部 {out.liubu?.passed}/{out.liubu?.total}
          </div>
          {boards.length > 0 && (
            <ul className="grid gap-2 sm:grid-cols-3 text-sm">
              {boards.map((b: any) => (
                <li key={b.name} className="rounded-xl bg-[#f4efe4] px-3 py-2">
                  <span className="font-bold">{b.ok ? '✓' : '✗'} {b.name}</span>
                  <div className="text-xs text-black/60">{b.duty}</div>
                </li>
              ))}
            </ul>
          )}
          {out.ok && out.zhongshu?.draft?.yaml && (
            <pre className="overflow-auto rounded-2xl bg-[#1c1914] p-4 text-xs text-[#e8c36a]">{out.zhongshu.draft.yaml}</pre>
          )}
          {out.ok && out.saved && (
            <p className="text-xs text-black/60">已落档 {out.saved} · 回写：pnpm skill:apply 该文件</p>
          )}
          {edicts.length > 0 && (
            <div className="text-xs text-black/60">
              准奏档：{edicts.slice(0, 5).join(' · ')}
            </div>
          )}
          {!out.ok && out.edict && (
            <pre className="overflow-auto whitespace-pre-wrap rounded-2xl bg-[#fff6d8] p-4 text-xs">{out.edict}</pre>
          )}
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [lines, setLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [stats, setStats] = useState<{ nodeCount?: number; edgeCount?: number } | null>(null);
  const [query, setQuery] = useState('如何注册一个可坐的方块？');
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState<any>(null);

  async function refresh() {
    try {
      const r = await fetch('/backend/api/graph?projectId=craftengine-wiki');
      const j = await r.json();
      const ok = Array.isArray(j?.nodes) && j.nodes.length > 0;
      setReady(ok);
      setStats(j?.stats || (ok ? { nodeCount: j.nodes.length, edgeCount: j.edges?.length } : null));
      if (ok && step === 'idle') setStep('done');
    } catch {
      setReady(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const pct = useMemo(() => {
    if (step === 'done') return 100;
    if (step === 'discover') return 8;
    if (step === 'crawl') {
      if (!progress.total) return 15;
      return 10 + Math.round((progress.current / progress.total) * 55);
    }
    if (step === 'extract') return 75;
    if (step === 'build') return 92;
    return 0;
  }, [step, progress]);

  async function runPipeline() {
    setBusy(true);
    setStep('discover');
    setLines(['开始啦，稍等一两分钟。']);
    setAnswer(null);
    try {
      const res = await fetch('/backend/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseUrl: 'https://ce-pre.gtemc.cn',
          locale: 'zh-Hans',
          projectId: 'craftengine-wiki',
        }),
      });
      if (!res.body) throw new Error('服务没连上，确认 3001 端口开着');
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split('\n\n');
        buf = parts.pop() || '';
        for (const p of parts) {
          const line = p.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          try {
            const o = JSON.parse(line.slice(5));
            if (o.step === 'discover') setStep('discover');
            if (o.step === 'crawl') {
              setStep('crawl');
              if (o.current && o.total) setProgress({ current: o.current, total: o.total });
            }
            if (o.step === 'extract') setStep('extract');
            if (o.step === 'build') setStep('build');
            if (o.step === 'done') setStep('done');
            if (o.step === 'error') setStep('error');
            const text = humanize(o);
            if (text) setLines((prev) => [...prev.slice(-12), text]);
          } catch {}
        }
      }
      await refresh();
      setStep((s) => (s === 'error' ? s : 'done'));
    } catch (e: any) {
      setStep('error');
      setLines((prev) => [...prev, e?.message || String(e)]);
    } finally {
      setBusy(false);
    }
  }

  async function doQuery() {
    setAsking(true);
    try {
      const r = await fetch('/backend/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: 'craftengine-wiki', question: query }),
      });
      setAnswer(await r.json());
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="card p-6 md:p-8">
        <p className="text-sm font-bold text-[#2f6b4f]">给刚接触 CraftEngine 的人</p>
        <h1 className="display mt-1 text-3xl font-bold leading-tight md:text-4xl">
          把 Wiki 变成能问的小地图
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-black/70">
          不用记一堆文档路径。先抓一次官网，再随便问「椅子怎么配」「方块行为有哪些」。
        </p>
        <ol className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { n: '1', t: '抓文档', d: '点一次，自动把 Wiki 搬回来' },
            { n: '2', t: '问问题', d: '用大白话问配置，给 YAML 示例' },
            { n: '3', t: '看关系', d: '打开图谱，点一点就知道谁连谁' },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl bg-[#f4efe4] px-4 py-3">
              <div className="display text-2xl text-[#c45c26]">{s.n}</div>
              <div className="font-extrabold">{s.t}</div>
              <div className="text-sm text-black/60">{s.d}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="display text-xl font-bold">第一步：抓取 Wiki</h2>
            <p className="text-sm text-black/60">{STEP_COPY[step]}</p>
          </div>
          <button className="btn-primary" disabled={busy} onClick={runPipeline}>
            {busy ? '正在抓…' : ready ? '重新抓一次' : '开始抓取'}
          </button>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#2f6b4f] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-bold text-black/50">
          {busy && progress.total ? `${progress.current} / ${progress.total} 页` : ready ? `已有图谱 · ${stats?.nodeCount ?? 0} 个知识点` : '大约 1～3 分钟'}
        </p>
        <div className="mt-3 max-h-36 overflow-auto rounded-2xl bg-[#1c1914] p-3 font-mono text-xs leading-6 text-[#e8c36a]">
          {lines.length ? lines.map((l, i) => <div key={i}>{l}</div>) : '日志会显示在这里，不用看代码。'}
        </div>
      </section>

      <section className={`card p-6 ${ready ? '' : 'opacity-70'}`}>
        <h2 className="display text-xl font-bold">第二步：问一句人话</h2>
        <p className="text-sm text-black/60">
          {ready ? '图谱已经在了，直接问。' : '先完成第一步，才能问得准。'}
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ready && doQuery()}
            disabled={!ready || asking}
            className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#2f6b4f]"
            placeholder="例如：怎么做第一个自定义方块？"
          />
          <button className="btn-primary" disabled={!ready || asking} onClick={doQuery}>
            {asking ? '想一下…' : '提问'}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {['椅子怎么坐？', '第一个方块怎么做？', '配方怎么写？'].map((q) => (
            <button
              key={q}
              className="btn-ghost"
              disabled={!ready}
              onClick={() => {
                setQuery(q);
              }}
            >
              {q}
            </button>
          ))}
        </div>
        {answer && (
          <div className="mt-4 space-y-3">
            <div className="whitespace-pre-wrap rounded-2xl bg-[#f4efe4] p-4 text-sm leading-7">
              {answer.answer || '没找到直接答案，换个问法试试。'}
            </div>
            {answer.yaml_example && (
              <pre className="overflow-auto rounded-2xl bg-[#1c1914] p-4 text-xs text-[#f4efe4]">
                {answer.yaml_example}
              </pre>
            )}
          </div>
        )}
      </section>

      <section className="card flex flex-wrap items-center justify-between gap-3 p-6">
        <div>
          <h2 className="display text-xl font-bold">第三步：看图谱</h2>
          <p className="text-sm text-black/60">点节点看它连着谁。没有图谱时会提示你先抓取。</p>
        </div>
        <a href="/graph" className="btn-primary">
          打开图谱
        </a>
      </section>

      <LiubuCard ready={ready} />

      <section className="card p-6">
        <h2 className="display text-xl font-bold">第四步：导出给 Agent</h2>
        <p className="text-sm text-black/60">
          图谱做好后，在项目根目录跑下面两行。自检通过就能给别的 Agent 用。
        </p>
        <pre className="mt-3 overflow-auto rounded-2xl bg-[#1c1914] p-4 text-xs leading-6 text-[#e8c36a]">
{`pnpm skill:liubu run "怎么做能坐的椅子" default:oak_chair
pnpm skill:check`}
        </pre>
        <p className="mt-2 text-sm text-black/60">
          包在 <code>.opencode/skills/craftengine-wiki/pack/</code>：INDEX.md、163 个页面、query / selfcheck 脚本。
        </p>
      </section>
    </div>
  );
}
