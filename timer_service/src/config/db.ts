import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/F1_Timer';
    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connecté');
    } catch (error) {
      console.error('Erreur de connexion MongoDB', error);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    }
  }
};

export default connectDB;
