export type EntityType = 'Block' | 'Item' | 'Recipe' | 'Config' | 'Event' | 'API' | 'Compat' | 'Addon';
export type RelationType = 'extends' | 'requires' | 'compatible_with' | 'deprecated_by' | 'example_of' | 'implements' | 'provides' | 'depends_on';
export type EdgeType = 'EXTRACTED' | 'INFERRED' | 'AMBIGUOUS';

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  properties: Record<string, any>;
  confidence: number;
  evidence: string;
  source_location: string;
  source_locations?: string[];
  community?: number;
  degree?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  label: RelationType;
  type: EdgeType;
  confidence: number;
  evidence: string;
  source_location?: string;
}

export interface GraphHyperedge {
  id: string;
  type: string;
  nodes: string[];
  role?: string;
  properties?: Record<string, any>;
}

export interface ExtractionResult {
  nodes: GraphNode[];
  edges: GraphEdge[];
  hyperedges: GraphHyperedge[];
  input_tokens?: number;
  output_tokens?: number;
}

export interface CrawledPage {
  url: string;
  title: string;
  locale: string;
  markdown: string;
  html: string;
  toc: { text: string; href: string }[];
  codeBlocks: { lang: string; code: string }[];
  sidebarPath: string[];
  lastModified?: string;
  crawledAt: string;
  hash: string;
}

export interface SidebarItem {
  type: 'category' | 'doc' | 'link';
  label: string;
  href: string;
  children?: SidebarItem[];
}

export interface SidebarMap {
  version: string;
  locale: string;
  baseUrl: string;
  items: SidebarItem[];
  flat: string[];
  fetchedAt: string;
  hash: string;
}

export interface CrawlManifest {
  version: number;
  site: string;
  locale: string;
  crawledAt: string;
  pages: Record<string, {
    hash: string;
    lastModified?: string;
    wordCount: number;
    codeBlocks: number;
    status: 'ok' | 'error' | 'skipped';
    error?: string;
  }>;
  sidebarHash: string;
}

export interface ProjectConfig {
  id: string;
  name: string;
  site: {
    base_url: string;
    locales: string[];
  };
  crawl: {
    concurrency: number;
    delay_ms: number;
    timeout_ms: number;
    respect_robots: boolean;
    userAgent: string;
  };
  llm: {
    model: string;
    batch_size: number;
    cache_ttl_days: number;
  };
  graph: {
    directed: boolean;
    min_confidence: number;
  };
}

export interface QueryResult {
  answer: string;
  evidence: { node: string; quote: string; url: string; lineRange?: [number, number] }[];
  related: string[];
  yaml_example?: string;
  confidence: number;
  traversal?: { path: string[]; communities: number[] };
}
