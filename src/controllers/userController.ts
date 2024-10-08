import { Request, Response } from 'express';
import { User } from '../models/userModel'; // Assurez-vous que cela importe correctement votre modèle User
import bcrypt from 'bcryptjs';

// Créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, role } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role });

        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};

// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};
