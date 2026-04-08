<!-- .agents/rules/04-git-workflow-standards.md -->
# Git Workflow & Commit Standards

Ce document définit les règles de gestion du versionnage pour le projet.

## 1. Stratégie de Branches (Hierarchy)
- **`main` :** Branche de production (stable). Uniquement mise à jour via `dev`.
- **`dev` :** Branche d'intégration. Toutes les fonctionnalités y sont fusionnées avant d'aller sur `main`.
- **Branches de travail :**
    - `feat/...` (ex: `feat/riot-api`) : Branchée depuis `dev`, fusionnée dans `dev`.
    - `fix/...` (ex: `fix/bug-cache`) : Branchée depuis `dev`, fusionnée dans `dev`.
    - `docs/...` ou `refactor/...` : Idem, branchée depuis `dev`.

## 2. Conventions de Commit (Conventional Commits)
Les agents doivent utiliser le format standard : `<type>(<scope>): <description>`
- `feat` : Ajout d'une nouvelle fonctionnalité.
- `fix` : Correction d'un bug.
- `docs` : Modifications de la documentation.
- `style` : Changements qui n'affectent pas le sens du code (espaces, formatage).
- `refactor` : Modification du code qui ne corrige pas de bug ni n'ajoute de fonctionnalité.
- `perf` : Amélioration de la performance.
- `chore` : Tâches courantes (npm install, configuration meta).

## 3. Workflow d'Intégration
- **Merge Stratégie :** Le "Squash and Merge" est recommandé pour garder un historique `main` propre et lisible.
- **Purity :** Ne jamais commiter de fichiers sensibles (`.env`, `node_modules`). Vérifier systématiquement le `.gitignore`.
- **Validation :** Un commit ne doit être effectué que si le code "build" sans erreur (`npm run build` ou `tsc`).
