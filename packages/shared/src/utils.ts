import { createHash } from 'node:crypto';

export function hashContent(content: string): string {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

export function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 80) || 'untitled';
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function toDataPath(projectId: string, ...parts: string[]): string {
  return ['data', 'projects', projectId, ...parts].join('/');
}

export function ensureId(type: string, slug: string): string {
  return `${type}:${slugify(slug)}`;
}
