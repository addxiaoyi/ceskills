# WebUI Reference — Next.js Frontend for CraftEngine Knowledge Graph

## Architecture

```
apps/web/
├── app/
│   ├── page.tsx                    # Project list / landing
│   ├── projects/[id]/
│   │   ├── page.tsx                # Main graph view
│   │   ├── diff/page.tsx           # Version diff view
│   │   └── query/page.tsx          # Agent query interface
│   ├── api/
│   │   ├── crawl/route.ts          # POST /api/crawl
│   │   ├── extract/route.ts        # POST /api/extract
│   │   ├── graph/route.ts          # GET /api/graph, /api/graph/diff
│   │   ├── query/route.ts          # POST /api/query
│   │   └── export/route.ts         # GET /api/export?format=...
│   └── layout.tsx
├── components/
│   ├── GraphCanvas.tsx             # Cytoscape wrapper
│   ├── EntityDrawer.tsx            # Right panel: node details
│   ├── SearchBar.tsx               # Fuzzy search
│   ├── FilterPanel.tsx             # Type/community/confidence filters
│   ├── VersionTimeline.tsx         # Update history
│   ├── YamlViewer.tsx              # Syntax-highlighted YAML
│   ├── ProgressStream.tsx          # SSE progress for long runs
│   └── Toolbar.tsx                 # Export, layout, settings
├── lib/
│   ├── graph.ts                    # Graph data fetching + caching
│   ├── api.ts                      # API client
│   └── utils.ts                    # cn(), formatters
└── styles/globals.css
```

## Key Components

### GraphCanvas.tsx (Core)
```tsx
import Cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

Cytoscape.use(coseBilkent);

interface GraphCanvasProps {
  graph: GraphData;           // { nodes, edges, communities }
  onNodeClick: (node: GraphNode) => void;
  onEdgeClick: (edge: GraphEdge) => void;
  filters: GraphFilters;
  layout: 'cose-bilkent' | 'fcose' | 'circle' | 'grid';
  highlight?: { nodes: string[]; edges: string[] };  // Diff highlight
}

// Features:
// - Community-colored nodes (hash label → hue)
// - Node size = log(degree + 1) * baseSize
// - EXTRACTED = solid, INFERRED = dashed, AMBIGUOUS = dotted
// - Hover → tooltip with label + type + confidence
// - Click → open EntityDrawer
// - Canvas: pan/zoom, box select, lasso select
// - >5000 nodes: auto-switch to community meta-nodes
// - WebGL renderer for performance
```

### EntityDrawer.tsx (Right Panel)
```tsx
interface EntityDrawerProps {
  node: GraphNode | null;
  edges: GraphEdge[];         // Connected edges
  onClose: () => void;
}

// Tabs:
// 1. Overview: label, type, confidence, source locations (links)
// 2. Properties: JSON/YAML view with copy button
// 3. YAML Config: syntax-highlighted (Monaco or Prism)
// 4. Relations: table of connected nodes (filter by relation type)
// 5. Source: Original markdown snippet (link to wiki)
// 6. History: VersionTimeline for this node
```

### SearchBar.tsx
```tsx
// Fuse.js for fuzzy search
// Index: node.label, node.id, node.properties.*, edge.label
// Debounced 150ms
// Results: grouped by type, click → center on node
```

### FilterPanel.tsx
```tsx
interface GraphFilters {
  types: EntityType[];           // Multi-select
  communities: number[];         // Multi-select
  relationTypes: RelationType[]; // Edge filter
  confidenceMin: number;         // Slider 0-1
  showInferred: boolean;
  showAmbiguous: boolean;
  searchText: string;
}
```

### VersionTimeline.tsx
```tsx
// Loads versions/v*/diff.json
// Visual: horizontal timeline, click version → load diff
// Diff view: GraphCanvas with highlight prop
```

### ProgressStream.tsx (SSE)
```tsx
// Connects to /api/crawl/stream or /api/extract/stream
// EventSource API
// Shows: current step, pages done/total, ETA, current URL
// Auto-reconnect on disconnect
```

## API Contracts

### POST /api/crawl
```json
// Request
{
  "url": "https://ce-pre.gtemc.cn/zh-Hans/",
  "locale": "zh-Hans",
  "depth": 2,
  "incremental": false
}

// Response (SSE stream)
data: {"step": "discover", "status": "started", "message": "Fetching sidebar..."}
data: {"step": "discover", "status": "done", "pages": 142}
data: {"step": "crawl", "status": "progress", "current": 1, "total": 142, "url": "..."}
data: {"step": "crawl", "status": "done", "saved": 142}
```

