# Application-Web-des-Champions-FUT
Application Web des Champions FUT
# FUT Team Builder

Une application interactive permettant aux utilisateurs de créer et gérer leur équipe FUT (Ultimate Team) tout en respectant les formations tactiques prédéfinies. 

### Fonctionnalités

### Intégration UI et Ajout Dynamique des Joueurs
- Formulaire interactif pour ajouter des joueurs avec des champs tels que : 
  - **Nom**
  - **Position**
  - **Note**
  - **Statistiques**
- Positionnement des joueurs automatiquement adapté selon la formation choisie (4-3-3, 4-4-2).

### Positionnement des Joueurs
- Respect strict des formations tactiques :
  - **4-3-3** : GK, CB, LB, RB, CM, LW, RW, ST, etc.
  - **4-4-2** : GK, CB, LB, RB, CM, LM, RM, ST, etc.
- Ajustement automatique des positions.

### Gestion des Cartes de Joueurs
- Ajouter, modifier ou supprimer des cartes de joueurs via une interface utilisateur intuitive.
- Limitation à **11 joueurs** sur le terrain avec des réservistes pour les changements.

### Calcul de la Chimie de l’Équipe
- Score de chimie calculé dynamiquement selon :
  - **Lien de club** : Bonus pour les joueurs partageant le même club.
  - **Lien de ligue** : Bonus pour les joueurs partageant la même ligue.
  - **Lien de nationalité** : Bonus pour les joueurs de même nationalité.
- Visualisation des liens forts/faibles.

### Sauvegarde des Données
- Utilisation de **localStorage** pour enregistrer :
  - Formation choisie.
  - Joueurs ajoutés.
- Chargement automatique des données sauvegardées à l'ouverture.

### Drag & Drop pour le Changement des Joueurs (Bonus)
- Permet de réorganiser les joueurs sur le terrain par glisser-déposer.

### Responsive Design
- Interface adaptée pour tous les appareils : PC, tablette, et mobile.

##  Technologies Utilisées
- **HTML**
- **CSS** 
- **JavaScript Vanilla**

##  User Stories

### 1. Création d’une équipe de 11 joueurs
- **En tant qu’utilisateur**, je peux ajouter des joueurs via un formulaire dynamique.
- **Critères d’acceptation** :
  - Le formulaire vérifie les données (nom, position, note, etc.).
  - Je peux modifier ou supprimer des joueurs.

### 2. Adaptation de la Formation Choisie
- **En tant qu’utilisateur**, je peux changer la formation de l’équipe (e.g., 4-3-3, 4-4-2).
- **Critères d’acceptation** :
  - Les positions des joueurs s’ajustent dynamiquement.
  - Seuls les postes valides sont disponibles pour chaque joueur.

### 3. Calcul du Score de Chimie
- **En tant qu’utilisateur**, je veux voir le score de chimie de mon équipe.
- **Critères d’acceptation** :
  - Le score est calculé en fonction des liens (club, ligue, nationalité).
  - Les liaisons fortes/faibles sont mises en évidence.

### 4. Sauvegarde et Récupération des Données
- **En tant qu’utilisateur**, je veux que ma formation et mes joueurs soient sauvegardés.
- **Critères d’acceptation** :
  - Les données sont stockées localement.
  - Les données sauvegardées sont récupérées au rechargement.
