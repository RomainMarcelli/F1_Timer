import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Routes CRUD
router.post('/users', createUser);     // Créer un utilisateur
router.get('/users', getUsers);        // Récupérer tous les utilisateurs
router.get('/users/:id', getUserById); // Récupérer un utilisateur par ID
router.put('/users/:id', updateUser);  // Mettre à jour un utilisateur
router.delete('/users/:id', deleteUser); // Supprimer un utilisateur

export default router;
