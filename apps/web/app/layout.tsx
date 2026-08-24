import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'CraftEngine 小助手',
  description: '抓取 Wiki，做成能问的知识图谱',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body className="grain min-h-screen">
        <header className="sticky top-0 z-20 border-b border-black/5 bg-[#f4efe4]/85 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <a href="/" className="display text-lg font-bold tracking-tight">
              🌿 CraftEngine 小助手
            </a>
            <nav className="flex gap-2 text-sm font-bold">
              <a href="/" className="rounded-full px-3 py-1.5 hover:bg-black/5">
                开始
              </a>
              <a href="/graph" className="rounded-full px-3 py-1.5 hover:bg-black/5">
                看图谱
              </a>
              <a
                href="https://ce-pre.gtemc.cn/zh-Hans/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1.5 hover:bg-black/5"
              >
                原文 Wiki
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
