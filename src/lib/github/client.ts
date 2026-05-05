import 'server-only';

import { getGitHubEnv } from '../env/server';

export type GitHubContentFile = {
  path: string;
  sha: string;
  content: string;
  encoding: 'base64';
};

const getGithubHeaders = () => {
  const { token } = getGitHubEnv();
  if (!token) {
    throw new Error('GITHUB_TOKEN is missing');
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
};

const getRepoBaseUrl = () => {
  const { owner, repo } = getGitHubEnv();
  if (!owner || !repo) {
    throw new Error('GITHUB_OWNER and GITHUB_REPO are required');
  }

  return `https://api.github.com/repos/${owner}/${repo}`;
};

export const getContentFileFromGitHub = async (contentPath: string): Promise<GitHubContentFile> => {
  const { branch } = getGitHubEnv();
  const url = `${getRepoBaseUrl()}/contents/${contentPath}?ref=${encodeURIComponent(branch)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getGithubHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub read failed (${response.status}): ${message}`);
  }

  const payload = (await response.json()) as GitHubContentFile;
  return payload;
};

export const updateContentFileOnGitHub = async ({
  contentPath,
  content,
  sha,
  message,
}: {
  contentPath: string;
  content: string;
  sha: string;
  message: string;
}) => {
  const { branch } = getGitHubEnv();
  const url = `${getRepoBaseUrl()}/contents/${contentPath}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: getGithubHeaders(),
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha,
      branch,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub write failed (${response.status}): ${errorText}`);
  }

  return response.json();
};
