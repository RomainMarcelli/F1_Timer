"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userModel_1 = require("../models/userModel"); // Assurez-vous que cela importe correctement votre modèle User
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Créer un nouvel utilisateur
const createUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }
        // Hash du mot de passe
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.User({ email, password: hashedPassword, role });
        await newUser.save();
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};
exports.createUser = createUser;
// Récupérer tous les utilisateurs
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
};
exports.getUsers = getUsers;
// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
};
exports.getUserById = getUserById;
// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const user = await userModel_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
};
exports.updateUser = updateUser;
// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const user = await userModel_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};
exports.deleteUser = deleteUser;