### POST /api/extract
```json
// Request
{
  "projectId": "craftengine-wiki",
  "force": false
}

// Response (SSE)
data: {"step": "cache_check", "cached": 89, "uncached": 53}
data: {"step": "extract", "chunk": 1, "total": 3, "status": "processing"}
data: {"step": "extract", "status": "done", "nodes": 1240, "edges": 2100}
```

### GET /api/graph?projectId=craftengine-wiki
```json
// Response
{
  "nodes": [...],
  "edges": [...],
  "communities": { "0": "Block Behaviors", ... },
  "gods": ["config:block.behaviors", ...],
  "surprises": [...],
  "metadata": { "nodeCount": 1240, "edgeCount": 2100, "builtAt": "..." }
}
```

### GET /api/graph/diff?projectId=...&from=v1&to=v2
```json
{
  "addedNodes": [...],
  "removedNodes": [...],
  "changedNodes": [...],
  "addedEdges": [...],
  "removedEdges": [...]
}
```

### POST /api/query
```json
// Request
{
  "projectId": "craftengine-wiki",
  "question": "如何注册一个可坐的方块？",
  "mode": "agent"  // "agent" | "graph" | "hybrid"
}

// Response
{
  "answer": "...",
  "evidence": [...],
  "related": [...],
  "yaml_example": "...",
  "confidence": 0.92
}
```

### GET /api/export?projectId=...&format=graphml|neo4j|svg|obsidian
- `graphml` → application/xml
- `neo4j` → text/plain (Cypher)
- `svg` → image/svg+xml
- `obsidian` → application/zip

## State Management (Zustand)

```typescript
// stores/useGraphStore.ts
interface GraphState {
  graph: GraphData | null;
  filters: GraphFilters;
  selectedNode: GraphNode | null;
  selectedEdges: string[];
  layout: LayoutType;
  diffMode: { from: string; to: string } | null;
  
  setGraph: (g: GraphData) => void;
  setFilters: (f: Partial<GraphFilters>) => void;
  selectNode: (id: string | null) => void;
  setLayout: (l: LayoutType) => void;
  setDiffMode: (d: GraphState['diffMode']) => void;
}
```

## Data Fetching (TanStack Query)

```typescript
// hooks/useGraph.ts
export function useGraph(projectId: string) {
  return useQuery({
    queryKey: ['graph', projectId],
    queryFn: () => fetchGraph(projectId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useGraphStream(projectId: string, runId: string) {
  // Custom hook for SSE progress
}
```

## Styling (Tailwind v4 + shadcn/ui)

```css
/* globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Cytoscape container */
.graph-canvas {
  @apply w-full h-[calc(100vh-4rem)] bg-gray-50;
}

/* EntityDrawer */
.entity-drawer {
  @apply fixed right-0 top-0 h-full w-96 bg-white border-l shadow-xl z-50;
  @apply transition-transform duration-300;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .graph-canvas { @apply bg-gray-900; }
  .entity-drawer { @apply bg-gray-800 border-gray-700; }
}
```

## shadcn/ui Components Used

- `Button`, `Select`, `Slider`, `Tabs`, `Tooltip`, `Popover`
- `ScrollArea`, `Separator`, `Sheet` (mobile drawer)
- `Command` (command palette for search)
- `Toast` (notifications)

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `< 768px` | Stack: Graph full width, Drawer as Sheet (bottom) |
| `768-1024px` | Graph 70%, Drawer 30% |
| `> 1024px` | Graph 75%, Drawer 25% |

## Performance Optimizations

1. **Virtualized Graph**: Only render visible nodes (Cytoscape handles)
2. **Memoized Filters**: `useMemo` for filtered graph data
3. **Lazy Edge Rendering**: Only render edges for visible nodes
4. **Code Splitting**: `dynamic(() => import('./GraphCanvas'), { ssr: false })`
5. **WebGL**: `cytoscape-webgl` renderer for >2000 nodes

## Accessibility

- Keyboard navigation: Tab → focus node, Enter → open drawer
- ARIA labels on all interactive elements
- Color-blind safe palette (viridis for communities)
- Reduced motion: `prefers-reduced-motion` disables animations

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## Scripts

```json
{
  "dev": "next dev -p 3000",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit"
}
```