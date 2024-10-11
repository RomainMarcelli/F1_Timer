import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo-user:27017/user-service')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.get('/', (req, res) => {
    res.send('User service is running');
});

// Routes pour la gestion des utilisateurs (inscription, connexion, etc.)

app.listen(3002, () => {
    console.log('User service running on port 3002');
});
