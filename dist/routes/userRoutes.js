"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)(); // Utiliser le routeur
// Gestionnaire de route avec async
router.post('/user', async (req, res, next) => {
    try {
        // Exemple de logique pour traiter la requête
        // const newUser = await UserModel.create(req.body);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    }
    catch (error) {
        // Passer l'erreur au middleware de gestion des erreurs
        next(error);
    }
});
exports.default = router;
