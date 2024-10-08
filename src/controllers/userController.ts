import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

// Définissez les types pour le corps de la requête
interface RegisterRequestBody {
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

class UserController {
    // Fonction pour enregistrer un nouvel utilisateur
    public async registerUser(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> {
        const { email, password } = req.body;
        
        try {
            // Hachez le mot de passe avant de sauvegarder
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            
            res.status(201).json({ message: 'Utilisateur créé avec succès.' });
        } catch (error) {
            console.error(error); // Pour déboguer
            res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.' });
        }
    }

    // Fonction pour connecter un utilisateur
    public async loginUser(req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: 'Utilisateur non trouvé.' });
                return; // Ajouter un retour pour éviter l'erreur de type
            }

            // Vérifiez le mot de passe
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: 'Mot de passe incorrect.' });
                return; // Ajouter un retour pour éviter l'erreur de type
            }

            // Authentification réussie
            res.status(200).json({ message: 'Connecté avec succès !' });
        } catch (error) {
            console.error(error); // Pour déboguer
            res.status(500).json({ message: 'Erreur lors de la connexion.' });
        }
    }
}

// Créer une instance de la classe UserController
const userController = new UserController();

export default userController;
