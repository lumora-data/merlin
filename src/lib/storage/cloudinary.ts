import 'server-only';

import { createHash } from 'crypto';
import { getMediaEnv } from '../env/server';
import type { UploadInput, UploadResult } from './types';

const sha1 = (value: string) => createHash('sha1').update(value).digest('hex');

export const uploadToCloudinary = async ({ file }: UploadInput): Promise<UploadResult> => {
  const media = getMediaEnv();
  const config = media.cloudinary;

  if (!config.cloudName || !config.apiKey || !config.apiSecret) {
    throw new Error('Cloudinary env vars are missing');
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = config.folder;
  const signaturePayload = `folder=${folder}&timestamp=${timestamp}${config.apiSecret}`;
  const signature = sha1(signaturePayload);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', config.apiKey);
  formData.append('timestamp', `${timestamp}`);
  formData.append('folder', folder);
  formData.append('signature', signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const body = await response.json();
  if (!response.ok) {
    const message = body?.error?.message ?? 'Unknown Cloudinary upload error';
    throw new Error(message);
  }

  const secureUrl = typeof body.secure_url === 'string' ? body.secure_url : undefined;
  if (!secureUrl) {
    throw new Error('Cloudinary did not return secure_url');
  }

  return {
    url: secureUrl,
    width: typeof body.width === 'number' ? body.width : undefined,
    height: typeof body.height === 'number' ? body.height : undefined,
    bytes: typeof body.bytes === 'number' ? body.bytes : undefined,
    format: typeof body.format === 'string' ? body.format : undefined,
  };
};
