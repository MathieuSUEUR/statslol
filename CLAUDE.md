# Claude Project Rules

@AGENTS.md

## Build & Development
- **Dev mode:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Project Context
Ce projet est un MVP d'un clone d'OP.GG.
- **Frontend:** Next.js (App Router)
- **Backend:** Node.js + Riot API
- **Styling:** Tailwind CSS

## Architecture Notes
- Suivre strictement la séparation **Routes -> Controllers -> Services** pour le backend.
- Isoler les appels API Riot dans les services avec mise en cache.
- Utiliser les **Skeleton Loaders** pour compenser la latence de l'API Riot.
