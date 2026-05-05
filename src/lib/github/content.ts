import 'server-only';

import path from 'path';
import { isGitHubConfigured } from '../env/server';
import { getContentFileFromGitHub, updateContentFileOnGitHub } from './client';

const normalizeGitHubPath = (absoluteFilePath: string) => {
  const relative = path.relative(process.cwd(), absoluteFilePath);
  return relative.split(path.sep).join('/');
};

export const readJsonFromGitHub = async <T>(absoluteFilePath: string) => {
  const gitHubPath = normalizeGitHubPath(absoluteFilePath);
  const file = await getContentFileFromGitHub(gitHubPath);
  const decoded = Buffer.from(file.content, 'base64').toString('utf8');
  return {
    data: JSON.parse(decoded) as T,
    sha: file.sha,
    path: gitHubPath,
  };
};

export const writeJsonToGitHub = async ({
  absoluteFilePath,
  value,
  sha,
  commitMessage,
}: {
  absoluteFilePath: string;
  value: unknown;
  sha: string;
  commitMessage: string;
}) => {
  const gitHubPath = normalizeGitHubPath(absoluteFilePath);
  const content = `${JSON.stringify(value, null, 2)}\n`;

  await updateContentFileOnGitHub({
    contentPath: gitHubPath,
    content,
    sha,
    message: commitMessage,
  });
};

export const canUseGitHubContent = () => isGitHubConfigured();
