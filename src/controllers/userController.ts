import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
  // Enregistrer un nouvel utilisateur
  public async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        return;
      }

      // Hachage du mot de passe avant d'enregistrer l'utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: IUser = new User({ email, password: hashedPassword });
      await newUser.save();

      // Générer un token JWT après la création de l'utilisateur
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'secret_key', { expiresIn: '1h' });
      console.log("Token généré:", token); // Log du token

      newUser.token = token; 
      await newUser.save(); 

      res.status(201).json({ message: 'Utilisateur créé avec succès.', token });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error); // Log de l'erreur
      res.status(500).json({ message: 'Erreur lors de l’enregistrement.' });
    }
  }

  // Connexion d'un utilisateur
  public async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      console.log("Tentative de connexion pour l'utilisateur avec email:", email); // Log de l'email pour la connexion

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: 'Utilisateur non trouvé.' });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Mot de passe incorrect.' });
        return;
      }

      // Générer un token JWT
      const token = jwt.sign({ id: user._id, email: user.email }, 'secret_key', { expiresIn: '1h' });

      user.token = token;
      await user.save(); 

      res.status(200).json({ message: 'Connecté avec succès', token });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error); // Log de l'erreur
      res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find(); // Récupérer tous les utilisateurs
      res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error); // Log de l'erreur
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
  }
}

export default new UserController();
