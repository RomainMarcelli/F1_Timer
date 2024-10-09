"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3001;
// Servir les fichiers statiques dans le répertoire "public"
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Définir la route pour /submit-reaction-time
app.get('/submit-reaction-time', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'reaction-time.html'));
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
