# Graph Reference — Building & Querying the Knowledge Graph

## Graph Construction Pipeline

Reuses `graphify` core: `build_from_json → cluster → god_nodes → surprising_connections → suggest_questions`

### Input: `.graphify_extract.json`
```json
{
  "nodes": [...],
  "edges": [...],
  "hyperedges": [...],
  "input_tokens": 12345,
  "output_tokens": 6789
}
```

### Build Steps (scripts/build.ts)

```typescript
import { buildFromJson, cluster, scoreAll, godNodes, surprisingConnections, suggestQuestions } from 'graphify';

const extraction = JSON.parse(readFileSync('.graphify_extract.json'));
const G = buildFromJson(extraction, { directed: true });  // Preserve edge direction

// Community detection (Louvain)
const communities = cluster(G);
const cohesion = scoreAll(G, communities);

// Analysis
const gods = godNodes(G);           // High-degree, cross-community nodes
const surprises = surprisingConnections(G, communities);  // Cross-community bridges
const questions = suggestQuestions(G, communities, labels);

// Outputs
writeFileSync('graph.json', JSON.stringify({ nodes, edges, communities, cohesion, gods, surprises }));
writeFileSync('GRAPH_REPORT.md', generateReport(...));
writeFileSync('graph.html', exportHtml(G, communities));  // Cytoscape standalone
```

## Node & Edge Schema (graph.json)

```typescript
interface GraphNode {
  id: string;              // "block:custom_chair"
  label: string;           // "可坐的椅子"
  type: EntityType;        // "Block" | "Item" | ...
  properties: Record<string, any>;
  community: number;       // Louvain community ID
  degree: number;          // Total degree
  inDegree: number;
  outDegree: number;
  confidence: number;      // Max confidence of source extractions
  source_locations: string[];  // All source URLs
}

interface GraphEdge {
  source: string;
  target: string;
  label: RelationType;
  type: 'EXTRACTED' | 'INFERRED' | 'AMBIGUOUS';
  confidence: number;
  evidence: string;
  source_locations: string[];
}
```

## Community Labels (Auto + Manual)

Auto-generated: `Community 0`, `Community 1`...
Manual override (run once, save to `.graphify_labels.json`):
```json
{
  "0": "Block Behaviors",
  "1": "Item Configuration",
  "2": "Recipe System",
  "3": "Events & API",
  "4": "Compatibility Matrix",
  "5": "Getting Started"
}
```

## God Nodes (Key Hubs)

High `degree` + cross-community edges. Examples for CraftEngine:
- `config:block.behaviors` — connects to all behavior types
- `api:BlockBehavior` — base class for all behaviors
- `event:BlockInteractEvent` — used by sittable, container, custom
- `compat:paper-1.20.4` — version hub

## Surprising Connections (Cross-Community Bridges)

Edges between distant communities that reveal hidden dependencies:
- `recipe:custom_chair` → `config:item.durability` (recipe output needs item config)
- `addon:furniture` → `event:PlayerSitEvent` (addon uses undocumented event)

## Incremental Diff (`--update`)

### Manifest-Based Diff
```typescript
interface DiffResult {
  addedNodes: GraphNode[];
  removedNodes: GraphNode[];
  changedNodes: { old: GraphNode; new: GraphNode; changes: Change[] }[];
  addedEdges: GraphEdge[];
  removedEdges: GraphEdge[];
  communityChanges: CommunityDiff[];
}

function computeDiff(oldGraph: Graph, newGraph: Graph, oldManifest: Manifest, newManifest: Manifest): DiffResult {
  // Node-level
  // Edge-level
  // Community-level (re-cluster only affected subgraph)
}
```

### Visual Diff in WebUI
- **Green** = Added nodes/edges
- **Red** = Removed
- **Yellow** = Changed properties
- **Blue** = Moved community

## Query Interface (Agent + WebUI)

### Agent Query API (`/craftengine-wiki query "..."`)
```typescript
async function answerQuery(question: string): Promise<QueryResult> {
  // 1. Embed question (sentence-transformers or Gemini)
  // 2. Vector search top-k nodes (if vector index exists)
  // 3. Graph traversal: BFS from seed nodes (depth 2-3)
  // 4. LLM synthesis with evidence citations
  // 5. Return structured answer
}
```

### Query Result Format
```json
{
  "answer": "要创建可坐的椅子方块，需要配置 `block:` 包含 `behaviors: [{ type: SITTABLE, config: { height: 0.5 } }]`...",
  "evidence": [
    { "node": "block:custom_chair", "quote": "behaviors: [{ type: SITTABLE...", "url": "..." },
    { "node": "config:block.behaviors.sittable", "quote": "height: 0.5", "url": "..." }
  ],
  "related": ["block:sofa", "event:PlayerSitEvent", "api:SittableBehavior"],
  "yaml_example": "block:\n  craftengine:custom_chair:\n    ...",
  "confidence": 0.92
}
```

### Graph Traversal Patterns

| Query Type | Traversal | Use Case |
|------------|-----------|----------|
| "How to configure X?" | BFS from X (depth 2) | Config + dependencies + examples |
| "What depends on Y?" | Reverse BFS (in-edges) | Impact analysis |
| "Migration from A to B" | Shortest path A→B | Upgrade path |
| "All sittable blocks" | Filter type=Block + hasBehavior(SITTABLE) | Feature discovery |
| "Compatibility with Paper 1.20.4" | Subgraph from compat node | Version matrix |

## Export Formats

### GraphML (Gephi/yEd)
```bash
pnpm --filter @ceskills/server tsx scripts/build.ts --export graphml
# → graph.graphml
```

### Neo4j Cypher
```bash
pnpm --filter @ceskills/server tsx scripts/build.ts --export neo4j --neo4j-uri bolt://localhost:7687
# Generates cypher.txt + optional push
```

### Obsidian Vault
```bash
pnpm --filter @ceskills/server tsx scripts/build.ts --export obsidian --obsidian-dir ~/vaults/craftengine
# One .md per node, with [[wikilinks]] for edges
```

### SVG (Static)
```bash
pnpm --filter @ceskills/server tsx scripts/build.ts --export svg
# → graph.svg (community layout)
```

## Performance Targets

| Metric | Target |
|--------|--------|
| Nodes | < 5000 (auto-aggregate if exceeded) |
| Edges | < 15000 |
| Build time | < 30s (after extraction) |
| Query latency | < 500ms (cached), < 2s (fresh) |
| HTML size | < 5MB (gzipped < 1MB) |

## Large Graph Handling (>5000 nodes)

1. Auto-aggregate to community-level graph
2. WebUI shows community nodes by default
3. Click community → expand to member nodes (lazy load)
4. Search still works on full node index

## Version History

Each `--update` run creates:
```
data/projects/craftengine-wiki/versions/v{timestamp}/
  ├── graph.json
  ├── diff.json
  └── GRAPH_REPORT.md
```

WebUI VersionTimeline component loads these for comparison.

## CLI

```bash
# Build from existing extraction
pnpm --filter @ceskills/server tsx scripts/build.ts --project craftengine-wiki

# Build + export all formats
pnpm --filter @ceskills/server tsx scripts/build.ts --project craftengine-wiki --export all

# Query from CLI
pnpm --filter @ceskills/server tsx scripts/build.ts --project craftengine-wiki --query "如何注册方块?"
```