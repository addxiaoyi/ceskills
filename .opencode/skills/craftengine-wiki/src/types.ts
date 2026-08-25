/**
 * CraftEngine Wiki - 六部工作流核心类型定义
 */

export interface WikiConfig {
  wiki: {
    baseUrl: string;
    indexUrl: string;
  };
  paths: {
    pack: string;
    edicts: string;
    applied: string;
    schema: string;
    graph: string;
    pages: string;
    scripts: string;
  };
  validation: {
    idPattern: string;
    namespacePattern: string;
    pathPattern: string;
  };
  lint: {
    requiredFields: {
      blocks: string[];
      furniture: string[];
    };
    blockItemRequires: string[];
    furnitureItemRequires: string[];
    seatBlockSuggests: string[];
    strippableBlockRequires: string[];
  };
  aliases: Record<string, string>;
  // Schema properties
  blockBehaviors: string[];
  itemBehaviors: string[];
  furnitureBehaviors: string[];
  recipeTypes: string[];
  typos: Record<string, string>;
  wikiUrl?: string;
}

export interface RouteResult {
  question: string;
  routes: RouteHit[];
}

export interface RouteHit {
  type: string;
  suggest: string;
  url: string;
  query: string;
}

export interface QueryResult {
  question: string;
  terms: string[];
  hits: QueryHit[];
  related: QueryHit[];
  hint: string;
}

export interface QueryHit {
  id: string;
  label: string;
  type: string;
  url: string;
  yaml: string;
  page: string;
}

export interface LintResult {
  ok: boolean;
  file: string;
  summary: {
    error: number;
    warn: number;
    info: number;
  };
  typesFound: string[];
  issues: LintIssue[];
  wiki: string;
}

export interface LintIssue {
  level: 'error' | 'warn' | 'info';
  msg: string;
  hint: string;
}

export interface OptimizeResult {
  lint: LintResult;
  optimize: OptimizeTip[];
  ok: boolean;
}

export interface OptimizeTip {
  tip: string;
  wiki?: string;
}

export interface GenerateResult {
  kind: string;
  id: string;
  yaml: string;
  wiki: string;
  next: string;
}

export interface LiubuCheck {
  name: string;
  duty: string;
  ok: boolean;
  note: string;
}

export interface LiubuResult {
  office: string;
  passed: number;
  total: number;
  ok: boolean;
  boards: LiubuCheck[];
}

export interface ZhongshuResult {
  office: string;
  role: string;
  question: string;
  route: RouteHit | null;
  wikiHit: QueryHit | undefined;
  draft: GenerateResult | null;
}

export interface MenxiaResult {
  office: string;
  role: string;
  sealed: boolean;
  lint: LintResult;
  optimize: OptimizeTip[];
}

export interface EdictResult {
  ok: boolean;
  zhongshu: ZhongshuResult;
  menxia: MenxiaResult;
  liubu: LiubuResult;
  edict: string;
  saved?: string;
}

export interface ApplyResult {
  ok: boolean;
  step: string;
  file?: string;
  backup?: string;
  bytes?: number;
  lint?: LintResult;
}

export interface StatusResult {
  office: string;
  edicts: string[];
  dir: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  url?: string;
  yaml?: string;
  aliases?: string[];
  body?: string;
  degree?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: { source: string; target: string }[];
}

export type Command = 'draft' | 'review' | 'issue' | 'run' | 'apply' | 'status';