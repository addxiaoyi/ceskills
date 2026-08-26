/**
 * 中枢 - 意图路由
 * 根据关键词将用户问题路由到对应的 Wiki 页面（规则由 config.json 驱动）
 */
import type { RouteResult, RouteRule } from './types.js';
import { getWikiConfig, getRoutes } from './config.js';

/** 找到匹配的规则，按最长匹配关键词降序排序，确保最精确的规则优先 */
function findMatchingRules(question: string, rules: RouteRule[]): { kind: string; suggest: string; url: string; matchLen: number }[] {
  const q = question.toLowerCase();
  const results: { kind: string; suggest: string; url: string; matchLen: number }[] = [];
  for (const rule of rules) {
    if (!rule.keywords.length) continue;
    // 找到该规则中匹配的最长关键词
    let maxMatchLen = 0;
    for (const kw of rule.keywords) {
      if (q.includes(kw.toLowerCase())) {
        maxMatchLen = Math.max(maxMatchLen, kw.length);
      }
    }
    if (maxMatchLen > 0) {
      results.push({
        kind: rule.kind,
        suggest: rule.suggest,
        url: `${getWikiConfig().baseUrl}/${rule.path}`,
        matchLen: maxMatchLen,
      });
    }
  }
  // 按匹配长度降序（最长匹配优先）
  results.sort((a, b) => b.matchLen - a.matchLen);
  return results;
}

export function route(question: string): RouteResult {
  const q = question.trim();
  if (!q) {
    throw new Error('问题不能为空');
  }

  const wiki = getWikiConfig();
  const rules = getRoutes() || [];
  const hits = findMatchingRules(q, rules);

  // 兜底：交给查询直接处理原问题
  if (!hits.length) {
    hits.push({
      kind: 'query',
      suggest: q.slice(0, 12),
      url: wiki.indexUrl,
      matchLen: 0,
    });
  }

  // 剥离 matchLen 内部字段
  return { question: q, routes: hits.map(({ matchLen: _m, ...rest }) => rest) };
}

// CLI 入口
const isMainModule = process.argv[1]?.endsWith('route.ts') || process.argv[1]?.endsWith('route.mjs');
if (isMainModule) {
  const q = process.argv.slice(2).join(' ').trim();
  if (!q) {
    console.error('用法: npx tsx src/route.ts <问题>');
    process.exit(1);
  }
  console.log(JSON.stringify(route(q), null, 2));
}