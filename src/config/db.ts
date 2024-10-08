import mongoose from 'mongoose';

// Fonction pour se connecter à MongoDB
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/F1_Timer'; // Remplace par ton URI MongoDB
        await mongoose.connect(uri); // Pas besoin d'options ici
        console.log('MongoDB connecté');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1); // Quitte le processus si la connexion échoue
    }
};

export default connectDB;
