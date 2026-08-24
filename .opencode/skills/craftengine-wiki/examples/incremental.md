# Example: Incremental Update Workflow

## Daily Cron Setup

```bash
# Add to crontab (runs 3:00 AM daily)
0 3 * * * cd /path/to/ceskills && \
  GEMINI_API_KEY=$GEMINI_API_KEY \
  pnpm --filter @ceskills/server tsx scripts/crawl.ts update \
    --project craftengine-wiki \
    >> logs/update-$(date +\%Y\%m\%d).log 2>&1
```

Or use the built-in watcher:
```bash
# Runs continuously, checks every 6 hours
pnpm --filter @ceskills/server tsx scripts/watch.ts \
  --project craftengine-wiki \
  --interval 21600000
```

## Update Process

### 1. Sidebar Diff
```
🔍 Discovering sidebar...
📊 Previous: 142 pages
📊 Current:  147 pages
➕ Added: 5 pages
  - /zh-Hans/advanced/new_feature
  - /zh-Hans/configuration/block_new_property
  ...
➖ Removed: 0 pages
🔄 Changed: 3 pages (Last-Modified newer)
  - /zh-Hans/reference/block_behaviors
  - /zh-Hans/api/block_api
  - /zh-Hans/compatibility/paper_1_20_5
```

### 2. Selective Re-crawl
Only the 8 changed/new pages are crawled:
```
🕷️  Crawl: [1/8] /zh-Hans/advanced/new_feature
🕷️  Crawl: [2/8] /zh-Hans/configuration/block_new_property
...
✅ Crawl done: 8/8 pages updated
```

### 3. Incremental Extraction
Cache hits for 134 unchanged pages:
```
🔍 Cache check: 134 cached, 8 uncached
📦 Chunk 1/1: 8 files → 23 nodes, 31 edges (merged)
✅ Extract done: 1,112 nodes (+23), 1,878 edges (+31)
```

### 4. Graph Diff & Rebuild
```
🏗️  Rebuilding graph...
📊 Nodes: 1,112 | Edges: 1,878 | Communities: 6
📝 Diff saved: versions/v20260825-030000/diff.json
🌐 HTML updated: graph.html
```

### 5. WebUI Notification
If WebUI is open, receives SSE event:
```json
{
  "type": "graph_updated",
  "version": "v20260825-030000",
  "diff": { "added": 23, "removed": 0, "changed": 12 },
  "message": "Knowledge graph updated: 23 new entities, 12 changed"
}
```

## Diff Visualization

Open WebUI → Click "版本历史" (Version Timeline) → Select `v20260825-030000`

**GraphCanvas shows**:
- 🟢 Green nodes = Added (5 new blocks, 3 new configs, 2 new events)
- 🟡 Yellow nodes = Changed (config defaults updated, API params added)
- 🔴 Red nodes = Removed (none this run)
- 🔵 Blue edges = New relations

Click any highlighted node → EntityDrawer shows "变更详情" tab with before/after.

## Manual Update Trigger

```bash
# One-off update (e.g., after known wiki update)
/craftengine-wiki --update

# With WebUI auto-refresh
/craftengine-wiki --update --webui

# Force full re-extract (schema changes)
/craftengine-wiki --update --force-reextract
```

## Rollback

```bash
# List versions
ls data/projects/craftengine-wiki/versions/

# Rollback to previous
cp data/projects/craftengine-wiki/versions/v20260824-030000/graph.json \
   data/projects/craftengine-wiki/graph.json

# Or via WebUI: Version Timeline → "回滚到此版本"
```

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:3001/api/health/craftengine-wiki
# {"status":"ok","lastUpdate":"2026-08-25T03:00:00Z","nodeCount":1112,"edgeCount":1878}
```

### Logs
```
logs/
├── update-20260824.log
├── update-20260825.log
└── watch-20260825.log
```

### Alerting (Optional)
```bash
# Add to update script: if nodeCount drops >10%, alert
if [ $(jq '.removed | length' diff.json) -gt 50 ]; then
  curl -X POST $ALERT_WEBHOOK -d "⚠️ Large removal detected in craftengine-wiki"
fi
```

## Performance

| Metric | Full Crawl | Incremental |
|--------|------------|-------------|
| Time | 5-10 min | 30-60 sec |
| Pages crawled | 140+ | 5-15 |
| LLM calls | 7 chunks | 1 chunk |
| Tokens | ~500k | ~20k |
| Cost | ~$0.50 | ~$0.02 |

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| No changes detected | Wiki uses same Last-Modified | Use content hash in manifest |
| Spurious changes | Sidebar order changed | Normalize sidebar before diff |
| Cache miss on unchanged | Prompt version bump | Pin prompt version in config |
| Graph corruption | Merge conflict | `--force-reextract` + rebuild |