# Utiliser l'image node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exécuter la compilation TypeScript
RUN npm run build

# Exposer le port 3003
EXPOSE 3003

# Démarrer l'application
CMD ["npm", "start"]
