import express from 'express';
import mongoose from 'mongoose';
import timerRoutes from './routes/timerRoutes'; // Importation des routes des timers

const app = express();
const port = process.env.PORT || 3001;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/F1_Timer';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Route GET simple pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Hello from TypeScript with MongoDB!');
});

// Utiliser les routes des timers
app.use('/api', timerRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
