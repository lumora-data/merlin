export type UploadResult = {
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
};

export type UploadInput = {
  file: File;
};
