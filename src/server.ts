import express from 'express';
import { connectDB } from './config/db'; 
import userRoutes from './routes/userRoute'; // Importez le routeur

const app = express();
const port = 3001;

// Connectez-vous à MongoDB
connectDB();

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Utilisez le routeur d'utilisateurs
app.use('/api/users', userRoutes);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
