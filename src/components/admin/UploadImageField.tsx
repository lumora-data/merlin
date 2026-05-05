'use client';

import React from 'react';

type UploadImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const UploadImageField = ({ label, value, onChange }: UploadImageFieldProps) => {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      });

      const payload = (await response.json()) as { ok: boolean; url?: string; error?: string };
      if (!response.ok || !payload.ok || !payload.url) {
        setError(payload.error ?? 'Upload impossible.');
        return;
      }

      onChange(payload.url);
    } catch {
      setError('Erreur réseau pendant l\'upload.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2"
          placeholder="https://..."
        />
        <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700">
          {uploading ? 'Upload...' : 'Uploader'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </label>
      </div>
      {value ? <img src={value} alt="Preview" className="h-28 w-28 rounded-xl border border-slate-200 object-cover" /> : null}
      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
    </div>
  );
};
