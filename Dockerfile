# Utilise une image Node.js officielle
FROM node:18

# Crée un répertoire de travail
WORKDIR /app

# Copie le fichier package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste du projet
COPY . .

# Compile TypeScript en JavaScript
RUN npm run build

# Expose le port utilisé par l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "dist/server.ts"]
