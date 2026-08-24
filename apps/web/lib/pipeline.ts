export type StepKey = 'discover' | 'crawl' | 'extract' | 'build' | 'done' | 'error';

export function friendlyLog(ev: any): string {
  const step = ev?.step as string;
  if (step === 'discover' && ev.status === 'started') return '正在找 Wiki 目录…';
  if (step === 'discover' && ev.status === 'done') return `找到 ${ev.pages ?? '?'} 篇文档`;
  if (step === 'crawl' && ev.status === 'ok') return `已保存 ${ev.current}/${ev.total}`;
  if (step === 'crawl' && String(ev.status || '').startsWith('error')) return `这一页失败了，跳过继续`;
  if (step === 'crawl' && ev.status === 'done') return '文档全部抓完了';
  if (step === 'extract' && ev.status === 'started') return '开始读文档、抽知识点…';
  if (step === 'extract' && ev.status === 'done') return `抽出 ${ev.nodes ?? 0} 个知识点`;
  if (step === 'extract' && ev.file) return `正在读 ${ev.current}/${ev.total}`;
  if (step === 'build' && ev.status === 'done') return '图谱画好了，可以提问了';
  if (step === 'done') return '全部完成';
  if (step === 'error') return `出错了：${ev.message || '未知错误'}`;
  return '';
}

export function stepFromEvent(ev: any): StepKey {
  if (ev?.step === 'error') return 'error';
  if (ev?.step === 'done' || (ev?.step === 'build' && ev.status === 'done')) return 'done';
  if (['discover', 'crawl', 'extract', 'build'].includes(ev?.step)) return ev.step;
  return 'discover';
}

export async function readSse(res: Response, onEvent: (ev: any) => void) {
  if (!res.body) return;
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
        onEvent(JSON.parse(line.slice(5)));
      } catch {}
    }
  }
}
