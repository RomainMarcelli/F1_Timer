// db.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur de connexion MongoDB', error);
        process.exit(1);
    }
};
