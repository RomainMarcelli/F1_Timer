import express from 'express';
import userController from '../controllers/userController'; // Importez l'instance du contrôleur

const router = express.Router();

// Route pour enregistrer un nouvel utilisateur
router.post('/register', (req, res) => userController.registerUser(req, res));

// Route pour connecter un utilisateur
router.post('/login', (req, res) => userController.loginUser(req, res));

export default router;
