import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

// Route pour l'enregistrement
router.post('/register', userController.registerUser);

// Route pour la connexion
router.post('/login', userController.loginUser);

// Route pour obtenir tous les utilisateurs (à adapter selon votre contrôleur)
router.get('/', userController.getAllUsers);

export default router;
