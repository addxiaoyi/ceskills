# Extract Reference — LLM Pipeline for CraftEngine

## Overview

Batch LLM extraction with caching, confidence scoring, and evidence tracking. Reuses `graphify` patterns (gemini-3-flash-preview, 22-file chunks, semantic cache).

## Pipeline Architecture

```
Raw Markdown (raw/zh-Hans/*.md)
    ↓
Chunk by 20-25 files (group by sidebar category)
    ↓
Parallel LLM calls (max 5 concurrent)
    ↓
Merge + Dedupe → .graphify_extract.json
    ↓
graphify build → graph.json
```

## Chunking Strategy

```typescript
// Group by sidebar top-level category for semantic coherence
const chunks = groupByCategory(files).map(categoryFiles => 
  chunkArray(categoryFiles, 22)  // 20-25 files per chunk
);
// Each image gets own chunk (not applicable here, but pattern preserved)
```

## Cache System

Reuse `graphify.cache.check_semantic_cache`:
- Key: `sha256(file_content + prompt_version)`
- Store: `nodes[]`, `edges[]`, `hyperedges[]`
- TTL: 30 days (configurable via `LLM_CACHE_TTL_DAYS`)
- Invalidation: On prompt version change or `--force-reextract`

## Prompt Templates

### System Prompt (Fixed)
```markdown
You are a CraftEngine configuration expert extracting structured knowledge from documentation.

## Entity Types (extract ALL that appear)
- Block: Custom blocks with behaviors, models, properties
- Item: Custom items, tools, food, spawn eggs
- Recipe: Crafting, smelting, stonecutting, custom recipes
- Config: YAML configuration keys with types, defaults, validation
- Event: Block/item/entity/player events with parameters
- API: Java/Kotlin classes, methods, annotations
- Compat: Version/mod/plugin compatibility matrix
- Addon: Official/community extensions

## Relation Types
- extends: Inheritance (Block→Block, Item→Item)
- requires: Dependency (Config→Entity, Recipe→Ingredient)
- compatible_with: Version/mod compatibility
- deprecated_by: Migration path
- example_of: Code block demonstrates entity
- implements: API implements Event
- provides: Addon provides Entity
- depends_on: Recipe depends on Item/Block

## Output Schema (JSON only)
{
  "nodes": [{
    "id": "type:slug",
    "label": "Human name",
    "type": "Block|Item|Recipe|Config|Event|API|Compat|Addon",
    "properties": { ... },
    "confidence": 0.0-1.0,
    "evidence": "Exact quote from source",
    "source_location": "url#Lstart-Lend"
  }],
  "edges": [{
    "source": "type:slug",
    "target": "type:slug",
    "label": "relation_type",
    "type": "EXTRACTED|INFERRED|AMBIGUOUS",
    "confidence": 0.0-1.0,
    "evidence": "Supporting text"
  }],
  "hyperedges": []  // For n-ary relations (e.g., recipe with multiple ingredients)
}
```

### User Prompt (Per Chunk)
```markdown
## Pages in this chunk ({count} files)

{for each file}
### File: {relative_path}
**URL**: {source_url}
**Title**: {title}
**Sidebar Path**: {sidebar_path.join(" > ")}
**Last Modified**: {last_modified}

```markdown
{markdown_content}
```
{/for}

Extract ALL entities and relations. Focus on:
1. YAML configuration examples (block:, item:, recipe:, config:)
2. Code blocks with annotations
3. Tables with properties/parameters
4. Explicit dependency statements
5. Version badges (since/deprecated)
```

## Batch Processing (scripts/extract.ts)

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkSemanticCache, saveSemanticCache } from './graphify-cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

async function extractChunk(files: FileInfo[], chunkNum: number, totalChunks: number) {
  // 1. Check cache
  const { cached, uncached } = await checkSemanticCache(files);
  
  if (uncached.length === 0) return cached;
  
  // 2. Build prompt
  const prompt = buildUserPrompt(uncached, chunkNum, totalChunks);
  
  // 3. Call LLM with retries
  const result = await callWithRetry(model, prompt, 3);
  
  // 4. Parse & validate
  const parsed = parseAndValidate(result.response.text());
  
  // 5. Save to cache
  await saveSemanticCache(parsed.nodes, parsed.edges, parsed.hyperedges);
  
  return { ...cached, ...parsed };
}
```

## Confidence Calibration

```typescript
function calibrateConfidence(entity: ExtractedEntity, source: SourceContext): number {
  let base = 0.5;
  
  // Source type
  if (source.hasYamlConfig) base = 0.95;
  else if (source.hasCodeBlock) base = 0.85;
  else if (source.hasTable) base = 0.80;
  else if (source.hasProse) base = 0.70;
  
  // Cross-validation
  if (entity.crossRefCount > 0) base += 0.05;
  if (entity.multiPageConsistent) base += 0.05;
  
  // Penalize
  if (entity.inferredOnly) base -= 0.20;
  if (entity.conflictingInfo) base -= 0.15;
  
  return Math.max(0.1, Math.min(0.99, base));
}
```

## Evidence Tracking

Every node/edge MUST include:
```json
{
  "evidence": "Exact quote (max 500 chars)",
  "source_location": "https://ce-pre.gtemc.cn/zh-Hans/configuration/block#L45-L60"
}
```

For code blocks, include line range from original markdown.

## Hyperedges (n-ary relations)

For recipes with multiple ingredients:
```json
{
  "hyperedges": [{
    "id": "recipe:custom_chair",
    "type": "RECIPE",
    "nodes": [
      "item:oak_planks",
      "item:stick",
      "item:wool"
    ],
    "role": "ingredient",
    "properties": { "pattern": ["A B", " C ", " C "] }
  }]
}
```

## Merge & Dedupe (Post-LLM)

```typescript
function mergeExtractions(chunks: ExtractionResult[]): MergedExtraction {
  const nodeMap = new Map<string, Node>();
  const edgeMap = new Map<string, Edge>();
  
  for (const chunk of chunks) {
    for (const node of chunk.nodes) {
      const existing = nodeMap.get(node.id);
      if (!existing || node.confidence > existing.confidence) {
        nodeMap.set(node.id, node);
      } else if (node.confidence === existing.confidence) {
        // Merge evidence
        existing.evidence += '\n---\n' + node.evidence;
      }
    }
    // Same for edges
  }
  
  return { nodes: [...nodeMap.values()], edges: [...edgeMap.values()] };
}
```

## Cost Tracking

```typescript
interface CostEntry {
  date: string;
  inputTokens: number;
  outputTokens: number;
  files: number;
  chunks: number;
  model: string;
}
```

Logged to `data/projects/craftengine-wiki/cost.json` (same format as graphify).

## CLI

```bash
# Full extraction (with cache)
pnpm --filter @ceskills/server tsx scripts/extract.ts --project craftengine-wiki

# Force re-extract (ignore cache)
pnpm --filter @ceskills/server tsx scripts/extract.ts --project craftengine-wiki --force

# Single file test
pnpm --filter @ceskills/server tsx scripts/extract.ts --project craftengine-wiki --file raw/zh-Hans/getting_start/installation.md
```