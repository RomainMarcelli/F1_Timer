"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userModel_1 = require("../models/userModel"); // Assurez-vous que cela importe correctement votre modèle User
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Créer un nouvel utilisateur
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }
        // Hash du mot de passe
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.User({ email, password: hashedPassword, role });
        yield newUser.save();
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
});
exports.createUser = createUser;
// Récupérer tous les utilisateurs
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
});
exports.getUsers = getUsers;
// Récupérer un utilisateur par ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
});
exports.getUserById = getUserById;
// Mettre à jour un utilisateur
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
    }
});
exports.updateUser = updateUser;
// Supprimer un utilisateur
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
});
exports.deleteUser = deleteUser;
