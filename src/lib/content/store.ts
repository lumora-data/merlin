import 'server-only';

import fs from 'fs/promises';
import path from 'path';
import { getContentRegistry } from './registry';
import type { ContentMap, ContentType } from './types';
import { canUseGitHubContent, readJsonFromGitHub, writeJsonToGitHub } from '../github/content';

const ensureDirectory = async (absolutePath: string) => {
  const dir = path.dirname(absolutePath);
  await fs.mkdir(dir, { recursive: true });
};

const readLocalJson = async <T>(absoluteFilePath: string): Promise<T> => {
  const raw = await fs.readFile(absoluteFilePath, 'utf8');
  return JSON.parse(raw) as T;
};

const writeLocalJson = async (absoluteFilePath: string, data: unknown) => {
  await ensureDirectory(absoluteFilePath);
  await fs.writeFile(absoluteFilePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
};

export const getContent = async <T extends ContentType>(type: T): Promise<ContentMap[T]> => {
  const registry = getContentRegistry(type) as {
    filePath: string;
    validate: (value: unknown) => ContentMap[T];
  };
  const sourceData = canUseGitHubContent()
    ? (await readJsonFromGitHub<unknown>(registry.filePath)).data
    : await readLocalJson<unknown>(registry.filePath);

  return registry.validate(sourceData);
};

export const saveContent = async <T extends ContentType>({
  type,
  value,
  commitMessage,
}: {
  type: T;
  value: ContentMap[T];
  commitMessage: string;
}) => {
  const registry = getContentRegistry(type) as {
    filePath: string;
    validate: (value: unknown) => ContentMap[T];
  };
  const validated = registry.validate(value);

  if (canUseGitHubContent()) {
    const { sha } = await readJsonFromGitHub<unknown>(registry.filePath);
    await writeJsonToGitHub({
      absoluteFilePath: registry.filePath,
      value: validated,
      sha,
      commitMessage,
    });
    return;
  }

  await writeLocalJson(registry.filePath, validated);
};
