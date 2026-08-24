import * as cheerio from 'cheerio';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { CrawledPage, SidebarItem, SidebarMap, CrawlManifest } from '@ceskills/shared';

export interface CrawlOptions {
  baseUrl: string;
  locale: string;
  concurrency: number;
  delayMs: number;
  timeoutMs: number;
  outputDir: string;
  onProgress?: (ev: { current: number; total: number; url: string; status: string }) => void;
}

function hash(s: string) {
  return createHash('sha256').update(s).digest('hex').slice(0, 16);
}

async function fetchHtml(url: string, timeoutMs = 30000): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'ceskills-craftengine-wiki/1.0 (+https://github.com/addxiaoyi/ceskills)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function parseSidebar($: cheerio.CheerioAPI, baseUrl: string): SidebarItem[] {
  const parse = ($ul: cheerio.Cheerio<any>): SidebarItem[] => {
    const res: SidebarItem[] = [];
    $ul.children('li').each((_, li) => {
      const $li = $(li);
      const $a = $li.find('> .menu__list-item-collapsible a, > a.menu__link').first();
      const label =
        $li.find('.categoryLinkLabel_W154, .linkLabel_WmDU').first().text().trim() ||
        $a.text().trim();
      const href = $a.attr('href') || '';
      const $sub = $li.children('ul.menu__list');
      const children = $sub.length ? parse($sub) : undefined;
      res.push({
        label,
        href,
        type: children?.length ? 'category' : 'doc',
        children,
      });
    });
    return res;
  };
  const root = $('.theme-doc-sidebar-menu > ul.menu__list, ul.theme-doc-sidebar-menu');
  return parse(root.first());
}

function flatten(items: SidebarItem[], baseUrl: string): string[] {
  const out: string[] = [];
  const walk = (arr: SidebarItem[]) => {
    for (const it of arr) {
      if (it.href) {
        const full = it.href.startsWith('http') ? it.href : `${baseUrl.replace(/\/$/, '')}${it.href}`;
        out.push(full);
      }
      if (it.children) walk(it.children);
    }
  };
  walk(items);
  return [...new Set(out)];
}

function htmlToMarkdown(html: string, url: string, locale: string, extra: { title: string; lastModified?: string; sidebarPath: string[] }): string {
  const $ = cheerio.load(html);
  const title = extra.title;
  const toc = $('.table-of-contents a')
    .map((_, el) => ({ text: $(el).text().trim(), href: $(el).attr('href') || '' }))
    .get();
  $('nav, aside, .navbar, .theme-doc-sidebar-container, .pagination-nav, footer, script, style, .theme-layout-navbar, .tableOfContents_bqdL').remove();
  let md = $('article.theme-doc-markdown').html() || $('main').html() || '';
  md = md.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, l, t) => `\n${'#'.repeat(Number(l))} ${cheerio.load(t).text().trim()}\n`);
  md = md.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, c) => `\n\`\`\`yaml\n${cheerio.load(`<div>${c}</div>`).text()}\n\`\`\`\n`);
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${cheerio.load(c).text()}\``);
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, t) => `[${cheerio.load(t).text().trim()}](${h})`);
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${cheerio.load(c).text().trim()}`);
  md = cheerio.load(md).text();
  const frontMatter = `---
source_url: "${url}"
title: "${title.replace(/"/g, '\\"')}"
locale: "${locale}"
crawled_at: "${new Date().toISOString()}"
last_modified: "${extra.lastModified || ''}"
sidebar_path: [${extra.sidebarPath.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(', ')}]
toc_count: ${toc.length}
---

