# Example: Basic Crawl Walkthrough

## Prerequisites

```bash
# 1. Install dependencies
cd ceskills
pnpm install

# 2. Set API keys (at least one required)
export GEMINI_API_KEY=your_key_here
# or
export OPENAI_API_KEY=your_key_here

# 3. (Optional) For private wiki access
# Create cookies.json by logging in manually with Playwright:
# pnpm --filter @ceskills/server tsx scripts/crawl.ts login
export CRAFTENGINE_WIKI_COOKIE_FILE=./cookies.json
```

## Step 1: Discover Sidebar

```bash
pnpm --filter @ceskills/server tsx scripts/crawl.ts discover \
  --url https://ce-pre.gtemc.cn/zh-Hans/ \
  --output data/projects/craftengine-wiki/sidebar-map.json
```

**Output**: `sidebar-map.json` with ~150 pages organized by category.

## Step 2: Full Crawl

```bash
pnpm --filter @ceskills/server tsx scripts/crawl.ts crawl \
  --url https://ce-pre.gtemc.cn/zh-Hans/ \
  --lang zh-Hans \
  --project craftengine-wiki \
  --concurrency 3
```

**Progress** (SSE stream):
```
📋 Discover: 142 pages found
🕷️  Crawl: [1/142] https://ce-pre.gtemc.cn/zh-Hans/
🕷️  Crawl: [2/142] https://ce-pre.gtemc.cn/zh-Hans/intro/exclusive_feature
...
✅ Crawl done: 142 pages saved to raw/zh-Hans/
```

## Step 3: Extract Entities

```bash
pnpm --filter @ceskills/server tsx scripts/extract.ts \
  --project craftengine-wiki
```

**Progress**:
```
🔍 Cache check: 0 cached, 142 uncached
📦 Chunk 1/7: 22 files → 156 nodes, 203 edges
📦 Chunk 2/7: 22 files → 142 nodes, 187 edges
...
✅ Extract done: 1,089 nodes, 1,847 edges (cached: 0, new: 142)
```

## Step 4: Build Graph

```bash
pnpm --filter @ceskills/server tsx scripts/build.ts \
  --project craftengine-wiki \
  --export html
```

**Output**:
```
🏗️  Building graph...
📊 Nodes: 1,089 | Edges: 1,847 | Communities: 6
👑 God nodes: config:block.behaviors, api:BlockBehavior, event:BlockInteractEvent
🔗 Surprises: 12 cross-community bridges
📝 Report: GRAPH_REPORT.md
🌐 HTML: graph.html (2.3 MB)
```

## Step 5: Launch WebUI

```bash
# Terminal 1: API server
pnpm --filter @ceskills/server dev

# Terminal 2: WebUI
pnpm --filter @ceskills/web dev
```

Open http://localhost:3000 → Click "craftengine-wiki" project

## Step 6: Query as Agent

```bash
# CLI query
pnpm --filter @ceskills/server tsx scripts/build.ts \
  --project craftengine-wiki \
  --query "如何注册一个可坐的自定义方块？"

# Output:
# 📝 Answer: 要创建可坐的方块，在 block 配置中添加 SITTABLE behavior...
# 📎 Evidence: block:custom_chair (L45-52), config:block.behaviors.sittable (L12-18)
# 🔗 Related: block:sofa, event:PlayerSitEvent, api:SittableBehavior
# 📄 YAML Example: (full config block)
# ✅ Confidence: 0.94
```

## Expected Results

| Metric | Target |
|--------|--------|
| Pages crawled | ~140-160 |
| Nodes extracted | ~1000-1300 |
| Edges | ~1800-2200 |
| Communities | 5-7 |
| Build time | 5-10 min (first run) |
| Graph.html size | 2-5 MB |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Playwright timeout | Increase `--timeout 60000` |
| 429 Too Many Requests | Reduce `--concurrency 1`, increase `--delay 2000` |
| LLM token limit | Reduce chunk size `--chunk-size 15` |
| Missing selectors | Check `references/crawl.md` fallback selectors |
| Graph empty | Check extraction output, verify `--force` re-extract |

## Next Steps

- Set up daily cron: `0 3 * * * /craftengine-wiki --update`
- Configure Neo4j export for team queries
- Add custom ontology for your server's addons