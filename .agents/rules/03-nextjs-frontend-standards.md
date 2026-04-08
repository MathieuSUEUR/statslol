<!-- .agents/rules/03-nextjs-frontend-standards.md -->
# Next.js Frontend Standards & UX Patterns

Ce document définit les principes directeurs pour le développement de l'interface utilisateur.

## 1. Paradigme Next.js
- **App Router :** Utilisation exclusive de l'architecture `app/`.
- **Server Components (RSC) :** Par défaut, tous les composants doivent être des Server Components pour optimiser le SEO et la performance. Le fetching de données initiales doit se faire côté serveur.
- **Client Components :** Utiliser la directive `"use client"` uniquement pour les composants interactifs (formulaires de recherche, boutons de filtrage, graphiques dynamiques).

## 2. UI/UX & Design System
- **Styling :** Utilisation exclusive de **Tailwind CSS**.
- **Perceived Performance :** Étant donné la latence inévitable de l'API Riot, l'agent doit implémenter des **Skeleton Loaders** (écrans fantômes) pour chaque section de données (Profil, Liste des matchs, Champions).
- **Responsivité :** Design "Mobile First" obligatoire pour garantir une consultation fluide sur smartphone.

## 3. Gestion des Données (Data Fetching)
- **Communication Backend :** Le frontend doit appeler l'API Node.js via l'API `fetch` native.
- **États de Chargement :** Utilisation des fichiers `loading.tsx` de Next.js pour les transitions de pages et de hooks d'état pour les interactions granulaires.
- **Gestion des Erreurs :** Implémentation de `error.tsx` pour capturer les échecs de récupération de données sans casser toute l'interface.
