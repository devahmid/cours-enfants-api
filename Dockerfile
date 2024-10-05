# Utiliser une image Node officielle comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./
COPY .env .env

# Installer les dépendances
RUN npm install

# Copier le reste du code dans le conteneur
COPY . .

# Compiler le TypeScript
RUN npm run build

# Exposer le port utilisé par l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/app.js"]
