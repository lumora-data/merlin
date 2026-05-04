# MERLIN Cameroun - Next.js

Site vitrine migré vers **Next.js App Router** (`src/app`) avec Tailwind CSS v4.

## Développement local

Prérequis: Node.js 20+ et npm.

```bash
npm install
npm run dev
```

Le site démarre sur `http://localhost:3000`.

## Structure principale

- `src/app`: routes Next.js (`/`, `/about`, `/contact`)
- `src/components`: navbar, footer, bouton WhatsApp
- `src/views`: sections/pages client
- `public/images`: assets statiques (logo, hero, réalisations)
- `public/favicon.png`: favicon basé sur le logo

## Déploiement Vercel

- Framework preset: `Next.js`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: laisser vide (par défaut Next.js)
- Root directory: racine du dépôt

En cas de cache obsolète sur Vercel, relancer un déploiement avec cache vidé.
