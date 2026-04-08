<!-- .agents/workflows/build-mvp-orchestration.md -->
# Workflow: Build MVP Orchestration
**ID de commande :** `/build-mvp-orchestration`

Ce workflow orchestre la création du MVP du clone OP.GG en trois phases distinctes. Chaque phase doit être validée par l'utilisateur.

## Phase 1 : Setup & API (Agent Backend)
**Objectif :** Établir la connexion nerveuse avec Riot Games.
- Configuration des variables d'environnement (`RIOT_API_KEY`).
- Mise en place du module de communication avec l'API (Riot ID + Tagline).
- Implémentation de la couche de cache initiale.
- **Livrable de validation :** Un script de test sortant un JSON propre d'un profil de joueur réel.
- **Preuve :** Log de console et Walkthrough documentant la structure du JSON.

## Phase 2 : Interface Principale (Agent Frontend)
**Objectif :** Rendre l'outil utilisable visuellement.
- Création de la barre de recherche (Input Riot ID + Sélecteur de région).
- Page de profil simplifiée affichant :
    - Rang actuel (Emblème, Tier, League Points).
    - Win/Loss ratio (Progress bar visuelle).
    - Historique des 10 derniers matchs (Simple liste).
- **Livrable de validation :** Intégration frontend branchée sur les endpoints de la Phase 1.
- **Preuve :** Capture d'écran ou vidéo via le Browser Tool démontrant la recherche fluide.

## Phase 3 : Base de données Champions (Agent Data/UI)
**Objectif :** Ajouter la valeur ajoutée "build".
- Récupération des données statiques (Data Dragon).
- Affichage des Top 3 champions les plus joués sur le profil.
- Section de build basique par champion (Runes recommandées, ordre des sorts, 3 core items).
- **Livrable de validation :** Composants UI affichant les icônes de champions et les items.
- **Preuve :** Walkthrough montrant la correspondance correcte entre les données Riot et l'UI.

## Validation Finale
Pour chaque tâche, l'agent assigné doit impérativement produire un `walkthrough.md` contenant des preuves tangibles (logs, captures d'écran, résultats de tests) avant de clore la phase.
