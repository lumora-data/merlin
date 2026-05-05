# MERLIN Cameroun - Site Next.js

Site vitrine MERLIN Cameroun migré vers **Next.js App Router**.

## Démarrage local

1. Installer les dépendances:
   `npm install`
2. Lancer en développement:
   `npm run dev`
3. (Optionnel mais recommandé SEO) définir `NEXT_PUBLIC_SITE_URL` pour les URLs canoniques, par exemple:
   `NEXT_PUBLIC_SITE_URL=https://votre-domaine.com`

## Scripts

- `npm run dev` - Démarrage Next.js sur le port 3000
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Vérification TypeScript (`tsc --noEmit`)

## Structure

- `src/app` - Routes App Router
- `src/views` - Composants de pages réutilisés par les routes
- `src/components` - UI partagée (header, footer, slider, etc.)
- `src/constants.ts` - Données (catégories, produits, agences, réalisations)
- `src/lib/site.ts` - Configuration SEO globale (URL du site, identité, mots-clés)
- `public/images` - Images locales utilisées par le site

## Déploiement Vercel

- Framework preset: **Next.js**
- Root directory: racine du dépôt
- Build command: `npm run build`
- Install command: `npm install`
- Le site utilise uniquement `src/app` comme racine de routing
