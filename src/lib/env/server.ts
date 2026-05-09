import 'server-only';

export type MediaProvider = 'cloudinary' | 's3';

const readEnv = (name: string) => {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

const toNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toList = (value: string | undefined, fallback: string[]) => {
  if (!value) return fallback;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const getAdminEnv = () => ({
  username: readEnv('ADMIN_USERNAME'),
  password: readEnv('ADMIN_PASSWORD'),
  passwordHash: readEnv('ADMIN_PASSWORD_HASH'),
  sessionSecret: readEnv('ADMIN_SESSION_SECRET'),
});

export const getGitHubEnv = () => ({
  token: readEnv('GITHUB_TOKEN'),
  owner: readEnv('GITHUB_OWNER'),
  repo: readEnv('GITHUB_REPO'),
  branch: readEnv('GITHUB_BRANCH') ?? 'main',
});

export const isGitHubConfigured = () => {
  const github = getGitHubEnv();
  return Boolean(github.token && github.owner && github.repo && github.branch);
};

export const getMediaEnv = () => {
  const provider = readEnv('MEDIA_PROVIDER') as MediaProvider | undefined;

  return {
    provider,
    maxUploadMb: toNumber(readEnv('ADMIN_UPLOAD_MAX_MB'), 8),
    allowedTypes: toList(readEnv('ADMIN_UPLOAD_ALLOWED_TYPES'), ['image/jpeg', 'image/png', 'image/webp']),
    cloudinary: {
      cloudName: readEnv('CLOUDINARY_CLOUD_NAME'),
      apiKey: readEnv('CLOUDINARY_API_KEY'),
      apiSecret: readEnv('CLOUDINARY_API_SECRET'),
      folder: readEnv('CLOUDINARY_UPLOAD_FOLDER') ?? 'merlin-cms',
      secureDistribution: readEnv('CLOUDINARY_SECURE_DISTRIBUTION'),
    },
    s3: {
      bucket: readEnv('S3_BUCKET'),
      region: readEnv('S3_REGION'),
      accessKeyId: readEnv('S3_ACCESS_KEY_ID'),
      secretAccessKey: readEnv('S3_SECRET_ACCESS_KEY'),
      publicUrlBase: readEnv('S3_PUBLIC_URL_BASE'),
      uploadPrefix: readEnv('S3_UPLOAD_PREFIX') ?? 'cms',
      forcePathStyle: readEnv('S3_FORCE_PATH_STYLE') === 'true',
    },
  };
};

export const getContactEnv = () => ({
  brevoApiKey: readEnv('BREVO_API_KEY') ?? readEnv('BREVO_TRANSACTIONAL_API_KEY'),
  fromEmail: readEnv('BREVO_FROM_EMAIL') ?? 'noreply@merlincameroun.com',
  fromName: readEnv('BREVO_FROM_NAME') ?? 'MERLIN Cameroun',
  toEmail: readEnv('CONTACT_TO_EMAIL') ?? 'camerounmerin@gmail.com',
});
