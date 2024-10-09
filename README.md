F1_Timer Project
Ce projet est une API pour gérer des timers, développée en TypeScript avec Node.js, Express, et MongoDB. Le projet utilise Docker pour la conteneurisation et Jest pour les tests unitaires.

Prérequis
Assurez-vous d'avoir les outils suivants installés sur votre machine avant de démarrer :

Docker
Docker Compose
Node.js et npm (en option pour des tests en local)
Installation
1. Cloner le dépôt
Clonez ce projet sur votre machine :


git clone https://github.com/RomainMarcelli/F1_Timer.git
cd F1_Timer
2. Installation des dépendances
Installez toutes les dépendances nécessaires via npm :


npm install
3. Création de l'image Docker
Dans le répertoire du projet, créez l'image Docker à l'aide de la commande suivante :


docker-compose build
4. Lancer les conteneurs
Lancez l'application avec Docker et MongoDB via Docker Compose :


docker-compose up
Cela va démarrer l'API sur http://localhost:3001 et la base de données MongoDB sur mongodb://mongo:27017/F1_Timer.

5. Accéder à l'API
L'API est accessible à l'adresse http://localhost:3001.
Vous pouvez interagir avec l'API à l'aide d'outils comme Postman ou cURL.
6. Tester l'API
Routes disponibles :
POST /api/users/register : Inscription d'un nouvel utilisateur.
POST /api/users/login : Connexion d'un utilisateur existant.
GET /api/users : Récupérer tous les utilisateurs.
Tests
1. Exécuter les tests
Pour exécuter les tests avec Jest et Supertest, assurez-vous d'avoir MongoDB en cours d'exécution dans un conteneur Docker, puis lancez :


npm run test
Les tests unitaires et d'intégration définis dans le projet seront exécutés.

2. Créer et exécuter les tests avec Docker
Pour exécuter les tests dans un environnement Docker, vous pouvez ajouter cette commande dans votre fichier docker-compose.yml pour exécuter les tests à l'intérieur du conteneur après avoir créé l'image :


docker-compose exec app npm run test
Scripts NPM
Voici les scripts disponibles :

npm run build : Compile le projet TypeScript en JavaScript.
npm run start : Démarre le serveur à partir du dossier dist après la compilation.
npm run test : Exécute les tests unitaires avec Jest.
Configuration de Docker
Voici un exemple de fichier docker-compose.yml pour ce projet :

yml

version: '3.9'

services:
  app:
    build: .
    ports:
      - "3001:3001"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/F1_Timer
    command: npm run start
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
