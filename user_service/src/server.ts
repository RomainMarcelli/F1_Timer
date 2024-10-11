import express from 'express';
import connectDB from './config/db'; 
import userRoutes from './routes/userRoute';
// import timerRoutes from './routes/timerRoute';
import morgan from 'morgan';

const app = express();
const port = 3001;

// Connexion à MongoDB
connectDB();

app.use(express.json());

app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
// app.use('/api', timerRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Hello from TypeScript with MongoDB!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
