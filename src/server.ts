import express from 'express';
import connectDB from '../src/config/db';
import userRoutes from './routes/userRoutes'; // Importez le routeur
import path from 'path';

const app = express();
const port = 3001;

// Connectez-vous à MongoDB
connectDB();

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'views'))); // Dossier pour les fichiers HTML

// Utilisez le routeur d'utilisateurs
app.use('/api/users', userRoutes);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Démarrer le serveur
// Servir les fichiers statiques depuis "public"
app.use(express.static(path.join(__dirname, '../public')));

// Route pour /submit-reaction-time
app.get('/submit-reaction-time', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'reaction-time.html'));
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
