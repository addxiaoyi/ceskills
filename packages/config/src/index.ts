import type { ProjectConfig } from '@ceskills/shared';

export const defaultCraftengineConfig: ProjectConfig = {
  id: 'craftengine-wiki',
  name: 'CraftEngine Wiki',
  site: {
    base_url: 'https://ce-pre.gtemc.cn',
    locales: ['zh-Hans'],
  },
  crawl: {
    concurrency: 3,
    delay_ms: 500,
    timeout_ms: 30000,
    respect_robots: true,
    userAgent: 'ceskills-craftengine-wiki/1.0 (+https://github.com/addxiaoyi/ceskills)',
  },
  llm: {
    model: 'gemini-3-flash-preview',
    batch_size: 22,
    cache_ttl_days: 30,
  },
  graph: {
    directed: true,
    min_confidence: 0.5,
  },
};

export const SELECTORS = {
  content: 'article.theme-doc-markdown',
  title: 'h1',
  toc: '.table-of-contents a',
  codeBlocks: 'pre code',
  sidebar: '.theme-doc-sidebar-menu',
  lastModified: 'time[itemprop="dateModified"]',
} as const;
