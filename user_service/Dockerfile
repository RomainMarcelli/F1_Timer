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

# Compile TypeScript to JavaScript
RUN npm run build

# Exposer le port 3002
EXPOSE 3002

# Démarrer l'application
CMD ["npm", "start"]
