"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Routes CRUD
router.post('/users', userController_1.createUser); // Créer un utilisateur
router.get('/users', userController_1.getUsers); // Récupérer tous les utilisateurs
router.get('/users/:id', userController_1.getUserById); // Récupérer un utilisateur par ID
router.put('/users/:id', userController_1.updateUser); // Mettre à jour un utilisateur
router.delete('/users/:id', userController_1.deleteUser); // Supprimer un utilisateur
exports.default = router;
