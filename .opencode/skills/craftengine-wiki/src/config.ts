/**
 * 配置加载器 - 统一管理所有路径和配置
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { WikiConfig } from './types.js';

const SKILL_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let configCache: WikiConfig | null = null;

export function loadConfig(): WikiConfig {
  if (configCache) return configCache;
  
  const configPath = path.join(SKILL_ROOT, 'config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error(`配置文件不存在: ${configPath}`);
  }
  
  const content = fs.readFileSync(configPath, 'utf8');
  configCache = JSON.parse(content) as WikiConfig;
  return configCache;
}

export function getPaths() {
  const config = loadConfig();
  return {
    pack: path.join(SKILL_ROOT, config.paths.pack),
    edicts: path.join(SKILL_ROOT, config.paths.edicts),
    applied: path.join(SKILL_ROOT, config.paths.applied),
    schema: path.join(SKILL_ROOT, config.paths.schema),
    graph: path.join(SKILL_ROOT, config.paths.graph),
    pages: path.join(SKILL_ROOT, config.paths.pages),
    scripts: path.join(SKILL_ROOT, config.paths.scripts),
  };
}

export function getWikiConfig() {
  return loadConfig().wiki;
}

export function getValidationConfig() {
  return loadConfig().validation;
}

export function getLintConfig() {
  return loadConfig().lint;
}

export function getAliases() {
  return loadConfig().aliases;
}

export function getSkillRoot(): string {
  return SKILL_ROOT;
}