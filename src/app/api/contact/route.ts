import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { getContactEnv } from '../../../lib/env/server';
import { getContent, saveContent } from '../../../lib/content/store';
import type { QuoteRequest } from '../../../lib/content/types';

export const runtime = 'nodejs';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

type Locale = 'fr' | 'en';

type ContactRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  locale?: unknown;
  website?: unknown;
};

const serviceLabels: Record<string, { fr: string; en: string }> = {
  construction: { fr: 'Construction', en: 'Construction' },
  logistics_transport: { fr: 'Logistique & Transport', en: 'Logistics & Transport' },
  general_trading: { fr: 'Commerce Général', en: 'General Trading' },
  trading: { fr: 'Négoce', en: 'Trading' },
  other: { fr: 'Autre', en: 'Other' },
};

const normalizeLine = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, maxLength) : '';

const normalizeMultiline = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.replace(/\r/g, '').trim().slice(0, maxLength) : '';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const getLocale = (value: unknown): Locale => (value === 'en' ? 'en' : 'fr');

export async function POST(request: Request) {
  let payload: ContactRequest;

  try {
    payload = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ ok: false, error: 'Format de requête invalide.' }, { status: 400 });
  }

  const locale = getLocale(payload.locale);
  const isEn = locale === 'en';

  const fullName = normalizeLine(payload.fullName, 120);
  const email = normalizeLine(payload.email, 160).toLowerCase();
  const phone = normalizeLine(payload.phone, 40);
  const serviceValue = normalizeLine(payload.service, 60).toLowerCase();
  const message = normalizeMultiline(payload.message, 2000);
  const website = normalizeLine(payload.website, 255);

  // Simple honeypot for bots.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!fullName || !email || !phone || !serviceValue || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: isEn ? 'Please fill in all required fields.' : 'Veuillez remplir tous les champs obligatoires.',
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        ok: false,
        error: isEn ? 'Please provide a valid email address.' : 'Veuillez fournir une adresse email valide.',
      },
      { status: 400 },
    );
  }

  const env = getContactEnv();

  if (!env.brevoApiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: isEn
          ? 'Email service is not configured yet. Please try again later.'
          : "Le service d'email n'est pas encore configuré. Réessayez plus tard.",
      },
      { status: 500 },
    );
  }

  const serviceLabel = serviceLabels[serviceValue]?.[locale] ?? serviceValue;
  const submittedAtIso = new Date().toISOString();
  const submittedAt = new Date(submittedAtIso).toLocaleString('fr-FR', { timeZone: 'Africa/Douala' });
  const subject = isEn
    ? `Website contact request - ${fullName}`
    : `Nouvelle demande de contact - ${fullName}`;

  const quoteRequest: QuoteRequest = {
    id: randomUUID(),
    submittedAt: submittedAtIso,
    fullName,
    email,
    phone,
    service: serviceValue,
    serviceLabel,
    message,
    locale,
  };

  try {
    const currentQuotes = await getContent('quotes');
    await saveContent({
      type: 'quotes',
      value: [quoteRequest, ...currentQuotes],
      commitMessage: `cms(quotes): create ${quoteRequest.id}`,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message.slice(0, 200) : '';
    return NextResponse.json(
      {
        ok: false,
        error: isEn
          ? `Request could not be saved right now.${detail ? ` ${detail}` : ''}`
          : `Impossible d'enregistrer la demande pour le moment.${detail ? ` ${detail}` : ''}`,
      },
      { status: 500 },
    );
  }

  const textContent = [
    isEn ? 'New message from merlincameroun.com contact form' : 'Nouveau message depuis le formulaire de contact merlincameroun.com',
    '',
    `Date: ${submittedAt}`,
    `Nom: ${fullName}`,
    `Email: ${email}`,
    `Téléphone: ${phone}`,
    `Service: ${serviceLabel}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
      <h2 style="margin:0 0 12px">Nouveau message site web</h2>
      <p style="margin:0 0 16px"><strong>Date:</strong> ${escapeHtml(submittedAt)}</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb"><strong>Nom</strong></td>
          <td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(fullName)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb"><strong>Email</strong></td>
          <td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb"><strong>Téléphone</strong></td>
          <td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb"><strong>Service</strong></td>
          <td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(serviceLabel)}</td>
        </tr>
      </table>
      <h3 style="margin:20px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
    </div>
  `;

  const brevoResponse = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': env.brevoApiKey,
    },
    body: JSON.stringify({
      sender: {
        name: env.fromName,
        email: env.fromEmail,
      },
      to: [{ email: env.toEmail }],
      replyTo: {
        name: fullName,
        email,
      },
      subject,
      textContent,
      htmlContent,
    }),
    cache: 'no-store',
  });

  if (!brevoResponse.ok) {
    const brevoError = (await brevoResponse.json().catch(() => null)) as { message?: string } | null;
    const detail = brevoError?.message?.slice(0, 200);

    return NextResponse.json(
      {
        ok: false,
        error: isEn
          ? `Email could not be sent right now.${detail ? ` ${detail}` : ''}`
          : `Impossible d'envoyer l'email pour le moment.${detail ? ` ${detail}` : ''}`,
      },
      { status: 502 },
    );
  }

  const brevoPayload = (await brevoResponse.json().catch(() => null)) as { messageId?: string } | null;
  return NextResponse.json({ ok: true, messageId: brevoPayload?.messageId ?? null });
}
