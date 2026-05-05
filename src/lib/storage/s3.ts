import 'server-only';

import type { UploadInput, UploadResult } from './types';

export const uploadToS3 = async (_input: UploadInput): Promise<UploadResult> => {
  throw new Error('S3 provider selected but no S3 SDK is available in this environment. Configure Cloudinary or add S3 SDK integration.');
};
