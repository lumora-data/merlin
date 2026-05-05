import 'server-only';

import { getMediaEnv } from '../env/server';
import { uploadToCloudinary } from './cloudinary';
import { uploadToS3 } from './s3';
import type { UploadInput, UploadResult } from './types';

export const uploadImage = async (input: UploadInput): Promise<UploadResult> => {
  const { provider } = getMediaEnv();

  if (provider === 'cloudinary') {
    return uploadToCloudinary(input);
  }

  if (provider === 's3') {
    return uploadToS3(input);
  }

  throw new Error('MEDIA_PROVIDER must be set to "cloudinary" or "s3"');
};