`;
  return frontMatter + md.trim() + '\n';
}

function parsePage(html: string, url: string, locale: string): CrawledPage {
  const $ = cheerio.load(html);
  const title =
    $('article.theme-doc-markdown h1').first().text().trim() ||
    $('h1').first().text().trim() ||
    url;
  const toc = $('.table-of-contents a')
    .map((_, el) => ({ text: $(el).text().trim(), href: $(el).attr('href') || '' }))
    .get();
  const codeBlocks = $('pre code')
    .map((_, el) => ({
      lang: ($(el).attr('class') || '').replace('language-', '') || 'text',
      code: $(el).text(),
    }))
    .get();
  const lastModified = $('time[itemprop="dateModified"]').attr('datetime') || undefined;
  const sidebarPath: string[] = [];
  $('nav.breadcrumbs span.breadcrumbs__link, .breadcrumbs__item span').each((_, el) => {
    const t = $(el).text().trim();
    if (t) sidebarPath.push(t);
  });
  const markdown = htmlToMarkdown(html, url, locale, { title, lastModified, sidebarPath });
  return {
    url,
    title,
    locale,
    markdown,
    html,
    toc,
    codeBlocks,
    sidebarPath,
    lastModified,
    crawledAt: new Date().toISOString(),
    hash: hash(markdown),
  };
}

async function discoverSitemap(baseUrl: string, locale: string): Promise<string[]> {
  const origin = baseUrl.replace(/\/$/, '');
  const xml = await fetchHtml(`${origin}/sitemap.xml`);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const skip = /\/search\/?$/;
  const prefix = locale ? `/${locale}` : '';
  const urls: string[] = [];
  for (const loc of locs) {
    if (skip.test(loc)) continue;
    try {
      const u = new URL(loc);
      if (u.origin !== origin) continue;
      let p = u.pathname;
      if (prefix && !p.startsWith(`${prefix}/`) && p !== prefix) {
        p = p === '/' ? `${prefix}/` : `${prefix}${p}`;
      }
      urls.push(`${origin}${p}`);
    } catch {
      /* ignore */
    }
  }
  return [...new Set(urls)];
}

export async function discoverSidebar(baseUrl: string, locale: string): Promise<SidebarMap> {
  const url = `${baseUrl.replace(/\/$/, '')}/${locale}/`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items = parseSidebar($, baseUrl);
  let flat = flatten(items, baseUrl);
  try {
    const fromSitemap = await discoverSitemap(baseUrl, locale);
    flat = [...new Set([...flat, ...fromSitemap])];
  } catch {
    /* sitemap optional */
  }
  if (!flat.length) {
    throw new Error(`sidebar empty at ${url} — check locale / network`);
  }
  return {
    version: 'current',
    locale,
    baseUrl,
    items,
    flat,
    fetchedAt: new Date().toISOString(),
    hash: hash(JSON.stringify(items) + flat.join('|')),
  };
}

export async function crawlPages(
  sidebar: SidebarMap,
  opts: CrawlOptions,
): Promise<{ pages: CrawledPage[]; manifest: CrawlManifest }> {
  const pages: CrawledPage[] = [];
  const manifest: CrawlManifest = {
    version: 1,
    site: opts.baseUrl,
    locale: opts.locale,
    crawledAt: new Date().toISOString(),
    pages: {},
    sidebarHash: sidebar.hash,
  };
  const urls = sidebar.flat;
  let idx = 0;
  const queue = [...urls];
  const concurrency = Math.max(1, opts.concurrency);

  async function worker() {
    while (queue.length) {
      const url = queue.shift()!;
      const cur = ++idx;
      opts.onProgress?.({ current: cur, total: urls.length, url, status: 'fetching' });
      try {
        const html = await fetchHtml(url, opts.timeoutMs);
        const page = parsePage(html, url, opts.locale);
        const rel =
          url.replace(`${opts.baseUrl.replace(/\/$/, '')}/${opts.locale}/`, '').replace(/\/$/, '') ||
          'index';
        const filePath = path.join(opts.outputDir, `${rel.replace(/[\/\\?%*:|"<>]/g, '_')}.md`);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, page.markdown, 'utf-8');
        pages.push(page);
        manifest.pages[url] = {
          hash: page.hash,
          lastModified: page.lastModified,
          wordCount: page.markdown.split(/\s+/).length,
          codeBlocks: page.codeBlocks.length,
          status: 'ok',
        };
        opts.onProgress?.({ current: cur, total: urls.length, url, status: 'ok' });
      } catch (e: any) {
        manifest.pages[url] = {
          hash: '',
          wordCount: 0,
          codeBlocks: 0,
          status: 'error',
          error: String(e?.message || e),
        };
        opts.onProgress?.({
          current: cur,
          total: urls.length,
          url,
          status: 'error:' + String(e?.message || e).slice(0, 120),
        });
      }
      if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  manifest.crawledAt = new Date().toISOString();
  return { pages, manifest };
}
