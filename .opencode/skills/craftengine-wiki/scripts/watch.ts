#!/usr/bin/env tsx
import { setTimeout as sleep } from 'node:timers/promises';
const interval = Number(process.argv.find(a=>a.startsWith('--interval'))?.split('=')[1] || 6*3600*1000);
console.log(`watch interval ${interval}ms`);
while (true) {
  console.log(`[${new Date().toISOString()}] trigger update...`);
  try {
    const { spawn } = await import('node:child_process');
    await new Promise<void>((res, rej)=>{
      const p = spawn(process.execPath, ['--loader','tsx','--no-warnings','scripts/crawl.ts','update','--project','craftengine-wiki'], { stdio:'inherit', cwd: process.cwd() });
      p.on('exit', code=> code===0?res():rej(new Error(String(code))));
    });
  } catch(e){ console.error(e); }
  await sleep(interval);
}
