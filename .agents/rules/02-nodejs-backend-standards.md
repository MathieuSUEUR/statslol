<!-- .agents/rules/02-nodejs-backend-standards.md -->
# Node.js Backend Standards & Architecture

Ce document définit les standards techniques pour le développement de la couche API Node.js.

## 1. Architecture des Couches (Tiered Architecture)
L'agent doit structurer le code selon le schéma suivant pour garantir la maintenabilité et le testabilité :
- **Routes :** Définition des points d'entrée et validation des schémas de requête.
- **Controllers :** Gestion du flux de données, orchestration des appels de services et formatage des réponses HTTP.
- **Services :** Logique métier pure. Les appels à l'API officielle de Riot Games **DOIVENT** être encapsulés exclusivement dans des services dédiés.

## 2. Gestion de l'API Riot Games & Rate-Limiting
- **Caching Obligatoire :** Toute donnée provenant de l'API Riot (Profils, Match History, Stats) doit être mise en cache pendant une durée minimale de 5 minutes (Memory Cache ou Redis).
- **Stratégie anti-429 :** L'agent doit implémenter une vérification de cache systématique avant d'initier un appel réseau externe.

## 3. Conventions de Code & Typage
- **TypeScript :** L'utilisation de TypeScript est **OBLIGATOIRE**. L'agent doit définir des interfaces précises pour chaque réponse de l'API Riot.
- **Modules :** Utilisation exclusive des ES Modules (`import`/`export`).
- **Asynchronisme :** Gestion systématique des promesses avec des blocs `try/catch` dans les controllers pour capturer et logger les erreurs proprement via un middleware d'erreur global.

## 4. Sécurité & Environnement
- **API Keys :** Ne JAMAIS coder la clé d'API Riot en dur. Utiliser exclusivement `process.env.RIOT_API_KEY`.
- **Fichiers Sensibles :** L'agent doit s'assurer que `.env` est présent dans le `.gitignore`.
