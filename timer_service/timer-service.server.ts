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
    res.send('Timer service is running');
});

// Routes pour la gestion des timers (création, récupération, etc.)

app.listen(3003, () => {
    console.log('Timer service running on port 3003');
});
