# Utiliser l'image Node.js
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Compiler le code TypeScript
RUN npm run build

# Exposer le port de l'API Gateway
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
