# Crawl Reference — Docusaurus v3 (CraftEngine Wiki)

## Site Profile

- **Base URL**: `https://ce-pre.gtemc.cn`
- **Locales**: `zh-Hans` (primary), `en`
- **Framework**: Docusaurus v3.10.2
- **Content**: MDX with frontmatter, React components, code blocks
- **Auth**: Public (pre-production), but may need cookies for private sections

## Discovery: Sidebar Map

Docusaurus injects `__docusaurus` global with sidebar data. Extract via Playwright:

```typescript
// scripts/crawl.ts → discover()
await page.goto(`${baseUrl}/zh-Hans/`);
const sidebarMap = await page.evaluate(() => {
  // Docusaurus v3 stores sidebar in window.__docusaurus?.sidebar
  // Fallback: parse DOM .theme-doc-sidebar-menu
  const menu = document.querySelector('.theme-doc-sidebar-menu');
  return parseSidebar(menu);
});
```

**Output**: `sidebar-map.json`
```json
{
  "version": "current",
  "locale": "zh-Hans",
  "items": [
    { "type": "category", "label": "📗 介绍", "href": "/zh-Hans/", "children": [
      { "type": "doc", "label": "☄️ 独家功能", "href": "/zh-Hans/intro/exclusive_feature" },
      { "type": "doc", "label": "🥕 简而不凡", "href": "/zh-Hans/intro/simply_better" }
    ]},
    { "type": "category", "label": "👋 入门指南", "href": "/zh-Hans/getting_start", "children": [...] }
  ],
  "flat": ["/zh-Hans/", "/zh-Hans/intro/exclusive_feature", ...]
}
```

## Crawl Strategy

### 1. Ordered Crawl (Respect Hierarchy)
- Process `sidebar-map.flat` in order → natural parent-before-child
- Depth from sidebar nesting level (category → doc → doc)

### 2. Playwright Page Load
```typescript
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForSelector('.theme-doc-markdown', { timeout: 10000 });
// Scroll to trigger lazy images
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
```

### 3. Content Extraction (Cheerio + Defuddle)
```typescript
const html = await page.content();
const $ = cheerio.load(html);

// Remove noise
$('nav, aside, .navbar, .theme-doc-sidebar-container, .pagination-nav, footer, script, style, .theme-admonition').remove();

// Main content
const markdown = defuddle($('article.theme-doc-markdown').html() || '');

// Metadata
const title = $('h1').first().text().trim();
const toc = $('.table-of-contents a').map((_, el) => ({
  text: $(el).text().trim(),
  href: $(el).attr('href')
})).get();
const codeBlocks = $('pre code').map((_, el) => ({
  lang: $(el).parent().attr('class')?.replace('language-', '') || 'yaml',
  code: $(el).text()
})).get();
const lastModified = $('time[itemprop="dateModified"]').attr('datetime') 
  || $('meta[name="docusaurus_tag"]').attr('content');
```

### 4. Markdown Cleanup
- Normalize relative links: `/zh-Hans/intro/...` → keep as-is for cross-ref
- Strip Docusaurus-specific: `:::info`, `:::tip` → convert to Markdown blockquotes
- Preserve frontmatter-like YAML code blocks (critical for config extraction)

### 5. Save Raw Markdown
```
data/projects/craftengine-wiki/raw/zh-Hans/intro/exclusive_feature.md
```
Frontmatter injected:
```yaml
---
source_url: "https://ce-pre.gtemc.cn/zh-Hans/intro/exclusive_feature"
title: "☄️ 独家功能"
locale: "zh-Hans"
crawled_at: "2026-08-24T10:30:00Z"
last_modified: "2026-07-14T13:16:03Z"
sidebar_path: ["📗 介绍", "☄️ 独家功能"]
toc: [...]
code_blocks_count: 3
---
```

## Incremental Update (`--update`)

1. Re-run `discover()` → new `sidebar-map.json`
2. Diff vs stored `sidebar-map.json`:
   - **Added**: new hrefs → crawl
   - **Removed**: log, mark nodes stale in graph
   - **Changed**: compare `last_modified` / content hash → re-crawl if changed
3. Only process changed pages → extract → merge into graph

## Rate Limiting & Politeness

```typescript
const CRAWL_CONFIG = {
  concurrency: 3,           // Max parallel pages
  delayMs: 500,             // Delay between requests
  respectRobots: true,      // Check robots.txt
  userAgent: 'ceskills-craftengine-wiki/1.0 (+https://github.com/addxiaoyi/ceskills)',
  maxRetries: 3,
  timeoutMs: 30000
};
```

## Error Handling

| Error | Action |
|-------|--------|
| 404 | Log, continue, mark missing in manifest |
| 429/5xx | Exponential backoff (1s, 2s, 4s), max 3 retries |
| Timeout | Retry once with longer timeout (60s) |
| Selector missing | Try fallback selectors, log warning, save raw HTML |
| JS error | Capture screenshot, continue |

## Selectors (Docusaurus v3 Stable)

| Element | Primary | Fallback |
|---------|---------|----------|
| Main content | `article.theme-doc-markdown` | `.docMainContainer_TBSr article` |
| Sidebar | `.theme-doc-sidebar-menu` | `[data-doc-sidebar-item]` |
| Title | `h1` | `.theme-doc-markdown h1` |
| TOC | `.table-of-contents a` | `[class*="tableOfContents"] a` |
| Code blocks | `pre code` | `.theme-doc-markdown pre code` |
| Last modified | `time[itemprop="dateModified"]` | `meta[name="docusaurus_tag"]` |
| Language switcher | `.dropdown__link--active` | `[href*="/zh-Hans/"]` |

## Dual-Language Strategy

1. Crawl `zh-Hans` first (primary)
2. For each `href`, derive `en` version: `/zh-Hans/path` → `/path`
3. Crawl `en` version, merge:
   - Same entity → `translations.en` field
   - `en` only entities → add with `locale: "en"`
4. Dedupe by canonical ID (slug without locale prefix)

## Manifest Format (`manifest.json`)

```json
{
  "version": 1,
  "site": "https://ce-pre.gtemc.cn",
  "locale": "zh-Hans",
  "crawledAt": "2026-08-24T10:30:00Z",
  "pages": {
    "/zh-Hans/intro/exclusive_feature": {
      "hash": "sha256:abc123...",
      "lastModified": "2026-07-14T13:16:03Z",
      "wordCount": 1240,
      "codeBlocks": 3,
      "status": "ok"
    }
  },
  "sidebarHash": "sha256:sidebar_structure_hash"
}
```

## CLI Usage

```bash
# Discover only (outputs sidebar-map.json)
pnpm --filter @ceskills/server tsx scripts/crawl.ts discover --url https://ce-pre.gtemc.cn/zh-Hans/

# Full crawl
pnpm --filter @ceskills/server tsx scripts/crawl.ts crawl --url https://ce-pre.gtemc.cn/zh-Hans/ --lang zh-Hans

# Incremental update
pnpm --filter @ceskills/server tsx scripts/crawl.ts update --url https://ce-pre.gtemc.cn/zh-Hans/
```