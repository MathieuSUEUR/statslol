<!-- .agents/rules/01-mvp-strict-scope.md -->
# MVP Strict Scope & Agent Guardrails

Ce document définit le périmètre d'exécution et les limites d'autonomie des agents Antigravity travaillant sur le projet OP.GG Clone MVP.

## 1. Contexte du Produit (MVP)
L'objectif est de livrer une version minimale viable du clone d'OP.GG permettant la consultation rapide des statistiques de joueurs de League of Legends. Le succès du MVP repose sur la simplicité radicale et la fiabilité des données.

## 2. Guardrails (Limites de l'Agent)
Les agents ont l'interdiction formelle de s'écarter du périmètre suivant sans validation explicite de l'architecte lead :
- **INTERDIT :** fonctionnalités de "Multi-Search" (recherche de 5 joueurs simultanément).
- **INTERDIT :** développement d'applications de bureau (Electron ou autre).
- **INTERDIT :** implémentation d'algorithmes de calcul de score "MVP" propriétaire ou complexes.
- **INTERDIT :** systèmes de notification ou de réseaux sociaux entre utilisateurs.

## 3. Gestion des Artifacts (Protocole Strict)
Avant toute modification de code source (création ou édition), l'agent **DOIT** suivre cette séquence :
1. **Research & Audit :** Analyser l'impact du changement.
2. **Implementation Plan :** Générer un fichier `implementation_plan.md` détaillé décrivant les changements par fichier.
3. **Task List :** Générer ou mettre à jour un fichier `task.md` pour le suivi granulaire.
4. **Approbation Humaine :** S'arrêter et attendre l'approbation explicite de l'utilisateur avant d'exécuter l'édition (`request_feedback = true`).

## 4. Directives Techniques
- **API Riot Games :** Utilisation obligatoire du SDK officiel ou d'appels REST vers `riotgames.com`.
- **Rate-Limiting & Cache :** Les agents doivent impérativement implémenter une couche de mise en cache (Redis, Memory ou DB) pour ne jamais dépasser les limites de l'API Riot (403 Forbidden).
- **Architecture :** Séparation stricte entre la logique de récupération de données (backend) et l'affichage (frontend).
