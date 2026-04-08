<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# OP.GG Clone MVP - Agent Workspace

Ce fichier définit les instructions globales pour tous les agents intervenant sur le projet.

## 1. Références de Configuration
Les agents **DOIVENT** consulter et respecter les documents de référence suivants situés dans `.agents/` :
- **Périmètre & Guardrails :** [01-mvp-strict-scope.md](file:///.agents/rules/01-mvp-strict-scope.md)
- **Standards Backend :** [02-nodejs-backend-standards.md](file:///.agents/rules/02-nodejs-backend-standards.md)
- **Standards Frontend :** [03-nextjs-frontend-standards.md](file:///.agents/rules/03-nextjs-frontend-standards.md)
- **Workflow Git :** [04-git-workflow-standards.md](file:///.agents/rules/04-git-workflow-standards.md)

## 2. Instructions Critiques
- **MVP Uniquement :** Ne développez aucune fonctionnalité hors du périmètre strict (Multi-Search, app bureau, etc.).
- **Protocoles d'Artifacts :** Produisez toujours un `implementation_plan.md` et un `task.md` avant de modifier le code. Attendez l'approbation humaine.
- **Riot API :** Respectez le rate-limiting via la couche de cache définie dans les standards backend.

## 3. Workflow de Développement
Pour toute nouvelle tâche complexe, déclenchez ou suivez l'orchestration définie dans [build-mvp-orchestration.md](file:///.agents/workflows/build-mvp-orchestration.md).
